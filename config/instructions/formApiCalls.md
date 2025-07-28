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
"body": "{\"firstName\":\"Jeremy\"}"
}
]

The response should only be the JSON array and nothing else.
