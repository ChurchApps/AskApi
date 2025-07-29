# People Advanced Search Filter Generator

Convert the user's natural language query into an array of SearchCondition objects for the `/people/advancedSearch` API endpoint.

**User Query:** {query}

## Output Format

Return ONLY a JavaScript array of SearchCondition objects:

```javascript
[
  {
    "field": "fieldName",
    "value": "searchValue",
    "operator": "operatorType"
  }
]
```

## Available Fields

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

## Available Operators

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

## Complex Examples

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
  {"field":"gender","value":"Female","operator":"equals"},
  {"field":"maritalStatus","value":"Married","operator":"equals"},
  {"field":"membershipStatus","value":"Member","operator":"equals"},
  {"field":"age","value":"40","operator":"greaterThan"},
  {"field":"city","value":"Dallas","operator":"equals"}
]
```

## Important Notes

1. **Age Ranges**: Always use TWO conditions for age ranges (min and max)
2. **Exact Values**: Use exact enum values, not user terminology
3. **Case Sensitive**: Match enum values exactly (e.g., "Male" not "male")
4. **Multiple Conditions**: All conditions are combined with AND logic
5. **String Searches**: Use "contains" for partial matches, "equals" for exact matches

## Response Format

Return ONLY the JavaScript array, no additional text or explanation.