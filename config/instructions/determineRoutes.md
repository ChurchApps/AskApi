The user asked:

{query}

Determine which routes are needed to answer this question. The routes available are:

{routes}

Return your answer in the following format:

[
{
"service": "attendanceapi",
"method": "GET",
"path": "/attendancerecords/tree",
"summary": "Get attendance tree structure",
"requiresAuth": true,
"routeKey": "attendanceapi.GET._attendancerecords_tree"
},
{
"service": "membershipapi",
"method": "GET",
"path": "/people",
"summary": "Get all people",
"requiresAuth": true,
"routeKey": "membershipapi.GET._people"
},
]
