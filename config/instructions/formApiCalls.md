The user asked:

{query}

Use the API routes below to answer the question:

[{routesDetails}]

You don't need a churchId to answer the question. It is contained within the JWT we will pass to the APIs.

I want you to return a list of API calls to make in the following format:

[
{
"apiName": "MembershipApi",
"method": "POST",
"path": "/people/advancedSearch",
"body": "[{\"field\":\"displayName\",\"value\":\"Jeremy\",\"operator\":\"contains\"}]",
"fields": ["id", "name", "email"]
}
]

IMPORTANT: The "fields" property is REQUIRED and should contain only the fields necessary to answer the user's question. This dramatically reduces the data size. Consider what fields are needed:
- For counting: often just ["id"] is enough
- For listing names: ["id", "name"]
- For contact info: ["id", "name", "email", "phone"]
- For demographics: ["id", "name", "age", "gender", "maritalStatus"]
- For membership info: ["id", "name", "membershipStatus", "joinDate"]
- For full details: omit the fields property to get all fields

Common person fields: id, name (object with first/last/display), email, phone, birthDate, age, gender, maritalStatus, membershipStatus, householdId, householdRole, photoUrl, address

IMPORTANT: For /people/advancedSearch, the body must be an array of SearchCondition objects with this exact format:
[
  {
    "field": "fieldName",
    "value": "searchValue", 
    "operator": "operatorType"
  }
]

Available search fields: displayName, age, gender, maritalStatus, membershipStatus, householdRole
Available operators: equals, notEquals, contains, startsWith, endsWith, greaterThan, lessThan, greaterThanEqual, lessThanEqual

IMPORTANT SEARCH RULES:
1. For age ranges (like "13-19" or "teens"), use TWO separate conditions:
   - One with "greaterThanEqual" for the minimum age
   - One with "lessThanEqual" for the maximum age

2. For gender searches, recognize these terms:
   - "men", "male", "males" → {"field":"gender","value":"Male","operator":"equals"}
   - "women", "female", "females" → {"field":"gender","value":"Female","operator":"equals"}

3. For membership status searches:
   - "members" → {"field":"membershipStatus","value":"Member","operator":"equals"}
   - "visitors" → {"field":"membershipStatus","value":"Visitor","operator":"equals"}

4. Always use exact enum values from the documentation, not the user's terminology

Examples:
- Age range search: [{"field":"age","value":"13","operator":"greaterThanEqual"},{"field":"age","value":"19","operator":"lessThanEqual"}]
- Name search: [{"field":"displayName","value":"John","operator":"contains"}]
- Gender search (men): [{"field":"gender","value":"Male","operator":"equals"}]
- Gender search (women): [{"field":"gender","value":"Female","operator":"equals"}]
- Status search: [{"field":"membershipStatus","value":"Member","operator":"equals"}]
- Age minimum: [{"field":"age","value":"25","operator":"greaterThanEqual"}]
- Multiple conditions: [{"field":"membershipStatus","value":"Member","operator":"equals"},{"field":"age","value":"18","operator":"greaterThanEqual"}]

The response should only be the JSON array and nothing else.
