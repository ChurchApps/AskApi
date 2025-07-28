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
"body": "{\"firstName\":\"Jeremy\"}",
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

The response should only be the JSON array and nothing else.
