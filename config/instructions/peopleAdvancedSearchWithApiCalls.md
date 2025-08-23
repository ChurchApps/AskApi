# People Advanced Search with Additional API Calls

Convert the user's natural language query into both:

1. An array of SearchCondition objects for the `/people/advancedSearch` API endpoint
2. Additional API calls to other services that might be needed

**User Query:** {query}

## Output Format

Return a JSON object with both filters and additional API calls:

```javascript
{
  "filters": [
    {
      "field": "fieldName",
      "value": "searchValue",
      "operator": "operatorType"
    }
  ],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic",
      "fields": ["id", "personId", "serviceId", "date"]
    }
  ]
}
```

## Donation API Call Rules

### Scenario 1: Fund-Specific Donations

**When:** User mentions a specific fund name
**API Call:** `/funddonations/basic?fundName={fundName}&startDate={startDate}&endDate={endDate}`
**Fields to Populate:**

- `fundName`: The specific fund mentioned in the query
- `startDate`: Calculated start date
- `endDate`: Calculated end date

**Examples:**

- "people who donated to building fund" → Use `/funddonations/basic?fundName=Building%Fund&startDate={startDate}&endDate={endDate}`
- "donors to missions fund" → Use `/funddonations/basic?fundName=Missions%Fund&startDate={startDate}&endDate={endDate}`

### Scenario 2: General Donations (No Fund Specified)

**When:** User wants to know about donations in general or doesn't specify a fund
**API Call:** `/funddonations/basic?startDate={startDate}&endDate={endDate}`
**Fields to Populate:**

- `startDate`: Calculated start date
- `endDate`: Calculated end date
- `fundName`: NOT included

**Examples:**

- "people who give regularly" → Use `/funddonations/basic?startDate={startDate}&endDate={endDate}`
- "who has donated recently" → Use `/funddonations/basic?startDate={startDate}&endDate={endDate}`
- "donors between January and March" → Use `/funddonations/basic?startDate={startDate}&endDate={endDate}`

## Dynamic Field Population

### Fund Name Field

- **Only populate when a specific fund is mentioned**
- **CRITICAL: Use EXACTLY what the user wrote in their query**
- **DO NOT automatically add "Fund" unless the user specifically wrote it**
- **Examples:**
  - User writes "buildings" → Use "buildings" (NOT "Building Fund")
  - User writes "building fund" → Use "building fund" (NOT "Building Fund")
  - User writes "Building Fund" → Use "Building Fund"
  - User writes "missions" → Use "missions" (NOT "Missions Fund")
  - User writes "youth" → Use "youth" (NOT "Youth Fund")
  - User writes "general fund" → Use "general fund" (NOT "General Fund")

### Date Fields

- **startDate**: date in 'yyyy-mm-dd' format
- **endDate**: date in 'yyyy-mm-dd' format

### Time-Based Queries Examples

- **IMPORTANT: Always calculate dates based on the CURRENT date**
- **DO NOT use hardcoded examples**
- **Below examples can give an idea on how to calculate the dates based on CURRENT date**
- **Examples:**
  - **"this year"**: Use "current year" (e.g., if today is 2025-12-19, use → startDate: "2025-01-01", endDate: "2025-12-31")
  - **"last year"**: Use "previous year" (e.g., if today is 2025-12-19, use → startDate: "2024-01-01", endDate: "2024-12-31")
  - **"this month"**: Use "current month" (e.g., if the current month is December, go ahead with that with the CURRENT YEAR)
  - **"last month"**: Use "previous month" (e.g., if today is 2025-12-19, go ahead with last month i.e November with CURRENT YEAR)
  - **"last 6 months"**: Calculate backwards from today (e.g., if today is 2025-12-19, use → startDate: "2025-06-19", endDate: "2025-12-19")
  - **"last 3 months"**: Calculate backwards from today (e.g., if today is 2025-12-19, use → startDate: "2025-09-19", endDate: "2025-12-19")
  - **"recent"**: Last 3 months (e.g., if today is 2025-12-19, use → startDate: "2025-09-19", endDate: "2025-12-19")
  - **"recently"**: Last 3 months (e.g., if today is 2025-12-19, use → startDate: "2025-09-19", endDate: "2025-12-19")


## When to Include Additional API Calls

Include additional API calls when the query suggests:

- **Donation history**: "people who give regularly", "donors", "people who has/have donated to a fund"

## Available Fields for People Search

- **displayName** - Full display name
- **firstName** - First name only
- **lastName** - Last name only
- **middleName** - Middle name
- **nickName** - Nickname
- **age** - Numeric age
- **birthDate** - Date of birth
- **birthMonth** - Birth month (1-12)
- **gender** - "Male", "Female", "Unspecified"
- **maritalStatus** - "Single", "Married", "Divorced", "Widowed", "Separated", "Other"
- **anniversary** - Anniversary date
- **anniversaryMonth** - Anniversary month (1-12)
- **yearsMarried** - Years married (numeric)
- **phone** - Phone number
- **email** - Email address
- **address** - Street address
- **city** - City name
- **state** - State/Province
- **zip** - ZIP/Postal code
- **membershipStatus** - "Visitor", "Regular Attendee", "Member", "Staff", "Former Member", "Prospect", "Inactive"
- **groupMember** - Group membership
- **memberAttendance** - Attendance patterns

## Available Operators for People Search

- **equals** - Exact match
- **notEquals** - Not equal to
- **contains** - Text contains substring
- **startsWith** - Text starts with
- **endsWith** - Text ends with
- **greaterThan** - Numeric/date greater than
- **lessThan** - Numeric/date less than
- **greaterThanEqual** - Numeric/date greater than or equal
- **lessThanEqual** - Numeric/date less than or equal

## Term Recognition Rules

### Gender Terms

- "men", "male", "males", "guys" → `{"field":"gender","value":"Male","operator":"equals"}`
- "women", "female", "females", "ladies", "girls" → `{"field":"gender","value":"Female","operator":"equals"}`

### Age Terms

- "teens", "teenagers" → Age 13-19 (two conditions: >=13 AND <=19)
- "young adults" → Age 18-35 (two conditions: >=18 AND <=35)
- "adults" → Age 18+ (one condition: >=18)
- "seniors", "elderly" → Age 65+ (one condition: >=65)
- "kids", "children", "minors" → Age <18 (one condition: <18)
- "toddlers" → Age 1-3 (two conditions: >=1 AND <=3)
- "preteens" → Age 10-12 (two conditions: >=10 AND <=12)
- "middle-aged" → Age 40-65 (two conditions: >=40 AND <=65)
- "over X", "above X" → greaterThan X
- "under X", "below X" → lessThan X
- "X or older" → greaterThanEqual X
- "X or younger" → lessThanEqual X
- "X-Y years old", "ages X to Y" → Two conditions: >=X AND <=Y

### Membership Terms

- "members" → `{"field":"membershipStatus","value":"Member","operator":"equals"}`
- "visitors" → `{"field":"membershipStatus","value":"Visitor","operator":"equals"}`
- "staff" → `{"field":"membershipStatus","value":"Staff","operator":"equals"}`
- "regular attendees" → `{"field":"membershipStatus","value":"Regular Attendee","operator":"equals"}`

### Marital Status Terms

- "married" → `{"field":"maritalStatus","value":"Married","operator":"equals"}`
- "single" → `{"field":"maritalStatus","value":"Single","operator":"equals"}`
- "divorced" → `{"field":"maritalStatus","value":"Divorced","operator":"equals"}`
- "widowed" → `{"field":"maritalStatus","value":"Widowed","operator":"equals"}`

### Name Terms

- "named X", "called X", "with name X" → `{"field":"displayName","value":"X","operator":"contains"}`
- "first name X" → `{"field":"firstName","value":"X","operator":"equals"}`
- "last name X" → `{"field":"lastName","value":"X","operator":"equals"}`

### Location Terms

- "in [city]" → `{"field":"city","value":"[city]","operator":"equals"}`
- "from [state]" → `{"field":"state","value":"[state]","operator":"equals"}`
- "zip code X" → `{"field":"zip","value":"X","operator":"equals"}`

### Contact Terms

- "email contains X" → `{"field":"email","value":"X","operator":"contains"}`
- "phone number X" → `{"field":"phone","value":"X","operator":"contains"}`

### Birthday/Anniversary Terms

- "birthday in January", "born in January" → `{"field":"birthMonth","value":"1","operator":"equals"}`
- "birthday in February", "born in February" → `{"field":"birthMonth","value":"2","operator":"equals"}`
- "birthday in March", "born in March" → `{"field":"birthMonth","value":"3","operator":"equals"}`
- "birthday in April", "born in April" → `{"field":"birthMonth","value":"4","operator":"equals"}`
- "birthday in May", "born in May" → `{"field":"birthMonth","value":"5","operator":"equals"}`
- "birthday in June", "born in June" → `{"field":"birthMonth","value":"6","operator":"equals"}`
- "birthday in July", "born in July" → `{"field":"birthMonth","value":"7","operator":"equals"}`
- "birthday in August", "born in August" → `{"field":"birthMonth","value":"8","operator":"equals"}`
- "birthday in September", "born in September" → `{"field":"birthMonth","value":"9","operator":"equals"}`
- "birthday in October", "born in October" → `{"field":"birthMonth","value":"10","operator":"equals"}`
- "birthday in November", "born in November" → `{"field":"birthMonth","value":"11","operator":"equals"}`
- "birthday in December", "born in December" → `{"field":"birthMonth","value":"12","operator":"equals"}`
- "anniversary in [month]" → `{"field":"anniversaryMonth","value":"[month_number]","operator":"equals"}`

## Examples

**IMPORTANT: All dates in examples are calculated based on current date. The AI should calculate actual dates based on today's date, not use these hardcoded examples.**

### Simple People Search

**Query:** "Find all men"
**Response:**

```javascript
{
  "filters": [
    {"field":"gender","value":"Male","operator":"equals"}
  ],
  "additionalApiCalls": []
}
```

### Fund-Specific Donation Query

**Query:** "Find people who have donated to building fund"
**Response:**

```javascript
{
  "filters": [],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?fundName=building%fund&startDate=2024-12-19&endDate=2025-12-19",
      "fields": {
        "fundName": "building fund",
        "startDate": "2024-12-19",
        "endDate": "2025-12-19"
      }
    }
  ]
}
```

### Fund-Specific Donation Query (User Wrote "buildings")

**Query:** "Show me people who donated to buildings"
**Response:**

```javascript
{
  "filters": [],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?fundName=buildings&startDate=2024-12-19&endDate=2025-12-19",
      "fields": {
        "fundName": "buildings",
        "startDate": "2024-12-19",
        "endDate": "2025-12-19"
      }
    }
  ]
}
```

### General Donation Query (No Fund Specified)

**Query:** "Find people who give regularly"
**Response:**

```javascript
{
  "filters": [],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?startDate=2024-12-19&endDate=2025-12-19",
      "fields": {
        "startDate": "2024-12-19",
        "endDate": "2025-12-19"
      }
    }
  ]
}
```

### Time-Based General Donation Query

**Query:** "Who has donated this year?"
**Response:**

```javascript
{
  "filters": [],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?startDate=2025-01-01&endDate=2025-12-31",
      "fields": {
        "startDate": "2025-01-01",
        "endDate": "2025-12-31"
      }
    }
  ]
}
```

### Fund-Specific with Time Range

**Query:** "Donors to youth fund in the last 6 months"
**Response:**

```javascript
{
  "filters": [],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?fundName=youth%fund&startDate=2025-06-19&endDate=2025-12-19",
      "fields": {
        "fundName": "youth fund",
        "startDate": "2025-06-19",
        "endDate": "2025-12-19"
      }
    }
  ]
}
```

### Complex Query with Fund and People Filters

**Query:** "Find married women who donated to missions fund last month"
**Response:**

```javascript
{
  "filters": [
    {"field":"gender","value":"Female","operator":"equals"},
    {"field":"maritalStatus","value":"Married","operator":"equals"}
  ],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?fundName=missions%fund&startDate=2025-11-01&endDate=2025-11-30",
      "fields": {
        "fundName": "missions fund",
        "startDate": "2025-11-01",
        "endDate": "2025-11-30"
      }
    }
  ]
}
```

### General Donation with People Filters

**Query:** "Single men who donate regularly"
**Response:**

```javascript
{
  "filters": [
    {"field":"gender","value":"Male","operator":"equals"},
    {"field":"maritalStatus","value":"Single","operator":"equals"}
  ],
  "additionalApiCalls": [
    {
      "apiName": "GivingApi",
      "method": "GET",
      "path": "/funddonations/basic?startDate=2024-12-19&endDate=2025-12-19",
      "fields": {
        "startDate": "2024-12-19",
        "endDate": "2025-12-19"
      }
    }
  ]
}
```

## Complex Examples for filters

### Age Range Searches

- **"Find teens"** → `[{"field":"age","value":"13","operator":"greaterThanEqual"},{"field":"age","value":"19","operator":"lessThanEqual"}]`
- **"People over 65"** → `[{"field":"age","value":"65","operator":"greaterThan"}]`
- **"Ages 25 to 40"** → `[{"field":"age","value":"25","operator":"greaterThanEqual"},{"field":"age","value":"40","operator":"lessThanEqual"}]`

### Gender + Other Criteria

- **"Married women"** → `[{"field":"gender","value":"Female","operator":"equals"},{"field":"maritalStatus","value":"Married","operator":"equals"}]`
- **"Single men under 30"** → `[{"field":"gender","value":"Male","operator":"equals"},{"field":"maritalStatus","value":"Single","operator":"equals"},{"field":"age","value":"30","operator":"lessThan"}]`

### Name Searches

- **"People named John"** → `[{"field":"displayName","value":"John","operator":"contains"}]`
- **"Last name Smith"** → `[{"field":"lastName","value":"Smith","operator":"equals"}]`
- **"First name starts with M"** → `[{"field":"firstName","value":"M","operator":"startsWith"}]`

### Location Searches

- **"People in Dallas"** → `[{"field":"city","value":"Dallas","operator":"equals"}]`
- **"From Texas"** → `[{"field":"state","value":"Texas","operator":"equals"}]`
- **"ZIP code 75201"** → `[{"field":"zip","value":"75201","operator":"equals"}]`

### Membership Searches

- **"New members"** → `[{"field":"membershipStatus","value":"Member","operator":"equals"}]`
- **"Visitors from last month"** → `[{"field":"membershipStatus","value":"Visitor","operator":"equals"}]`

### Complex Multi-Criteria

- **"Married women members over 40 in Dallas"** →

```javascript
[
  { field: "gender", value: "Female", operator: "equals" },
  { field: "maritalStatus", value: "Married", operator: "equals" },
  { field: "membershipStatus", value: "Member", operator: "equals" },
  { field: "age", value: "40", operator: "greaterThan" },
  { field: "city", value: "Dallas", operator: "equals" }
];
```

## Key Decision Points

### When to Use `/fundDonations/basic` (with fundName):

- User explicitly mentions a fund: "building fund", "missions fund", "youth fund"
- User asks about specific fund donors: "donors to [fund]"
- User wants to know about contributions to a particular cause

### When to Use `/funddonations/basic` (without fundName):

- User asks about donations in general: "people who give", "donors"
- User doesn't specify a fund: "who has donated recently"
- User wants overall giving patterns: "regular givers", "frequent donors"

## Important Notes

1. **Filters are always required** - Even if additional API calls are needed, always provide the basic people search filters
2. **Additional API calls are optional** - Only include them when the query clearly indicates additional data is needed
3. **Field optimization** - Only request fields that are actually needed for the query
4. **API selection** - Choose the most appropriate API based on the data type needed
5. **Age Ranges**: Always use TWO conditions for age ranges (min and max)
6. **Exact Values**: Use exact enum values, not user terminology
7. **Case Sensitive**: Match enum values exactly (e.g., "Male" not "male")
8. **Multiple Conditions**: All conditions are combined with AND logic
9. **String Searches**: Use "contains" for partial matches, "equals" for exact matches
10. **Field Population Rules**:

- `fundName`: ONLY include when a specific fund is mentioned
- `startDate` and `endDate`: ALWAYS include for donation queries

11. **Default Time Range**: If no specific time mentioned, use "last year to today"

12. **Fund Name Detection**: Look for fund-related keywords in the user's query

## Summary of Key Rules

1. **Fund Names**: Use EXACTLY what the user wrote - don't add "Fund" unless they wrote it
2. **Dates**: Always calculate based on current date, not hardcoded examples
3. **Field Population**: Only include fields that are actually needed

## Response Format

Return ONLY the JSON object, no additional text or explanation.
