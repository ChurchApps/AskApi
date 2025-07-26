1. Determine which APIs you need

- AttendanceApi - Contains attendance records and supporting data like campuses, services, and when groups meet
- ContentApi - Contains Bibles, church websites, calendars, songs and sermons
- DoingApi - Contains volunteer schedules and tasks
- GivingApi - Contains donation history
- MembershipApi - Contains data for people, groups, households and forms.
- MessagingApi - Contains notifications, private messages and user devices

2. Look at that APIs swagger.json file in /config/swagger to understand the API routes
3. Call the required API routes using the jwt for that API as the bearer token.
