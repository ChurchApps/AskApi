## people/adding-people.md

# Adding People



The People section is the foundation of B1 Admin — it's your church's member database. Every other feature (groups, attendance, donations, forms) ties back to person records. This guide walks you through adding someone to your database, editing their details, and linking family members into households.




#### Before You Begin

- You need an active B1 Admin account with permission to manage people. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- If you're adding more than a handful of people, consider using the [CSV Import](importing-data.md) tool instead.



## Adding a Person

1. Navigate to the B1.church Admin dashboard.
2. Click on **People** in the left sidebar.
3. Click the **Add Person** button in the upper right corner.
4. Fill in the person's first name, last name, and email address, then click **Add**.

The person's profile page will open, ready for you to add more details.

:::tip
If you're migrating from another church management system, the [Import Data](importing-data.md) feature lets you bring in your entire directory from a CSV file — much faster than adding people one at a time.
:::

## Editing Details

1. On the person's profile page, click the **edit pencil** next to their name.
2. Fill in additional information such as middle name, membership status, dates, address, and phone numbers.
3. Click **Save** to store the personal information.

The profile also includes several tabs for related information:

- **Notes** — Add notes about the person (pastoral care, follow-ups, etc.)
- **Groups** — View and manage [group memberships](../groups/group-members.md)
- **Attendance** — View [attendance records](../attendance/tracking-attendance.md)
- **Donations** — View [donation history](../donations/recording-donations.md)

## Working with Forms

You can fill out custom forms directly from a person's profile. These are user-defined forms that you can build by following the [Creating Forms](../forms/creating-forms.md) guide.

1. On the person's profile, click the **Forms** dropdown to select a form.
2. Click **Add Form** to open it.
3. Fill in the form details and click **Save**.

:::info
Forms linked to a person's profile use the **People** form type. If you need a standalone form (like an event registration), see the [Stand Alone form option](../forms/creating-forms.md) in the forms guide.
:::

## Managing Households

Households let you link family members together. This is especially useful for [check-in](../attendance/check-in.md), where a parent can check in all their children at once.

1. On a person's profile, click the **edit pencil** next to the household name.
2. The household editor will open. Select the **household role** for the current person (e.g., Head, Spouse, Child).
3. Click **Add** to add another household member.
4. Type the person's name in the search box and click **Search**.
5. When the person appears in the search results, click **Select**.
6. Choose their household role and click **Save** to complete the household setup.

---

## people/ai-search.md

# AI Search



The **AI Search** feature lets you search your church directory using plain, natural language questions instead of traditional search fields and filters. Rather than building a query with specific filter criteria, you can simply describe what you are looking for in everyday language -- making it fast to answer complex questions about your congregation.




#### Before You Begin

- You need an active B1 Admin account with permission to view people. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- Familiarity with the standard [Searching People](searching-people.md) tools is helpful but not required.



## How It Works

AI Search uses artificial intelligence to interpret your question and return the matching results from your people database. You can ask questions the way you would ask a colleague.

1. Navigate to the **People** page in B1 Admin.
2. Look for the **AI Search** option under the search controls.
3. Type your question in plain language.
4. Press **Enter** or click **Search** to run your query.
5. The results table will update to show the matching people.

## Example Queries

Here are some examples of the kinds of questions you can ask:

- "Who hasn't attended in the last 3 months?"
- "Show me all members under 30"
- "List families with children in the youth group"
- "Who joined the church this year?"
- "Show me everyone without an email address"
- "Which members live in the 75001 zip code?"

:::tip
Be as specific as you can in your question. The more detail you provide, the more accurate your results will be.
:::

## When to Use AI Search

AI Search is especially helpful when:

- You need to combine multiple criteria that would be difficult to set up with traditional filters.
- You are not sure exactly which fields to search by.
- You want a quick answer to a question about your congregation without building a report.

:::info
AI Search works alongside the standard quick search and column filters. Use whichever approach fits your needs best. For simple name lookups, the [quick search](searching-people.md) is the fastest option. For more nuanced questions, AI Search shines.
:::

For other search options, see [Searching People](./searching-people.md).

---

## people/exporting-data.md

# Exporting Data



B1 Admin lets you export your church data so you can use it in spreadsheets, share it with your team, or keep a backup. Whether you need a quick list of names and emails or a complete database export, there are options to fit your needs.




#### Before You Begin

- You need an active B1 Admin account with permission to view the data you want to export. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- For a full database export, you need access to the **Settings** area.



## Exporting from the People Page

The fastest way to export your directory is directly from the **People** page:

1. Navigate to **People** in the left sidebar.
2. Use the search bar or filters to narrow down the results you want to export (or leave it unfiltered to export everyone). See [Searching People](searching-people.md) for tips on filtering.
3. Use the **column selector** to choose which columns you want included in the export (for example, Name, Email, Phone, Address).
4. Click the **Export** button.
5. A CSV file will download to your computer with the data currently shown in the table.

:::tip
Customize your columns before exporting. The CSV file will include exactly the columns you have visible, so you can tailor the export to your needs without editing the file afterward.
:::

## Full Data Export from Settings

For a complete export of all your B1 data (not just people), use the export tool in Settings:

1. Click **Settings** in the left sidebar.
2. Click **Import/Export** in the top navigation.
3. Select **B1 Database** from the **Data Source** dropdown.
4. Review the data preview and click **Continue to Destination**.
5. Select **B1 Export Zip** as the export destination.
6. Monitor the export progress until all items show green checkmarks.
7. The export file will download automatically. Look for the `B1Export` file in your downloads folder.
8. Unzip the file to access individual CSV files (such as `people.csv`) that you can open in Excel, Google Sheets, or Numbers.

:::info
Full data exports include people, groups, donations, attendance, and more -- everything in your B1 database. This is also a great way to create a periodic backup of your church records.
:::

## Exporting Group Data

You can also export member lists for individual groups. From the **Groups** page, open a group and click the **download icon** to export that group's member list. See [Group Members](../groups/group-members.md) for more details.

:::info
Exported CSV files work with all major spreadsheet applications including Microsoft Excel, Google Sheets, and Apple Numbers.
:::

---

## people/importing-data.md

# Importing Data



B1 Admin makes it easy to bring your existing member data into the system. Whether you are migrating from another church management platform or loading records from a spreadsheet, the import tools save you from manually entering every person. You can import from a CSV file or migrate directly from Breeze ChMS.




#### Before You Begin

- You need an active B1 Admin account with access to **Settings**. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- Have your member data ready in a spreadsheet or exported from your previous system.
- If you are migrating from Breeze, make sure you have exported your People, Tags, and Contributions files from Breeze first.



## Importing from CSV

If you have member data in a spreadsheet or another system, you can import it using a CSV (comma-separated values) file.

1. Go to **Settings** in the left sidebar.
2. Click **Import/Export** in the top navigation.
3. Select **B1 Import Zip** from the **Data Source** dropdown.
4. Click the link to **download sample files** so you can see the expected format.
5. Open the sample `people.csv` file and replace the sample data with your own. Keep the header row intact.
6. If you have member photos, add them to the folder using 400x300px images, naming them to match the `importKey` numbers in your CSV.
7. Compress your edited files into a zip file.
8. Back in B1 Admin, click **Upload** and select your zip file.
9. Review the data preview and click **Continue to Destination**.
10. Verify **B1 Database** is selected, review the import summary, and click **Start Transfer**.
11. Wait for the import to complete, then click **Go to B1** to return to your dashboard.

:::tip
Always download and review the sample files first. Matching the expected column format will prevent import errors.
:::

:::warning
Importing data will add new records to your database. If you import the same file twice, you may end up with duplicate entries. Double-check your file before starting the transfer.
:::

## Importing from Breeze ChMS

If you are migrating from Breeze, B1 has a dedicated import option that handles the conversion automatically.

1. In Breeze, go to **Settings** and click **Export** in the left sidebar.
2. Export three files: **People**, **Tags**, and **Contributions**.
3. Select all three exported files, right-click, and compress them into a single zip file.
4. In B1 Admin, go to **Settings** then **Import/Export**.
5. Select **Breeze Import Zip** from the **Data Source** dropdown.
6. Upload your zip file and follow the on-screen steps to review and complete the import.

:::info
The Breeze import transfers people, photos, groups, donations, attendance, forms, and more -- giving you a complete migration in one step.
:::

## After Importing

Once your import is complete, take a few minutes to verify your data:

1. Browse the [People](../people/adding-people.md) page and spot-check a few profiles.
2. Confirm that names, emails, phone numbers, and addresses came through correctly.
3. Check that household connections are intact.
4. Review any [groups](../groups/creating-groups.md) or tags that were imported.

If you notice any issues, you can edit individual profiles directly from the People page. You can also [export your data](exporting-data.md) at any time to create a backup.

---

## people/index.md

# People



The **People** section is the heart of your church management in B1 Admin. This is where you maintain your church directory -- searching for members, adding new people, viewing and editing profiles, and tracking households. Whether you have a small congregation or a large one, keeping your people records organized is the foundation that powers every other feature in B1.



## What You Can Do

Here is an overview of the key features available in the People section:

1. **Search your directory** -- Use the quick search bar to find anyone by name, or take advantage of advanced filters and AI-powered natural language search to locate exactly who you need. See [Searching People](./searching-people.md) and [AI Search](./ai-search.md) for details.

2. **Add new people** -- Quickly add individuals to your directory and fill in their profile details, contact information, and household connections. See [Adding People](./adding-people.md) for step-by-step instructions.

3. **Import and export data** -- Bring in member data from a CSV file or migrate from another church management system like Breeze. You can also export your directory to CSV at any time. See [Importing Data](./importing-data.md) and [Exporting Data](./exporting-data.md).

4. **Manage profiles** -- View and edit detailed profiles for each person, including contact info, household members, [group memberships](../groups/group-members.md), [attendance history](../attendance/tracking-attendance.md), [donations](../donations/recording-donations.md), and [custom forms](../forms/creating-forms.md).

5. **Assign roles and permissions** -- Control who on your team can access different parts of B1 Admin by assigning roles. See [Assigning Roles](./roles-permissions.md).

## Getting Started

To access the People section, click **People** in the left sidebar of your B1 Admin dashboard. You will see your full church directory with a search bar at the top and a list of members below.

:::tip
If you are setting up B1 for the first time, start by [importing your existing member data](./importing-data.md). Then review and clean up profiles as needed.
:::

---

## people/roles-permissions.md

# Assigning Roles



B1 Admin uses a role-based permission system to control what each user on your team can see and do. By assigning roles, you can give staff and volunteers access to exactly the areas they need -- and nothing more. Proper role management keeps your church data secure while empowering your team to work efficiently.




#### Before You Begin

- You need **Domain Admin** access or a role with permission to manage **Settings** in B1 Admin.
- The people you want to assign roles to must already exist in your directory. See [Adding People](adding-people.md) if you need to add them first.



## Understanding Roles

A role is a set of permissions that you assign to one or more users. For example, you might create a "Finance Team" role that grants access to [donation records](../donations/recording-donations.md), or a "Check-In Volunteer" role that only allows access to [attendance features](../attendance/check-in.md).

Each role controls access to specific areas of B1 Admin, including:

- **People** -- viewing and editing member profiles
- **Donations** -- managing contributions and financial reports
- **Attendance** -- recording and viewing attendance data
- **Forms** -- creating and managing [custom forms](../forms/creating-forms.md)
- **Groups** -- managing [group memberships](../groups/group-members.md) and calendars
- **Settings** -- configuring church-wide settings

:::warning
**Domain Admins** have full access to every area of B1 Admin. Their permissions cannot be edited or restricted. Use this role only for your primary administrators.
:::

## Viewing and Managing Roles

1. Click **Settings** in the left sidebar.
2. Click **Roles** in the top navigation.
3. You will see a list of all roles configured for your church.
4. Click on any role to view its members and permissions.

## Adding Users to a Role

1. Navigate to **Settings** then **Roles**.
2. Click the role you want to add a user to.
3. In the **Members** section, search for the person by name.
4. Click **Add** to assign them to the role.

The user will now have all permissions associated with that role the next time they log in.

## Editing Role Permissions

1. Navigate to **Settings** then **Roles**.
2. Click the role you want to modify.
3. In the **Permissions** section, check or uncheck the areas you want the role to access.
4. Click **Save** to apply your changes.

:::tip
Follow the principle of least privilege -- give each role only the permissions it truly needs. This keeps your data secure and reduces the chance of accidental changes.
:::

## Common Role Examples

- **Office Staff** -- access to People, Donations, Attendance, and Forms
- **Group Leaders** -- access to [Groups](../groups/creating-groups.md) only
- **Check-In Volunteers** -- access to [Attendance](../attendance/check-in.md) only
- **Finance Team** -- access to [Donations](../donations/recording-donations.md) and reporting

---

## people/searching-people.md

# Searching People



The **People** page displays your church directory in a searchable, sortable table. You can quickly find anyone in your congregation, customize which information is shown, and export your results. Efficient searching is essential for day-to-day church administration tasks like following up with visitors, preparing contact lists, and managing member records.




#### Before You Begin

- You need an active B1 Admin account with permission to view people. See [Roles & Permissions](roles-permissions.md) if you're unsure about your access level.
- Your church directory should have people in it. If you haven't added anyone yet, see [Adding People](adding-people.md) or [Importing Data](importing-data.md).



## Quick Search

The search bar at the top of the People page lets you find members in real time:

1. Click the **search box** at the top of the People page.
2. Start typing a name, email, or other keyword.
3. Results will filter automatically as you type (there is a brief delay of about half a second so the search does not fire on every keystroke).
4. The table below updates to show only the matching results.

:::tip
You do not need to press Enter. The search runs automatically after you stop typing.
:::

## Sorting Results

You can sort the directory by clicking any column header in the table:

1. Click a **column header** (for example, **Name** or **Email**) to sort by that column.
2. Click the same header again to reverse the sort order.

This makes it easy to find people alphabetically, by age, or by any other visible column.

## Customizing Columns

Not every piece of information needs to be visible at once. You can choose which columns appear in the table:

1. Look for the **column selector dropdown** near the top of the table.
2. Check or uncheck columns to show or hide them. Available columns include:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
3. The table updates immediately to reflect your selections.

:::info
Your column choices affect what is included when you export to CSV. Customize columns before exporting to get exactly the data you need.
:::

## Exporting Search Results

You can download your current search results as a CSV file at any time:

1. Apply any search or filters you want.
2. Customize your columns to include the data you need.
3. Click the **Export** button.
4. A CSV file will download to your computer, ready to open in Excel, Google Sheets, or any spreadsheet application.

For more details on exporting, see [Exporting Data](./exporting-data.md).

:::tip
For more advanced queries -- like finding everyone who hasn't attended in the last three months -- try the [AI Search](./ai-search.md) feature, which lets you search using plain language questions.
:::

---
