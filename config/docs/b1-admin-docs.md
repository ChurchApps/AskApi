## attendance/check-in.md

# Check-In



B1 Admin supports self check-in at services through the companion **B1 Checkin** app. Members can check themselves and their families in at kiosks or dedicated devices when they arrive, making the process fast and reducing the workload on your volunteers. Every check-in is automatically recorded as attendance.




#### Before You Begin

- Your campuses, service times, and groups must be configured in [Attendance Setup](setup.md).
- You need [people in your database](../people/adding-people.md) with [households](../people/adding-people.md#managing-households) set up so families can check in together.
- You'll need a tablet and optionally a Brother label printer (see [hardware recommendations](#recommended-hardware) below).



## How It Works

The B1 Checkin app connects to your B1 Admin attendance setup. When a member checks in, their attendance is automatically recorded against the correct campus, service time, and group. You do not need to enter attendance manually for anyone who uses the check-in system.

## Setting Up Check-In

1. **Configure your attendance structure first.** In B1 Admin, go to **Attendance > Setup** and make sure your campuses, service times, and groups are in place. The check-in app relies on this configuration. See [Attendance Setup](setup.md) for details.
2. **Install the B1 Checkin app** on the devices you plan to use. The app is available on the following platforms:
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Sign in to the B1 Checkin app** using your church's account credentials.
4. **Select the campus and service time** for the current gathering.
5. Members can now search for their name on the device and check in.

:::tip
Place check-in devices in visible, easy-to-reach locations such as lobby entrances or welcome desks. A brief announcement during services helps members know the option is available.
:::

:::tip
If your church has multiple campuses, you'll need to repeat the setup for each campus in [Attendance Setup](setup.md). Each check-in device can be configured for a different campus.
:::

## Recommended Hardware

**Tablets** — any of these work well with the app:

- **Compact:** Samsung Galaxy Tab A7 Lite 8.7"
- **Large Screen:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printers** — check-ins work with Brother label printers for printing name tags:

- **Best:** Brother QL-1110NWB (supports multiple tablets via Bluetooth and WiFi)
- **Good:** Brother QL-810W (supports multiple tablets via WiFi)
- **Budget:** Brother QL-1100 (WiFi only)

**Labels:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Only Brother label printers are compatible with the B1 Checkin app. Other printer brands will not work for printing name tags.
:::

:::info
Follow your printer's setup instructions to connect it to the same WiFi network as your tablet. You can find Brother printer drivers and setup guides on the [Brother support site](https://support.brother.com).
:::

## Customizing the Kiosk Appearance

You can customize the look and feel of the B1 Checkin app to match your church's branding. In B1 Admin, go to **Attendance > Kiosk Theme** to configure:

### Colors

Customize eight color settings to match your church branding:

- **Primary** and **Primary Contrast** -- Main brand color and its text color.
- **Secondary** and **Secondary Contrast** -- Accent color and its text color.
- **Header Background** and **Subheader Background** -- Colors for the kiosk header areas.
- **Button Background** and **Button Text** -- Colors for interactive buttons.

### Background Image

Upload an optional background image for the kiosk welcome and lookup screens. Recommended size is 1920x1080 pixels.

### Idle Screen / Screensaver

Configure a screensaver that activates after a period of inactivity:

1. Toggle the idle screen **on** or **off**.
2. Set the **timeout** (how many seconds of inactivity before the screensaver starts, minimum 10 seconds).
3. Add one or more **slides** -- each slide has an image and a display duration (minimum 3 seconds).

:::tip
Use the idle screen to display announcements, upcoming events, or welcome messages when the kiosk is not actively being used.
:::

## Guest Registration via QR Code

The check-in kiosk can display a QR code that visitors scan to register themselves and their family on their own phone. This speeds up the check-in process for first-time guests.

When a guest scans the QR code, they are taken to a [guest registration page](../../b1-church/checkin/guest-registration) where they enter their name, email, and family members. A volunteer can then look them up on the kiosk and check them in.

### Enabling QR Guest Registration

To turn on the QR code display:

1. In B1 Admin, go to **Mobile** in the left sidebar (phone icon).
2. Select the **Check-In** tab.
3. Toggle **QR Guest Registration** on.

:::note
This setting is under **Mobile**, not under Attendance > Kiosk Theme.
:::

## What Gets Recorded

Every check-in creates an attendance record in B1 Admin. You can view these records on the [Attendance](tracking-attendance.md) and [Groups](../groups/group-members.md) tabs just like manually entered attendance. There is no difference in how the data appears — both methods feed into the same reports.

---

## attendance/index.md

# Attendance



The Attendance section in B1 Admin gives you a complete view of who is showing up at your church and how your groups are growing over time. From configuring campuses and service times to reviewing trends and setting up self check-in, everything you need to track and understand attendance is managed from this page.



## Page Overview

When you open the Attendance page, you will see a header with key statistics about your church's attendance setup:

- **Campuses** -- the number of physical locations you have configured
- **Service Times** -- the total number of services across all campuses
- **Scheduled Groups** -- groups that are assigned to a specific service time
- **Unscheduled Groups** -- groups that track attendance independently of a service time

Below the header, three tabs organize your attendance tools.

## Tabs

### Setup

The **Setup** tab is where you configure the building blocks of attendance tracking. Here you define your campuses, add service times to each campus, and assign [groups](../groups/creating-groups.md) to those service times. You only need to do this once, though you can update it whenever your schedule changes. See [Attendance Setup](setup.md) for a full walkthrough.

### Attendance

The **Attendance** tab displays attendance trends over time. Use the filters to narrow results by date range, campus, or service time and quickly spot patterns in your data. See [Tracking Attendance](tracking-attendance.md) for details on using reports and filters.

### Groups

The **Groups** tab breaks attendance down by individual group. This is helpful when you want to see how a specific small group, class, or ministry team is doing rather than looking at church-wide numbers.

## Next Steps

- [Attendance Setup](setup.md) -- configure campuses, service times, and groups
- [Recording Attendance](recording-attendance.md) -- manually enter attendance for a group session
- [Tracking Attendance](tracking-attendance.md) -- view trends and filter reports
- [Check-In](check-in.md) -- set up self check-in for services

:::tip
If you are setting up attendance for the first time, start with the [Attendance Setup](setup.md) guide to define your campuses and service times. Once that is in place, you can begin [recording attendance](recording-attendance.md) manually or set up [self check-in](check-in.md).
:::

---

## attendance/recording-attendance.md

# Recording Attendance



Once your campuses, service times, and groups are set up, you can manually record attendance after each gathering. B1 Admin organizes attendance around **sessions** -- one session per group per meeting date. You create the session, mark who showed up, and the data feeds directly into your attendance reports.




#### Before You Begin

- Your campuses, service times, and groups must be configured. See [Attendance Setup](setup.md) if you haven't done this yet.
- The groups you want to track must have **Track Attendance** enabled. See [Attendance Setup](setup.md) for details.



## Creating a Session

A session represents one occurrence of a group meeting -- for example, your K--3rd grade class on a specific Sunday.

1. Open **B1 Admin** and click **Groups** in the sidebar.
2. Select the group you want to record attendance for.
3. Click the **Sessions** tab.
4. Click **New** to create a new session.
5. If the group is assigned to a service time, choose the **Service Time**. If it is an unscheduled group, this field will not appear.
6. Select the **Session Date** -- this can be today, a past date, or a future date.
7. Click **Save**.

:::tip
You can create sessions for past dates to catch up on attendance you haven't recorded yet, or create them in advance so they are ready when your group meets.
:::

## Marking Attendance

After saving the session, the group's members appear on the right side of the page.

1. Check the box next to each person who attended.
2. Changes are saved automatically -- there is no additional Save button for attendance marks.

:::info
Only current group members appear in the session list. If someone attended but is not yet in the group, [add them to the group](../groups/group-members.md) first, then record their attendance.
:::

## Exporting Attendance to a Spreadsheet

You can download a record of the session as a CSV file to use in Excel, Numbers, or Google Sheets.

1. Open the session you want to export.
2. Click the **Download CSV** button.
3. Open the downloaded file in your spreadsheet application.

## Viewing Recorded Attendance

After recording sessions, the data appears in your attendance reports.

- **Attendance tab** -- shows church-wide trends over time. See [Tracking Attendance](tracking-attendance.md).
- **Groups tab** -- shows attendance broken down by individual group.

:::tip
If a session you just created does not appear in reports right away, make sure the session date falls within the date range selected in the report filters.
:::

---

## attendance/setup.md

# Attendance Setup



Before you can track attendance, you need to tell B1 Admin about your church's physical locations, when services happen, and which groups meet at each service. This one-time setup creates the structure that powers all attendance tracking and reporting across your church.




#### Before You Begin

- You need an active B1 Admin account with permission to manage attendance. See [Roles & Permissions](../people/roles-permissions.md) if you're unsure about your access level.
- If you plan to assign groups to service times, make sure your [groups are created](../groups/creating-groups.md) first.



## Key Concepts

- **Campus** -- a physical location where your church meets (e.g., "Main Campus," "North Campus").
- **Service Time** -- a recurring gathering at a campus (e.g., "Sunday 9:00 AM," "Wednesday 7:00 PM").
- **Scheduled Group** -- a group assigned to a specific service time. Attendance is tracked in the context of that service.
- **Unscheduled Group** -- a group that tracks attendance on its own, without being tied to a service time.

## Setting Up Your Attendance Structure

1. Open **B1 Admin** and click **Attendance** in the sidebar.
2. Select the **Setup** tab.
3. Click **Add Campus** and enter the name of your location. Click **Save**.
4. With your campus selected, click **Add Service Time**. Enter a name such as "Sunday 9:00 AM" and click **Save**.
5. Repeat for each service time at that campus.
6. To assign a group to a service time, select the service time and click **Add Group**. Choose the group from the list and click **Save**.

### Enabling Track Attendance on a Group

Before a group can have attendance recorded, Track Attendance must be turned on for that group.

1. Click **Groups** in the sidebar and select the group.
2. Click the **Edit** pencil icon.
3. Set **Track Attendance** to **Yes**.
4. Click **Save**.

:::tip
If you assigned the group to a service time in the previous step, also use the **Add Service Time** option on the group's edit screen to link it to the correct service. This ensures sessions are connected to the right campus and time.
:::

:::tip
If a group meets outside of a regular service -- like a midweek small group that tracks its own attendance -- you can leave it as an unscheduled group. It will still appear on the Groups tab for attendance reporting.
:::

## Editing Your Setup

You can update your setup at any time. Select a campus, service time, or group and click **Edit** to change its details, or **Delete** to remove it.

:::info
Removing a service time does not delete past attendance records. Your historical data is preserved even if you change your schedule.
:::

## What's Next

Once your campuses, service times, and groups are in place, you are ready to start [recording attendance](recording-attendance.md) manually or set up [self check-in](check-in.md) for your services.

---

## attendance/tracking-attendance.md

# Tracking Attendance



Once your campuses, service times, and groups are configured, B1 Admin makes it easy to review attendance data and spot trends. The Attendance page provides two reporting views -- the **Attendance** tab for church-wide trends and the **Groups** tab for group-level detail. Use these tools to understand growth patterns, identify declining engagement, and make data-driven decisions for your church.




#### Before You Begin

- Your attendance structure must be set up with at least one campus and service time. See [Attendance Setup](setup.md) if you haven't done this yet.
- Attendance data needs to be recorded before reports will show results. Data can come from [manual entry](recording-attendance.md) or [self check-in](check-in.md).



## Viewing Attendance Trends

1. Open **B1 Admin** and click **Attendance** in the sidebar.
2. Select the **Attendance** tab.
3. The report runs automatically when the tab opens, showing attendance over a default date range.

## Filtering Your Data

Use the filters at the top of the page to narrow the results:

- **Date Range** -- choose a start and end date to focus on a specific period.
- **Campus** -- select a campus to see attendance for only that location.
- **Service Time** -- pick a service time to drill into a particular gathering.

The chart and data update as soon as you change a filter, so you can quickly compare different time periods or locations.

:::info
Reports auto-run each time you open the Attendance tab, so you will always see up-to-date numbers without needing to click a refresh button.
:::

## Group Attendance

The **Groups** tab shows attendance broken down by individual group. This is useful when you want to monitor a specific class, ministry team, or small group rather than looking at overall service numbers.

1. Select the **Groups** tab.
2. Choose a group from the list to see its attendance history.
3. Use the date range filter to adjust the reporting window.

:::tip
Group attendance is especially valuable for [small group](../groups/creating-groups.md) leaders who want to track engagement within their group over time.
:::

## Tips for Using Attendance Data

- Review trends monthly to catch seasonal patterns early.
- Compare campus-level data to understand which locations are growing.
- Use group-level reports to follow up with [groups](../groups/group-members.md) that show declining attendance.
- Combine attendance insights with the [AI Search](../people/ai-search.md) tool to find people who haven't attended recently.

## Related Pages

- [Recording Attendance](recording-attendance.md) -- manually enter attendance for a group session
- [Check-In](check-in.md) -- set up self check-in so attendance is recorded automatically

---

## calendars/creating-calendars.md

# Creating Calendars



Creating a calendar in B1 Admin lets you build a curated view of events by connecting one or more groups. Events are managed by group leaders within their groups, and your calendar displays those events in one place. Even a domain admin cannot add or edit events directly in the calendar section unless they are a leader of the group the events belong to.




#### Before You Begin

- Set up the [groups](../groups/creating-groups.md) whose events you want to include in your calendar
- You need administrative access to the Calendars section in B1 Admin



## Creating a New Calendar

1. In the B1 Admin, navigate to **Website**, then to the **Calendars** section.
2. Click **Add Calendar**.
3. Enter a **name** for your calendar (for example, "Youth Ministry Events" or "Main Church Calendar").
4. Add an optional **description** to help your team understand what this calendar is for.
5. Click **Create** to save your new calendar.

## The Calendar Detail Page

After creating a calendar, click on it to open the detail page. This page has two main areas:

- **Left column** -- A view of the calendar showing events pulled in from connected groups.
- **Right column** -- The associated groups list. This is where you manage which groups are included in this calendar.

## Connecting Groups

Groups that have events in the calendar automatically appear in the groups list on the right side of the detail page.

1. Click **Add** in the groups section to associate a group with your calendar.
2. Select the group from the dropdown.
3. Choose whether to include **all events** from that group or only **specific events**.
4. Click **Save**.

:::tip
Connecting groups to your calendar is a powerful way to automatically aggregate events. When a group leader adds an event to their [group](../groups/creating-groups.md), it can flow into your church-wide calendar without any extra work from you.
:::

:::info
If you want to create a single calendar that pulls events from many groups across your church, see [Curated Calendar](curated-calendar) for a streamlined approach.
:::

## Enabling Event Registration

You can enable registration for any calendar event so members can sign up through the B1 website or mobile app.

1. Click on an existing event or create a new one.
2. In the event editor, toggle **Registration** to enable it.
3. Configure the registration settings:
   - **Capacity** (optional) -- Set a maximum number of registrations. Leave blank for unlimited.
   - **Registration Opens** -- The date and time when registration becomes available.
   - **Registration Closes** -- The date and time when registration closes.
   - **Tags** -- Comma-separated labels (e.g., "youth, retreat, vbs") to help categorize registerable events.
4. Save the event.

Once registration is enabled, members will see a **Register for this Event** button when they view the event on the [B1 website](../../b1-church/events/registering) or [B1 Mobile app](../../b1-mobile/events/registering).

### Managing Registrations

To view and manage registrations for your events:

1. Navigate to the **Registrations** page in B1 Admin.
2. You will see a table of all events with registration enabled, showing the event title, date, current registration count vs. capacity, and tags.
3. Click on an event to see the full list of registrations, including names, member count, status, and registration date.
4. From the detail page, you can:
   - **Cancel** individual registrations
   - **Delete** registrations permanently
   - **Export** all registrations to CSV

:::tip
Use the capacity progress bar to monitor how quickly events are filling up. The bar turns red when an event is at or over capacity.
:::

## Next Steps

- [Curated Calendar](curated-calendar) -- Create a calendar that pulls from multiple groups
- [Event Registration Guide](../guides/event-registration) -- Step-by-step guide for setting up event registration
- [Calendars Overview](./) -- Return to the calendars overview

---

## calendars/curated-calendar.md

# Curated Calendar



A curated calendar aggregates events from multiple groups into one unified calendar view. This is ideal for creating a church-wide calendar that shows everything happening across all your ministries and groups in a single place.




#### Before You Begin

- Set up the [groups](../groups/creating-groups.md) whose events you want to include
- Ensure group leaders have added events to their respective groups
- Familiarize yourself with the basics of [Creating Calendars](creating-calendars)



## Creating a Curated Calendar

1. From the B1 Admin, navigate to the **Website** section.
2. Click **Calendars** in the top navigation.
3. Click **Add Calendar** to create a new curated calendar.
4. Give your calendar a **name** (for example, "Church Events" or "This Week at Our Church").
5. Click **Create** to save it.

## Adding Groups to Your Calendar

1. Click on your new calendar to open it.
2. In the **Groups in Calendar** section on the right side, click **Add**.
3. Select a group from the dropdown menu.
4. Choose whether to add **all events** from that group or only **specific events**.
5. Click **Save**.
6. Repeat this process to add as many groups as you want to include.

:::tip
Add all your active ministry groups to create a comprehensive calendar that gives your congregation a complete picture of what is happening at your church each week.
:::

## Sharing Your Calendar

Once your curated calendar is set up, you can share it in several ways:

- **Embed on your website** -- The calendar can be displayed directly on your B1.church website pages for visitors to browse.
- **Subscribe via ICS** -- Click **Subscribe** to copy the ICS link. Your congregation can paste this link into Google Calendar, Apple Calendar, Outlook, or any other calendar app to stay in sync.
- **Download the ICS file** -- Download the calendar file to import it into a calendar application.

:::info
When group leaders add new events to their [groups](../groups/creating-groups.md), those events automatically appear in your curated calendar. You do not need to manually update the curated calendar each time a new event is added.
:::

## Next Steps

- [Creating Calendars](creating-calendars) -- Learn the basics of calendar creation
- [Calendars Overview](./) -- Return to the calendars overview

---

## calendars/index.md

# Calendars



The Calendars section in B1 Admin lets you create curated calendars for your church by pulling together events from your groups. Group leaders manage their own group's events, and as an admin you can build calendars that display those events on your B1.church website for your congregation to see.



## Viewing Your Calendars

1. In the B1 Admin, navigate to **Website**, then to the **Calendars** section.
2. The Calendars page lists all your calendars with their name and status.
3. Each calendar also shows the groups associated with it.

## What You Can Do

- **Add a new calendar** -- Click the add button to create a calendar for a specific ministry, event type, or purpose. See [Creating Calendars](creating-calendars) for step-by-step instructions.
- **Edit a calendar** -- Click on any calendar to open it and manage which groups are included in it.
- **Publish calendars** -- Calendars can be displayed on your B1.church website so visitors can see upcoming events at your church.
- **Create curated calendars** -- Pull events from multiple groups into a single calendar view for a comprehensive look at everything happening at your church. See [Curated Calendar](curated-calendar) for details.

:::info
Calendars work closely with [Groups](../groups/creating-groups.md). When groups have events scheduled, those events can be pulled into your calendars. See the [Creating Calendars](creating-calendars) page to learn how to connect groups to calendars.
:::

## Next Steps

- [Creating Calendars](creating-calendars) -- Set up a new calendar and connect groups
- [Curated Calendar](curated-calendar) -- Aggregate events from multiple groups into one view

---

## donations/batches.md

# Donation Batches



Batches group your donations together for easier tracking and reconciliation. A typical batch represents a single collection, such as a Sunday offering or a special event. Using batches helps you stay organized and makes it simple to verify that your records match the actual deposits.




#### Before You Begin

- Make sure you have [set up your funds](funds.md) so they are available when recording donations
- You will need access to the **Donations** section in B1 Admin



## The Batches Page

When you navigate to **Donations > Batches**, you will see a list of all your batches. Each row displays:

- **Name** -- the label you gave the batch
- **Date** -- the date of the collection
- **Donations** -- the number of individual donations in the batch
- **Total** -- the combined dollar amount

The header at the top shows summary statistics including the total number of batches, the total number of donations across all batches, and the overall dollar amount.

## Creating a New Batch

1. Click **Add Batch** at the top of the page.
2. Enter a descriptive name (e.g., "Sunday Offering - Feb 9").
3. Select the date of the collection.
4. Click **Save**.

Your new batch appears in the list, ready for you to add donations.

## Working with Batches

- **View donations** -- click a batch name to open it and see all the individual donations it contains. From there you can add, edit, or remove donations.
- **Edit batch details** -- click the **Edit** button on a batch row to change its name or date.
- **Sort** -- use the column headers to sort batches by name or date.
- **Export** -- click **Export to CSV** to download your batch list as a spreadsheet.

:::tip
Name your batches consistently so they are easy to find later. Including the date and collection type (e.g., "Sunday AM - 2025-02-09") keeps your list organized as it grows.
:::

## Next Steps

Once you have a batch, see [Recording Donations](recording-donations.md) to learn how to add individual donations to it. You can also [import Stripe transactions](stripe-import.md) to automatically create batches from online giving.

---

## donations/donation-reports.md

# Donation Reports



B1 Admin gives you several ways to view and analyze your church's giving data. The Donations Summary page provides a visual overview with charts and filters, while the Reports section offers a more detailed Donation Summary report. Use these tools to track giving trends, prepare for board meetings, or reconcile your records.




#### Before You Begin

- Ensure donations have been [recorded in batches](recording-donations.md) or [imported from Stripe](stripe-import.md)
- Verify that your [funds](funds.md) are set up correctly so donations are properly categorized



## Giving Dashboard

The **Giving Dashboard** is the first thing you see when you click **Donations** in the sidebar. It provides a high-level view of your giving activity with key performance indicators.

1. Navigate to **Donations** in the sidebar to open the dashboard.
2. At the top, four **KPI cards** display your giving metrics at a glance:
   - **Total Giving** -- The total amount donated in the selected period.
   - **Average Gift** -- The average donation amount.
   - **Unique Donors** -- The number of distinct people who gave.
   - **Total Donations** -- The total number of individual donations.
3. Use the **period toggle** to switch between **Weekly**, **Monthly**, and **Quarterly** views.
4. Below the KPIs, a chart displays giving trends for the selected period.
5. Click **Download** to export a CSV file with giving totals.

## Donations Summary Page

The **Summary** page provides more detailed aggregate giving data.

1. Navigate to **Donations** in the sidebar to open the Summary page.
2. Use the **date range filter** to select the time period you want to review. Set the earlier date on top and the more recent date on the bottom.
3. The page displays a weekly giving chart so you can see trends at a glance.
4. Click **Download** to export a CSV file with the total amount given, the week it was given, and the fund it was given to.

:::info
The Summary page shows aggregate giving data. It does not include individual donor names. For donor-level details, use the [Batches](batches.md) page.
:::

## Viewing Donor-Level Details

For a breakdown of who gave, how much, and to which fund:

1. Navigate to **Donations > Batches**.
2. Click on a **batch name** to open it.
3. The batch detail page lists each donation with the donor's name, amount, fund, date, and payment method.
4. Click on a **donor's name** to see a breakdown of how many times they donated and how much each time.
5. Click on a **donation ID** to open a side panel with the full details for that individual donation.
6. Click **Download** to export a CSV with all donor and donation information for that batch.

## Donation Summary Report

B1 Admin also includes a **Donation Summary** report in the Reports section:

1. Click **Reports** in the sidebar.
2. Select the **Donation Summary** report.
3. Choose your filters (date range, fund, campus, etc.) and run the report.

## Exporting Data

You can export donation data from multiple places:

- **Summary page** -- download a CSV of weekly giving totals by fund
- **Batch detail page** -- download a CSV of individual donations with donor details
- **Funds detail page** -- download donation history for a specific fund

:::tip
For year-end reporting, combine the Summary page export with the [Giving Statements](giving-statements.md) tool to get both aggregate trends and individual donor statements.
:::

## Next Steps

- Generate [Giving Statements](giving-statements.md) for your donors at year-end
- Review individual [batches](batches.md) to verify donation details
- Check [fund](funds.md) detail pages for giving breakdowns by category

---

## donations/funds.md

# Managing Funds



Funds let you categorize donations by purpose so you can track how much your church receives for each area of ministry. Common funds include General Fund, Building Fund, Missions, and Youth Ministry, but you can create as many as you need.




#### Before You Begin

- You will need access to the **Donations** section in B1 Admin
- Decide which giving categories your church needs and whether each should be tax-deductible



## The Funds Page

Navigate to **Donations > Funds** to see a list of all your funds. Each row shows the fund name and its **tax-deductible** status, which determines whether donations to that fund appear on year-end [giving statements](giving-statements.md).

## Creating a New Fund

1. Click **Add Fund** at the top of the page.
2. Enter a name for the fund (e.g., "Building Fund").
3. Check the **Tax Deductible** box if donations to this fund should be included on giving statements.
4. Click **Save**.

The new fund immediately appears in your list and is available when entering donations.

## Editing and Deleting Funds

- To edit a fund, click the **Edit** button next to it. You can change the name or toggle the tax-deductible setting.
- To delete a fund, open the edit form and click **Delete**.

:::warning
Deleting a fund does not remove donations that were previously assigned to it. Those donation records remain in the system, but the fund will no longer be available for new donations.
:::

## Viewing Fund Details

Click on a **fund name** to open its detail page. This page shows:

- **Donation history** -- a list of all donations to this fund
- **Date range filter** -- narrow the results to a specific time period
- **Summary statistics** -- total donations, unique donors, and total dollar amount

This view is helpful when you need to report on a specific giving initiative or check progress toward a fundraising goal.

## Sorting and Exporting

- Use the column headers to sort funds by name.
- Click **Export to CSV** to download your fund list as a spreadsheet.

:::tip
Set up your funds before you start [recording donations](recording-donations.md). Having all funds in place ensures donations are categorized correctly from the start.
:::

## Next Steps

Once your funds are set up, you can assign them to donations when [recording donations](recording-donations.md) in a batch. Make sure to mark the appropriate funds as tax-deductible before generating [giving statements](giving-statements.md).

---

## donations/giving-statements.md

# Giving Statements



At the end of each year, your donors need a summary of their tax-deductible giving for their records. B1 Admin makes it easy to generate these statements for all donors at once, saving you hours of manual work.




#### Before You Begin

- Verify that your [funds](funds.md) are correctly marked as **Tax Deductible** -- only donations to tax-deductible funds appear on statements
- Ensure all donations have been [recorded](recording-donations.md) and any online transactions have been [imported from Stripe](stripe-import.md)



## Accessing Giving Statements

1. In **B1 Admin**, click **Donations** in the sidebar.
2. Click **Statements**.

## Generating Statements

1. Select the **year** from the dropdown at the top of the page. You can choose the current year or any of the five previous years.
2. The page displays summary statistics for that year, including:
   - **Total donors** -- the number of people who gave
   - **Total donations** -- the number of individual donation records
   - **Total amount** -- the combined dollar amount of all giving

## Downloading Statements

You have two options for getting statements to your donors:

### Download as CSV Files

Click **Download ZIP** to download a ZIP file containing an individual CSV file for each donor. This is useful if you want to email statements individually or import them into another system.

### Print All Statements

Click **Print All** to open a printable view of every donor's statement in your browser. From there, use your browser's print function to send them to a printer. Each statement starts on a new page so they are ready to fold and mail.

:::tip
Run your statements early in January while your records are fresh. Double-check that your funds are correctly marked as tax-deductible before generating statements -- only donations to tax-deductible funds are included.
:::

:::info
Giving statements only include donations assigned to funds that have the **Tax Deductible** setting enabled. If a fund is not marked as tax-deductible, its donations will not appear on the statement. You can manage this setting on the [Funds](funds.md) page.
:::

## Next Steps

If you need to review donation details before generating statements, visit the [Donation Reports](donation-reports.md) page or check individual [batches](batches.md).

---

## donations/index.md

# Donations



The Donations section in B1 Admin provides everything you need to manage your church's giving. From recording weekly offerings to generating year-end tax statements, all of your donation tools are organized in one place so you can stay on top of your church's finances.



## Sub-Sections

You will find the following pages in the Donations sidebar:

### Summary

The **Summary** page gives you a visual overview of all giving activity. It displays charts and filtered reports so you can quickly see donation trends across your church. See [Donation Reports](donation-reports.md) for more details on using the summary and report tools.

### Batches

**[Batches](batches.md)** let you group donations together -- for example, all the checks and cash collected during a Sunday offering. Each batch tracks its donation count and total amount for easy reconciliation.

### Funds

**[Funds](funds.md)** categorize your donations by purpose. Common examples include General Fund, Building Fund, and Missions. You can mark each fund as tax-deductible or not.

### Statements

The **[Statements](giving-statements.md)** page generates year-end giving statements for your donors. You can download individual CSV files or print all statements at once.

### Stripe Import

If you accept online donations through Stripe, the **[Stripe Import](stripe-import.md)** tool lets you pull those transactions into B1 Admin so everything is in one system.

## Online Giving

B1 Admin integrates with **Stripe** and **PayPal** for accepting online donations. Once configured, members can give through your B1.church site and those donations automatically appear in your records. See [Online Giving Setup](online-giving-setup.md) to get started.

:::tip
If you are new to donations in B1 Admin, start by [setting up your funds](funds.md), then [create your first batch](batches.md) and [record donations](recording-donations.md) into it.
:::

## Next Steps

- [Recording Donations](recording-donations.md) -- enter donations into a batch
- [Donation Batches](batches.md) -- organize donations into groups
- [Managing Funds](funds.md) -- set up and manage giving categories
- [Giving Statements](giving-statements.md) -- generate tax statements for donors
- [Online Giving Setup](online-giving-setup.md) -- connect Stripe or PayPal
- [Stripe Import](stripe-import.md) -- import online transactions
- [Donation Reports](donation-reports.md) -- view and filter donation summaries

---

## donations/multi-currency.md

# Multi-Currency Support



B1's multi-currency feature allows your church to accept and track donations in different currencies. This is particularly useful for churches with international members, missionaries, or multiple campuses in different countries.




#### Before You Begin

- You need permission to manage donations. See [Roles & Permissions](../people/roles-permissions.md) for details.
- Set up your [online giving](./online-giving-setup.md) with Stripe, which supports multi-currency transactions.
- Understand your church's accounting needs for handling multiple currencies.



## Enabling Multi-Currency

Multi-currency support is now enabled by default in B1. Once enabled:

- Members can give in their local currency when donating online
- You can manually record donations in any currency
- Donation reports show amounts in their original currency
- Stripe handles currency conversion automatically for online giving

## Supported Currencies

The system supports all major world currencies, including:

- **USD** -- United States Dollar
- **EUR** -- Euro
- **GBP** -- British Pound
- **CAD** -- Canadian Dollar
- **AUD** -- Australian Dollar
- **MXN** -- Mexican Peso
- **BRL** -- Brazilian Real
- **INR** -- Indian Rupee
- **CNY** -- Chinese Yuan
- **JPY** -- Japanese Yen
- And many more...

The available currencies for online giving depend on your Stripe account's supported currencies.

## Recording Donations in Different Currencies

### Online Donations

When a member gives online through Stripe:

1. They select their preferred currency at checkout
2. Stripe processes the payment in that currency
3. The donation is recorded in B1 with the original currency amount
4. Stripe automatically handles any necessary currency conversion to your account's default currency

### Manual Entry

To record a cash or check donation in a different currency:

1. Navigate to **Donations** in B1 Admin
2. Click **Add Donation**
3. Select the currency from the currency dropdown
4. Enter the amount in that currency
5. Complete the rest of the donation details
6. Click **Save**

## Viewing Multi-Currency Donations

### Donation Reports

Donation reports display amounts in their original currency:

- Individual donation records show the currency code (e.g., "$100.00 USD")
- Totals are calculated per currency
- You can filter by specific currencies

### Giving Statements

When generating giving statements:

- Each donation appears with its original currency
- Totals are broken down by currency
- Members see exactly what they gave in each currency

## Stripe Integration

For online giving, Stripe handles multi-currency transactions:

- **Automatic conversion** -- Stripe converts currencies to your account's default currency
- **Exchange rates** -- Stripe uses current market exchange rates
- **Fees** -- Currency conversion may incur additional Stripe fees
- **Payout currency** -- Funds are deposited in your account's default currency

:::info
Check your Stripe dashboard to see current conversion rates and any fees associated with multi-currency transactions.
:::

## Accounting Considerations

When working with multiple currencies:

- **Record-keeping** -- Keep track of original donation amounts and currencies for accurate reporting
- **Exchange rates** -- Note that Stripe's conversion rates may differ from your bank's rates
- **Tax receipts** -- Consult your accountant about how to report donations in different currencies for tax purposes
- **Fund allocation** -- You can allocate donations to specific funds regardless of currency

## Best Practices

- **Default currency** -- Set your primary church currency as the default for most transactions
- **Clear communication** -- Tell donors what currency they're giving in during the checkout process
- **Consistent reporting** -- Decide whether to report in original currencies or convert to a single currency for summaries
- **Regular reconciliation** -- Reconcile Stripe payouts with your donation records, accounting for currency conversions

## Limitations

- Currency conversion is handled by Stripe for online giving only
- Manual donations are recorded as-entered with no automatic conversion
- Historical reports show donations in their original currencies
- Total calculations are done per-currency, not across currencies

## Related Articles

- [Online Giving Setup](./online-giving-setup.md) -- Configure Stripe for accepting donations
- [Recording Donations](./recording-donations.md) -- Manually enter donation records
- [Donation Reports](./donation-reports.md) -- Generate and view donation summaries
- [Giving Statements](./giving-statements.md) -- Create year-end giving statements

---

## donations/online-giving-setup.md

# Online Giving Setup



B1 Admin integrates with **Stripe** and **PayPal** so your members can give online through your B1.church site. Once configured, online donations automatically appear in your donation records alongside manually entered gifts, keeping everything in one system.




#### Before You Begin

- Set up your [donation funds](funds.md) so donors can designate their gifts
- Create a Stripe account at [stripe.com](https://stripe.com) and activate it (take it out of test mode)
- Have your B1 Admin login credentials ready



## Setting Up Stripe

1. Create an account at [stripe.com](https://stripe.com) if you do not already have one. Make sure to **activate your account** and take it out of test mode.
2. In Stripe, go to **Developers > API Keys**.
3. Copy your **Publishable Key**.
4. Log in to [B1 Admin](https://admin.b1.church/).
5. Click **Church** in the top navigation, then click **Edit Church Settings**.
6. Click the edit icon next to **Church Settings**.
7. Scroll down to the **Giving** section.
8. Set the **Provider** to **Stripe**.
9. Paste your Publishable Key into the **Public Key** field.
10. Go back to Stripe and reveal your **Secret Key** (you can only view this once, so save a backup).
11. Paste the Secret Key into the **Secret Key** field and click **Save**.

:::warning
Your Stripe Secret Key is only shown once. Copy it to a secure location before navigating away from the Stripe dashboard. If you lose it, you will need to generate a new key.
:::

## Choosing Your Currency

After selecting Stripe as your provider, a **Currency** dropdown appears alongside your API keys. Pick the currency that matches your Stripe account's settlement currency so donations are charged correctly.

Supported currencies include USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, and BRL. You can confirm or change your account's default currency in your [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
The currency you select here is used for one-time donations, recurring subscriptions, fee calculations, and donation reports. If you switch currencies later, only new donations and subscriptions will use the new currency — existing recurring gifts continue in the currency they were created with.
:::

:::warning
Make sure your Stripe account is configured to accept the currency you choose. If your Stripe account does not support the selected currency, donations will fail at checkout.
:::

## Adding a Donation Page to Your B1.church Site

1. Go to [b1.church](https://b1.church/) and log in.
2. Click the **Settings** icon.
3. Click **Add Tab**.
4. Choose **Donation** as the type.
5. Enter a name for the tab (e.g., "Give") and click **Save**.
6. Optionally, change the tab icon -- type "Giv" in the icon search for a giving-related icon.

Your donation page is now live. Members can visit it at `yoursubdomain.b1.church/donate`.

## Sharing Your Giving Link

To find your giving URL, go to **B1 Admin** and click the **Settings** icon to see your subdomain. Your donation link follows the format:

`https://yoursubdomain.b1.church/donate`

Share this link on your website, in emails, or in your bulletin so members know where to give online.

## Donation Notifications

Stripe sends an email notification each time a donation is received. To change the notification email address, go to the Stripe dashboard, click your profile in the top right, choose **Profile**, and update your email address.

## Processing Fee Options

You can configure your giving page to let donors optionally cover processing fees so your church receives the full donation amount. This setting is managed in your church settings within B1 Admin.

:::tip
After setup, make a small test donation to confirm everything is working before announcing online giving to your congregation.
:::

## Next Steps

- Use [Stripe Import](stripe-import.md) to pull online transactions into B1 Admin if they are not syncing automatically
- Check your [Donation Reports](donation-reports.md) to verify that online donations are appearing correctly
- Generate [Giving Statements](giving-statements.md) that include both online and offline donations

---

## donations/recording-donations.md

# Recording Donations



Recording donations in B1 Admin is done through the Batches system. You create a batch to represent a collection (such as a Sunday offering), then add individual donations to that batch. This keeps your giving records organized and easy to reconcile.




#### Before You Begin

- Set up your [funds](funds.md) so you can assign donations to the correct categories
- Create a [batch](batches.md) to hold the donations you are about to enter
- Make sure the donors are in your [people directory](../people/adding-people.md) so you can look them up when entering gifts



## Creating a Batch and Adding Donations

1. In **B1 Admin**, click **Donations** in the sidebar, then click **Batches**.
2. Click **Add Batch**.
3. Enter a name for the batch (e.g., "Sunday Offering - Jan 5") and select the date. Click **Save**.
4. Your new batch appears in the list showing zero donations and $0.00.
5. Click on the **batch name** to open it.

## Entering Individual Donations

1. In the batch detail page, type the donor's name in the **search field** to find them.
2. After selecting a person, the donation entry form appears with fields for **Date**, **Payment Method**, **Fund**, **Amount**, and **Check Number**.
3. Fill in the details and click **Add Donation**.
4. The donation is added to the table below, and the form resets so you can enter the next one.

:::tip
You can quickly enter multiple donations in a row without leaving the batch page. The form resets after each entry so you can move through a stack of checks or envelopes efficiently.
:::

## Splitting a Donation Across Multiple Funds

Sometimes a single donor gives to more than one fund in one transaction. To handle this:

1. Click the **Edit** button on the donation row.
2. In the edit form, add amounts to different funds. The total will automatically calculate from the individual fund amounts.
3. Click **Save** to update the donation.

:::info
Splitting donations across funds is common when a donor writes a single check designated for multiple purposes, such as General Fund and Missions.
:::

## Editing or Removing Donations

To edit a donation, click the **Edit** button on its row in the batch. You can change the date, amount, fund, payment method, or any other detail. Click **Save** when you are done.

:::tip
The batch page header updates automatically to show the total number of donations and the combined dollar amount as you add or edit entries. Use this to reconcile against your deposit slip.
:::

## Next Steps

- Review your entries using [Donation Reports](donation-reports.md) to verify accuracy
- At year-end, generate [Giving Statements](giving-statements.md) for your donors

---

## donations/stripe-import.md

# Stripe Import



If you accept online donations through Stripe, the Stripe Import tool lets you pull those transactions into B1 Admin so all of your giving data lives in one place. This is especially useful for catching any transactions that were not automatically synced.




#### Before You Begin

- Complete the [Online Giving Setup](online-giving-setup.md) to connect your Stripe account to B1 Admin
- Verify that you have donations in your Stripe dashboard for the date range you want to import



## How It Works

The import process uses a two-step workflow: first you preview what would be imported, then you confirm the import. This dry-run approach lets you review everything before any data is created.

## Importing Transactions

1. In **B1 Admin**, navigate to **Donations > Batches**.
2. Click the **Stripe Import** link at the bottom of the Batches page.
3. Select a **date range** for the transactions you want to import.
4. Click **Preview** to run a dry-run check.

## Reviewing the Preview

The preview displays each transaction from Stripe along with a status indicator:

- **New** -- this transaction has not been imported yet and will be included if you proceed.
- **Already Imported** -- this transaction already exists in B1 Admin and will be skipped.
- **Skipped** -- this transaction was excluded for another reason (e.g., a refund or failed charge).

A summary section at the top shows the total number of transactions in each category and the dollar amounts involved.

:::info
The preview step does not create any records. It is a read-only check so you can verify what will happen before committing.
:::

## Completing the Import

1. Review the preview results and the summary totals.
2. Click **Import Missing** to import all transactions marked as **New**.
3. After the import completes, status chips next to each transaction update to show the result.

## Tips for Using Stripe Import

- Run the import regularly (weekly or monthly) to keep your records current.
- If a transaction shows as **Already Imported**, it means B1 Admin already has a matching record -- no action is needed.
- Use the date range filter to focus on a specific period if you are looking for particular transactions.

:::tip
After importing, visit the [Batches](batches.md) page to verify that the imported donations appear correctly and the totals match what you see in your Stripe dashboard.
:::

## Next Steps

- Check [Donation Reports](donation-reports.md) to review the imported transactions alongside your other giving data
- Ensure imported donations are assigned to the correct [funds](funds.md) for accurate [giving statements](giving-statements.md)

---

## forms/creating-forms.md

# Creating Forms



Build custom forms to collect information from your congregation. You can create forms for event registrations, surveys, visitor cards, membership applications, and more. Forms can be linked to people in your database or used as standalone pages with their own public URL.




#### Before You Begin

- For **People** forms (linked to person records), you need [people in your database](../people/adding-people.md) first.
- For forms that collect **payments**, you must have [Stripe configured for online giving](../donations/online-giving-setup.md).



## Creating a New Form

1. Navigate to **Forms** from the main menu.
2. Click **Add Form**.
3. Enter a **name** for your form.
4. Choose the form type from the dropdown:
   - **People** — Associates submissions with [people records](../people/adding-people.md) in your database.
   - **Stand Alone** — Creates an independent form with its own public URL, ideal for external registrations.
5. Click **Save** to create the form.

Your new form will appear in the list. Click on it to start adding questions.

## Adding Questions

1. Open your form and go to the **Questions** tab.
2. Click **Add Question**.
3. Select a **field type** from the Provider dropdown. Available types include:
   - **Textbox** — For short text answers
   - **Date** — For date selections
   - **Email** — For email addresses
   - **Phone Number** — For phone input
   - **Multiple Choice** — For selecting from predefined options
   - **Payment** — For collecting payments
4. Enter a **Title** and optional **Description** for the question.
5. Check **Require an answer** if the field is mandatory.
6. Click **Save**.
7. Repeat to add more questions.

:::warning
The **Payment** field type requires Stripe to be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Managing Form Members

1. Open your form and go to the **Members** tab.
2. Search for a person and add them with a role:
   - **Admin** — Can edit the form and view all submissions.
   - **View Only** — Can view submissions but cannot edit the form.

## Configuring Form Properties

You can update your form's name and settings at any time. For Stand Alone forms, you will also see a unique **public URL** that you can share with anyone.

:::tip
Stand Alone forms are great for event registrations. Share the public URL via email, social media, or embed the form directly on your church website.
:::

:::info
To embed a form on your B1 website, go to your website editor, add a new section, and select the **Form** element. Then choose the form you want to display. See [Managing Pages](../website/managing-pages.md) for details on editing your website.
:::

---

## forms/index.md

# Forms



The Forms section lets you create custom forms for registrations, surveys, data collection, and more. Whether you need a visitor card, an event sign-up, or a prayer request form, you can build it here and share it with your congregation through a public link or your B1.church website.



## The Forms Page

When you open **Forms**, you will see two tabs:

- **Forms** -- Shows all your active forms.
- **Archived** -- Shows forms that have been archived. You can restore archived forms at any time.

Each form in the list displays its name and, if configured, a public URL that you can share externally.

## What You Can Do

From the Forms page, you can:

- **Add a form** -- Click **Add Form** to create a new custom form.
- **Edit a form** -- Click on a form name to open it and modify its questions, members, or settings.
- **Archive a form** -- Move forms you no longer need to the **Archived** tab to keep your list clean.
- **Restore a form** -- Switch to the **Archived** tab and restore any form you want to make active again.

## Working with a Form

Click on any form name to open it. The form editor has three tabs:

- **Questions** -- Build the form structure by adding fields with different types. See [Creating Forms](./creating-forms.md) for details.
- **Members** -- Control who can access and manage the form.
- **Submissions** -- View responses that have been submitted. See [Managing Submissions](./managing-submissions.md) for details.

:::tip
Forms with a public URL can be shared via link, embedded on your website, or included in emails. This makes it easy to collect information from people who may not have a church account.
:::

:::info
You can control who has access to each form using the **Members** tab. Assign **Admin** or **View Only** roles to give your team the right level of access.
:::

## Learn More

- [Creating Forms](./creating-forms.md) -- Step-by-step guide to building forms and adding questions.
- [Managing Submissions](./managing-submissions.md) -- How to view and manage form responses.

---

## forms/managing-submissions.md

# Managing Submissions



Once your form is live, submissions will start coming in. The Submissions tab lets you review every response, track who has submitted, and use the data to follow up with your congregation in a timely manner.




#### Before You Begin

- [Create a form](./creating-forms.md) with at least one question
- Share the form via its public URL or embed it on your [website](../website/managing-pages.md)



## Viewing Submissions

1. Navigate to **Forms** from the main menu.
2. Click on the form you want to review.
3. Go to the **Submissions** tab.

You will see a list of all responses received for that form. Each submission shows the respondent's information and the date it was submitted.

## Reviewing Individual Submissions

Click on any submission to view the full details. You will see all the answers the person provided for each question on the form.

## How Submissions Are Collected

Submissions can come in through several channels:

- **Public URL** -- If your form has a public URL (Stand Alone forms), anyone with the link can submit a response. Share the URL via email, social media, or text messages.
- **Embedded on your website** -- Forms embedded on your B1 website collect submissions automatically when visitors fill them out.
- **Internal use** -- Staff and volunteers can also submit forms on behalf of others directly within B1 Admin.

:::tip
Check the **Submissions** tab regularly for forms like visitor cards or prayer requests, so you can follow up promptly.
:::

## Using Submission Data

The data collected through forms can help you:

- Track event registrations and plan accordingly
- Follow up with visitors or new members
- Collect survey feedback for ministry planning
- Process payments for events or programs

:::info
Form members with **Admin** or **View Only** roles can access the Submissions tab. Make sure the right people on your team have access to the forms they need by managing roles in the **Members** tab.
:::

## Next Steps

- Learn how to build and customize forms in [Creating Forms](./creating-forms.md)
- Add people from form submissions to your [people directory](../people/adding-people.md) for ongoing follow-up

---

## groups/creating-groups.md

# Creating Groups



Creating a group in B1 Admin is straightforward. You will set up a category, name your group, and then configure its settings. Groups help you organize your church into meaningful units like small groups, committees, and classes.




#### Before You Begin

- You need an active B1 Admin account with permission to manage groups. See [Roles & Permissions](../people/roles-permissions.md) if you're unsure about your access level.
- Decide on a category structure for your groups (for example, "Small Groups," "Ministries," "Committees"). Categories help keep related groups organized.



## Adding a New Group

1. Navigate to the **B1 Admin dashboard**.
2. Click on the **Groups** tab.
3. Click **Add Group** and enter a **Category Name**. Categories help you organize related groups together (for example, "Small Groups," "Ministries," or "Committees"). If a category already exists, you can select it from the list.
4. Enter the **Group Name**.
5. Click **Add**. Your new group will appear in the list under the chosen category.

## Configuring Group Settings

Once your group is created, you can fill in additional details:

1. Click on the **group name** in the list to open it.
2. Click the **pencil icon** to edit the group settings.
3. Configure the following options:
   - **Description** -- A brief summary of what the group is about. This is visible to members.
   - **Meeting Times** -- When the group typically meets (for example, "Wednesdays at 7 PM").
   - **Join Policy** -- Choose who can join this group:
     - **Open** -- Anyone can join immediately without approval
     - **Request** -- People must submit a join request that requires approval (see [Group Join Requests](./group-join-requests.md))
     - **Closed** -- Members must be added manually by leaders or administrators
   - **Attendance Tracking** -- Enable this if you want to record [attendance](../attendance/tracking-attendance.md) for this group.
   - **Service Times** -- Associate the group with specific church service times if applicable. See [Attendance Setup](../attendance/setup.md) for details on service times.
4. Click **Save** to apply your changes.

:::tip
Adding a clear description and meeting time helps members know what to expect when they join a group.
:::

## Next Steps

After creating and configuring your group, you are ready to:

- **Add members** -- Search for people and add them to the group. Use the green key icon to designate group leaders. See [Group Members](./group-members.md).
- **Set up a calendar** -- Create events and recurring meetings for the group. See [Group Calendar](./group-calendar.md).
- **Communicate** -- Send messages to all group members directly from the group page.
- **Export data** -- Click the download icon to export your group's member list.

:::info
All your church groups are organized by categories on the main Groups page. You can always rearrange or rename categories as your church grows.
:::

---

## groups/group-calendar.md

# Group Calendar



Each group in B1 can have its own event calendar. Group leaders use it to schedule meetings, activities, and recurring events, while all group members can view upcoming events and join conversations about them. The calendar keeps your group organized and ensures everyone stays informed about what is coming up.




#### Before You Begin

- You need a group created in B1 Admin with at least one member. See [Creating Groups](creating-groups.md) and [Group Members](group-members.md).
- To add or edit calendar events, you must be designated as a group leader. See [Designating Group Leaders](group-members.md) for instructions.



## Accessing the Group Calendar

The group calendar is available through the B1.church member-facing app:

1. From B1 Admin, click the **dropdown menu** in the top right corner of your screen.
2. Select **Switch App**.
3. Choose **B1.church**.
4. Click **Groups** in the left sidebar.
5. Select your group from the list.
6. Click **Calendar** on the left side of the screen.

:::info
The group calendar is managed through B1.church (the member app) rather than B1 Admin. Group leaders access it by switching apps from the admin dashboard.
:::

## Adding an Event

1. From the group calendar, click **Add an Event**.
2. Enter a **title** for the event.
3. Write a short **description** of what the event is about.
4. Set the **start time** and **end time**.
5. Click **Save** to add the event to the calendar.

## Setting Up Recurring Events

If your group meets on a regular schedule, you can set events to repeat automatically:

1. When creating or editing an event, check the **Recurring** box.
2. Choose how the event should repeat:
   - **Interval** -- Set a number of days between occurrences. For example, entering "7" repeats the event every 7 days.
   - **Frequency** -- Choose to repeat by **day**, **week**, or **month**.
3. Save the event. It will now appear on the calendar at each scheduled occurrence.

:::tip
For a group that meets every Saturday, set the frequency to "week" and choose Saturday. The event will automatically populate on the calendar going forward.
:::

## Viewing the Calendar

The group calendar offers multiple view options:

- **Month** -- See the full month at a glance.
- **Week** -- Focus on the current week.
- **Day** -- View a single day in detail.
- **Agenda** -- See a list of upcoming events in chronological order.

Switch between views using the buttons at the top of the calendar.

## Event Details and Conversations

Click on any event to view its details. From the event detail view:

- **Members and leaders** can start conversations and leave comments about the event.
- **Leaders** can edit event details, change times, or delete the event.

:::warning
Deleting an event removes it permanently. If you need to cancel a single occurrence of a recurring event, consider editing it instead.
:::

## Subscribing to the Calendar

You can sync the group calendar with your personal calendar:

1. From the group calendar page, click **Subscribe**.
2. Follow the prompts to add the calendar to Google Calendar, Apple Calendar, Outlook, or any other calendar application that supports subscriptions.

:::tip
Subscribing keeps your personal schedule in sync with your group's events without needing to check B1 separately. Any changes made by group leaders will automatically appear in your synced calendar.
:::

---

## groups/group-join-requests.md

# Group Join Requests



When a group is configured with an approval-based join policy, people can submit requests to join. Group leaders and administrators review these requests and approve or decline them. This gives your church control over group membership while making it easy for people to express interest in joining.




#### Before You Begin

- You need permission to manage groups, or you need to be a leader of the specific group. See [Roles & Permissions](../people/roles-permissions.md) for details.
- The group must have its join policy set to **Request** (approval required). See [Creating Groups](./creating-groups.md) for how to configure join policies.



## Understanding Join Policies

Groups can have three different join policies:

- **Open** -- Anyone can join immediately without approval
- **Request** -- People submit a join request that requires approval
- **Closed** -- Nobody can request to join (members must be added manually)

When a group uses the **Request** policy, all join attempts go through the approval workflow described on this page.

## Viewing Pending Requests

### For Group Leaders

1. Navigate to **Groups** in B1 Admin
2. Click on the group name
3. Click the **Join Requests** tab
4. You will see all pending requests for this group

### For Administrators

Administrators with group management permissions can view pending requests across all groups:

1. Navigate to **Groups** in B1 Admin
2. Look for a notification badge or pending requests indicator
3. Click to view all pending requests church-wide

## Reviewing a Join Request

Each join request shows:

- **Person's name and photo** -- The person requesting to join
- **Optional message** -- A personal message explaining why they want to join (if provided)
- **Request date** -- When the request was submitted

To review a request:

1. Read the person's message if they provided one
2. Click on the person's name to view their profile if needed
3. Decide whether to approve or decline

## Approving a Request

1. Click **Approve** on the join request
2. The person is immediately added to the group as a member
3. The requester receives a notification that their request was approved
4. The request is marked as approved in the system

:::tip
When you approve a request, the person becomes a regular group member. You can later promote them to group leader if needed from the [Group Members](./group-members.md) page.
:::

## Declining a Request

1. Click **Decline** on the join request
2. Optionally provide a reason for declining (up to 500 characters)
3. Click **Confirm**
4. The requester receives a notification with your decline reason (if provided)
5. The request is marked as declined

:::info
Providing a decline reason helps the person understand why their request wasn't approved and may encourage them to try again later or explore other groups.
:::

## Notifications

The join request system automatically sends notifications:

- **When a request is submitted** -- All group leaders receive a notification
- **When a request is approved** -- The requester receives a confirmation
- **When a request is declined** -- The requester receives a notification with any decline reason

Notifications appear in the user's notification center on B1.church and in the mobile app.

## Managing Requests from the Member Side

People can manage their own join requests from B1.church:

- View the status of their pending requests on the group detail page
- Cancel a pending request if they change their mind
- See if their request was approved or declined

## Best Practices

- **Respond promptly** -- Try to review requests within 24-48 hours so people aren't left waiting
- **Be clear in decline reasons** -- Help people understand next steps or alternative options
- **Check profiles** -- Review the person's profile to see if they're a good fit for the group
- **Communicate expectations** -- Make sure your group description clearly states who the group is for

## Related Articles

- [Creating Groups](./creating-groups.md) -- Learn how to set up groups and configure join policies
- [Group Members](./group-members.md) -- Manage existing group members
- [Group Calendar](./group-calendar.md) -- Schedule group meetings and events

---

## groups/group-members.md

# Group Members



Once you have created a group, the next step is adding members. From a group's detail page you can search for people, add them to the group, assign leaders, send messages, and export the member list. Managing group membership is essential for coordinating small groups, committees, and classes.




#### Before You Begin

- You need at least one group set up in B1 Admin. See [Creating Groups](creating-groups.md) if you haven't created one yet.
- The people you want to add must already exist in your [People](../people/adding-people.md) directory.



## Adding Members to a Group

1. Navigate to the **Groups** page and click on the group you want to manage.
2. Click the **Members** tab.
3. In the search box, type the name of the person you want to add.
4. Click **Add** next to the person's name in the search results.
5. The person now appears in the group member list.

:::tip
Leave the search box blank and click **Search** to browse through your entire directory. This is helpful if you are not sure of the exact spelling of someone's name.
:::

## Designating Group Leaders

Group leaders have special privileges -- they can edit the [group calendar](group-calendar.md), manage events, and help coordinate the group.

1. In the group member list, find the person you want to make a leader.
2. Click the **green key icon** next to their name.
3. The person is now designated as a group leader.

To remove leader status, click the green key icon again.

:::info
Any group member can view the group calendar and events, but only leaders can add or edit calendar events.
:::

## Sending Messages to Group Members

You can communicate with all members of a group directly from B1 Admin:

1. From the group detail page, look for the messaging area.
2. Type your message in the text box.
3. Click **Send**.

Your message will be delivered to all members of the group.

## Emailing Group Members

You can send formatted emails to all members of a group:

1. From the group detail page, click the **email icon**.
2. The Send Email dialog opens, showing how many members will receive the email and how many have no email address on file.
3. Optionally select an **email template** from the dropdown, or compose a message from scratch. Click **Manage Templates** to create or edit templates.
4. Enter a **subject line**. You can insert merge fields by clicking the field chips: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Compose the **email body** using the HTML editor. The same merge fields are available here.
6. Click **Send**.
7. A summary shows how many emails were sent successfully and how many members were skipped (no email on file).

:::tip
Create reusable email templates for recurring communications like weekly updates, event announcements, or prayer requests. Templates save time and ensure consistent messaging.
:::

## Exporting Group Data

To download the group member list as a file:

1. From the group detail page, click the **download icon**.
2. A CSV file containing the group's member information will download to your computer.

This is useful for creating printed rosters, importing data into other tools, or keeping offline records. For more export options, see [Exporting Data](../people/exporting-data.md).

## Removing Members

To remove someone from a group, locate their name in the member list and click the **remove** button next to their entry.

:::info
Removing a person from a group does not delete them from your church directory. They will still appear in the [People](../people/adding-people.md) section and can be re-added to the group at any time.
:::

---

## groups/index.md

# Groups



The **Groups** section lets you organize your church members into ministries, small groups, Bible studies, committees, and more. Groups are the backbone of community life at your church, and this section gives you the tools to create, manage, and communicate with every group in one place. Note that **Teams** are separate from Groups — Teams are used for serving and volunteer scheduling.



## Overview

Groups are organized by **category**. A category is a top-level label such as "Small Groups," "Ministries," or "Committees." Each category can contain multiple groups, making it simple to keep related groups together.

When you open the Groups page, you will see a summary at the top showing:

- **Total Groups** -- the number of groups across all categories
- **Categories** -- the number of group categories you have created
- **Total Members** -- the combined count of members across all groups

Below the summary, your groups are listed by category with the member count shown for each group.

## What You Can Do

Here is what you can accomplish in the Groups section:

1. **Create and organize groups** -- Add new groups within categories to reflect how your church is structured. See [Creating Groups](./creating-groups.md).

2. **Manage group members** -- Add and remove members, designate leaders, and communicate with your groups. See [Group Members](./group-members.md).

3. **Schedule events** -- Each group can have its own calendar for meetings, events, and recurring activities. See [Group Calendar](./group-calendar.md).

4. **Export group data** -- Download member lists for any group as a CSV file for use in spreadsheets or mailings. See [Group Members](./group-members.md) for export instructions.

## Getting Started

To access Groups, click **People** in the left sidebar of your B1 Admin dashboard, then select **Groups**. You will see all of your existing groups organized by category.

:::tip
If you are just getting started, begin by creating a few categories that match your church structure (for example, "Ministries," "Small Groups," "Committees"). Then add individual groups within each category. See [Creating Groups](./creating-groups.md) for a step-by-step walkthrough.
:::

:::info
Group members must first exist in your [People](../people/adding-people.md) directory before they can be added to a group. If you are setting up B1 for the first time, [import your member data](../people/importing-data.md) before creating groups.
:::

---

## guides/childrens-checkin.md

# Set Up Children's Ministry Check-In



This guide walks you through everything needed to get a children's check-in system running at your church — from entering families in the database, to configuring age-appropriate groups, to printing name tags on Sunday morning. By the end, parents will be able to check in their kids at a kiosk tablet and receive a matching security tag.




#### Before You Begin

- Create your church account at [admin.b1.church](https://admin.b1.church)
- Make sure you have admin access — see [Roles & Permissions](../people/roles-permissions.md) if needed
- Optional: Prepare a CSV file of families if you're migrating from another system



## Step 1: Add Families to Your Database

Before check-in can work, the system needs to know about your families. Each child needs to be linked to a parent through the household feature.

Follow the [Adding People](../people/adding-people.md) guide to add at least one family. Be sure to:

- Add the parent(s) first
- Add each child
- Link them in the same household using the [household editor](../people/adding-people.md#managing-households)

:::tip
If you have more than a handful of families to add, use the [CSV Import](../people/importing-data.md) tool instead of adding them one by one. You can import your entire directory in minutes.
:::

## Step 2: Create Children's Groups

Groups define the classes kids check into. You'll typically want one group per age range.

Follow the [Creating Groups](../groups/creating-groups.md) guide to create groups like:

- **Nursery** (ages 0–2)
- **Preschool** (ages 3–5)
- **Elementary** (ages 6–10)

You can adjust the names and age ranges to match your ministry structure.

## Step 3: Configure Campuses and Services

Check-in is tied to specific service times. You need at least one campus and one service configured.

Follow the [Attendance Setup](../attendance/setup.md) guide to:

1. Add your campus (e.g., "Main Campus")
2. Add a service (e.g., "Sunday Morning")
3. Set the service time (e.g., "9:00 AM")
4. Assign your children's groups to the service

## Step 4: Set Up the Check-In App

Now connect everything by installing the check-in app on a tablet.

1. Install the **B1 Checkin app** — see the [Check-In](../attendance/check-in.md) article for download links
2. Sign in with your B1 Admin credentials
3. Select your campus and service time

See the full [Check-In](../attendance/check-in.md) article for detailed setup steps.

## Step 5: Get Your Hardware

You need a tablet for the kiosk and optionally a Brother label printer for name tags.

At minimum:
- **One Android or Amazon Fire tablet** — see [recommended tablets](../attendance/check-in.md#recommended-hardware)
- **One Brother label printer** — the QL-1110NWB is recommended for its Bluetooth and WiFi support
- **Brother DK-1201 labels** (1-1/7" x 3-1/2")

:::warning
Only Brother label printers are compatible with the B1 Checkin app. Other printer brands will not work.
:::

## Step 6: Run a Test Check-In

Before Sunday morning, do a test run:

1. Open the B1 Checkin app on your tablet
2. Select your campus and the correct service time
3. Search for one of the families you added
4. Check in a child and verify:
   - The attendance shows up in B1 Admin under **Attendance**
   - If using a printer, a name tag prints correctly

:::tip
Train your welcome team volunteers on the check-in process before launching. A quick 5-minute walkthrough is usually all that's needed.
:::

## You're Done!

Your children's ministry check-in is ready. Parents can search for their family, select their children, and check in at the kiosk. Attendance is automatically recorded in B1 Admin.

## Related Articles

- [Adding People](../people/adding-people.md) — add more families as they visit
- [Creating Groups](../groups/creating-groups.md) — manage your children's groups
- [Attendance Setup](../attendance/setup.md) — configure campuses and services
- [Check-In](../attendance/check-in.md) — detailed check-in app setup and hardware
- [Tracking Attendance](../attendance/tracking-attendance.md) — view check-in reports

---

## guides/event-registration.md

# Set Up Event Registration



Create an event registration form, collect attendee information and optional payments, embed it on your church website, and manage submissions as they come in. By the end, you'll have a shareable registration page for any church event.



:::info
**Two ways to handle event registration:** This guide covers **forms-based registration**, which gives you full control over custom fields and payment collection. For simpler events where you just need to track who is coming, use **native event registration** built into the calendar -- see [Creating Calendars](../calendars/creating-calendars.md#enabling-event-registration) for setup instructions. Native registration lets members sign up directly from the [B1 website](../../b1-church/events/registering) and [mobile app](../../b1-mobile/events/registering) with capacity tracking, date windows, and email confirmations.
:::


#### Before You Begin

- B1 Admin account with admin access
- For collecting payments: [Stripe must be configured](../donations/online-giving-setup.md) first



## Step 1: Create a Stand Alone Form

Stand Alone forms have their own public URL that anyone can access — perfect for event registration.

Follow the [Creating Forms](../forms/creating-forms.md) guide to:

1. Navigate to Forms and click Add Form
2. Choose "Stand Alone" type — this gives your form its own public URL
3. Name it after the event (e.g., "Men's Retreat Registration", "VBS Sign-Up")

## Step 2: Add Questions

Build out the fields you need to collect from registrants.

Follow the [Creating Forms](../forms/creating-forms.md#adding-questions) guide to add your questions:

1. Go to the Questions tab and add fields for the information you need: name, email, phone, dietary restrictions, T-shirt size, emergency contact, etc.
2. Use Multiple Choice for options like meal preferences or session selections

:::warning
The Payment field type requires Stripe to be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Step 3: Configure Form Settings

Control when and how your registration form is available.

1. Set availability dates if the registration should only be open for a limited time
2. Copy the public URL — you can share this directly
3. Add form members with Admin or View Only roles to help manage submissions

## Step 4: Embed on Your Website

Make the registration form easy to find by adding it to your church website.

Follow the [Managing Pages](../website/managing-pages.md) guide to:

1. In your B1 website editor, add a new section to a page and select the Form element
2. Choose your registration form from the list

:::tip
Share the standalone URL via email, social media, and church bulletins too — the more places it's visible, the more signups you'll get.
:::

## Step 5: Manage Submissions

Track registrations as they come in and export data when you need it.

Follow the [Managing Submissions](../forms/managing-submissions.md) guide to:

1. Review responses as they come in on the Submissions tab
2. Export to CSV for spreadsheets, headcount tracking, or sharing with event coordinators

## You're Done!

Your event registration is live. Share the link, embed it on your website, and track signups from B1 Admin. When the event is over, export the final list for your records.

## Related Articles

- [Creating Forms](../forms/creating-forms.md) — build forms with different field types
- [Managing Submissions](../forms/managing-submissions.md) — review and export form responses
- [Managing Pages](../website/managing-pages.md) — embed forms on your website
- [Online Giving Setup](../donations/online-giving-setup.md) — required for payment fields

---

## guides/getting-started-b1.md

# Get Your Church Started with B1



A complete onboarding guide for new churches — from creating your account to importing your member directory and configuring your first features. Follow these steps in order to get your church up and running on B1.




#### Before You Begin

- A valid email address
- Your church logo and branding assets (colors, images) — recommended but not required to start



## Step 1: Create Your Account

Register your church and become the first administrator.

Follow the [Create Account](../../getting-started/create-account.md) guide to:

1. Go to b1.church and register with your email
2. Verify your email address
3. Choose "Create a new church" and enter your church name
4. You automatically become the Domain Admin with full access to everything

## Step 2: Configure Church Settings

Enter your church's basic information and branding.

Follow the [Church Settings](../settings/church-settings.md) guide to:

1. Enter your church name, address, phone number, and email
2. Set your subdomain (this becomes yourchurch.b1.church)
3. Upload your church logo and images

:::tip
Your subdomain appears in your website URL and giving page URL, so choose something short and recognizable (e.g., "grace" for Grace Community Church).
:::

## Step 3: Set Up Roles & Invite Your Team

Control who has access to what and bring your team on board.

Follow the [Roles & Permissions](../settings/roles-permissions.md) guide to:

1. Create roles for your team (e.g., "Pastor", "Office Admin", "Finance Team", "Worship Leader")
2. Assign specific permissions to each role so people only see what they need
3. Invite team members by adding them and assigning roles

:::info
You don't have to do everything yourself. Invite your office staff, pastors, and ministry leaders early so they can help set up their areas.
:::

## Step 4: Import Your People

Bring your existing member directory into B1.

Follow the [Importing Data](../people/importing-data.md) guide. You have two options:

1. **CSV Upload** — export from your current system or spreadsheet, format as CSV, upload to B1
2. **Breeze Migration** — one-click import that brings over people, photos, groups, donations, and attendance

:::tip
Migrating from Breeze? The import tool brings everything over in one step — people, photos, groups, donations, and attendance history. It's the fastest way to get started.
:::

## Step 5: Configure the Mobile App

Customize the B1 Mobile app experience for your congregation.

Follow the [Mobile App Settings](../settings/mobile-app.md) guide to:

1. Customize which tabs appear in the B1 Mobile app for your members
2. Set tab names, icons, and types (Bible, Live Stream, Donation, Website, etc.)
3. Control which features are visible to your congregation

## Step 6: Start Setting Up Features

Now that your foundation is in place, follow these guides to set up specific features:

- [Set Up Online Giving](./online-giving.md) — accept donations through your website and app
- [Launch Your Church Website](./launch-website.md) — build your church website
- [Run Small Groups](./small-groups.md) — organize groups, Bible studies, and ministries
- [Set Up Children's Check-In](./childrens-checkin.md) — kiosk check-in for kids ministry
- [Manage Sunday Volunteers](./sunday-volunteers.md) — coordinate your serving teams
- [Build Your Sermon Library](./sermon-library.md) — get sermons online and set up live streaming
- [Track Attendance](./track-attendance.md) — monitor who's coming to services and groups

## You're Done!

Your church is set up on B1. Your team has access, your people are imported, and you're ready to start using the features that matter most to your ministry. Explore the feature guides above to set up each area.

## Related Articles

- [Create Account](../../getting-started/create-account.md) — account registration
- [Initial Setup](../../getting-started/initial-setup.md) — guided onboarding overview
- [Church Settings](../settings/church-settings.md) — church info and branding
- [Roles & Permissions](../settings/roles-permissions.md) — team access control
- [Importing Data](../people/importing-data.md) — bulk data import
- [Mobile App Settings](../settings/mobile-app.md) — customize the member app

---

## guides/launch-website.md

# Launch Your Church Website



B1.church includes a full website builder at no extra cost. This guide walks you through creating your church website from scratch — setting up your home page, configuring your look and feel, adding key pages, and optionally connecting online giving and event registration forms.




#### Before You Begin

- Have your church logo ready (PNG with transparent background works best)
- Choose 2–3 brand colors for your site
- If using a custom domain (e.g., yourchurch.com), have access to your DNS provider (GoDaddy, Cloudflare, etc.)
- If you want online giving on your site, complete [Online Giving Setup](../donations/online-giving-setup.md) (Stripe) first



## Step 1: Initial Website Setup

Start by creating your home page and basic site structure.

Follow the [Website Initial Setup](../website/initial-setup.md) guide to:

1. Navigate to **Website** in B1 Admin
2. Create your home page with a hero section, welcome message, and key information
3. Add your church name and tagline

## Step 2: Configure Appearance

Set your site's visual identity — colors, fonts, logo, and footer.

Follow the [Appearance](../website/appearance.md) guide to:

1. Upload your church logo
2. Set your primary and accent colors
3. Configure the navigation bar and footer
4. Preview your changes

:::tip
Keep your color palette simple — a primary color plus one accent color is usually enough. The website builder will handle the rest.
:::

## Step 3: Add Content Pages

Build out the pages your visitors need most.

Follow the [Managing Pages](../website/managing-pages.md) guide to create pages like:

- **About** — Your church's story, beliefs, and leadership
- **Sermons** — Link to your [sermon library](../sermons/managing-sermons.md)
- **Events** — Upcoming events and registration
- **Give** — Online giving page (requires [Stripe setup](../donations/online-giving-setup.md))
- **Contact** — Location, service times, and contact info

## Step 4: Connect Your Domain

If you want to use your own domain name (like yourchurch.com) instead of the default B1 URL:

1. Go to **Website > Settings** in B1 Admin
2. Enter your custom domain
3. Update your DNS records at your domain provider to point to B1

:::info
DNS changes can take up to 48 hours to propagate. Your site may not be accessible from your custom domain immediately. The default B1 URL will continue to work during this time.
:::

## Step 5: Add Giving and Forms

Enhance your site with interactive elements:

- **Online Giving** — Add a giving section so members can donate directly from your website. See [Online Giving Setup](../donations/online-giving-setup.md) to configure Stripe first.
- **Registration Forms** — Embed [Stand Alone forms](../forms/creating-forms.md) for event signups, visitor cards, or volunteer applications. See [Managing Pages](../website/managing-pages.md) for how to add a form element to any page.

## You're Done!

Your church website is live. Share the URL with your congregation and on social media. You can update content, add new pages, and adjust the appearance at any time from the B1 Admin dashboard.

## Related Articles

- [Website Initial Setup](../website/initial-setup.md) — detailed setup walkthrough
- [Managing Pages](../website/managing-pages.md) — add and edit pages
- [Appearance](../website/appearance.md) — colors, logo, and layout
- [Managing Files](../website/files.md) — upload images and documents
- [Online Giving Setup](../donations/online-giving-setup.md) — configure Stripe
- [Creating Forms](../forms/creating-forms.md) — build registration and survey forms

---

## guides/online-giving.md

# Set Up Online Giving



Walk through everything needed to accept online donations at your church — from creating donation funds, to connecting Stripe for payment processing, to sharing the giving page with your congregation. By the end, members will be able to give online through your website and mobile app.




#### Before You Begin

- B1 Admin account with admin access — see [Roles & Permissions](../people/roles-permissions.md)
- A Stripe account (create one free at [stripe.com](https://stripe.com) if needed)



## Step 1: Create Donation Funds

Funds are the categories donors can give to. You need at least one fund before you can accept donations.

Follow the [Funds](../donations/funds.md) guide to set up your giving categories:

1. Create your most common funds (e.g., "General Fund", "Building Fund", "Missions")
2. Mark tax-deductible funds appropriately — this affects year-end giving statements

:::tip
You can add more funds at any time. Start with your most common giving categories.
:::

## Step 2: Connect Stripe

Stripe handles all payment processing. You'll connect your Stripe account to B1 Admin so donations flow into your bank account.

Follow the [Online Giving Setup](../donations/online-giving-setup.md) guide to connect Stripe:

1. Log in to your Stripe dashboard and retrieve your Publishable Key and Secret Key
2. In B1 Admin, go to Settings and enter both keys

:::warning
Stripe shows your Secret Key only once. Copy and save it before leaving the Stripe dashboard. If you lose it, you'll need to generate a new one.
:::

## Step 3: Add a Giving Page to Your Website

Make giving accessible by adding a donation page to your B1 website.

Follow the [Online Giving Setup](../donations/online-giving-setup.md) and [Managing Pages](../website/managing-pages.md) guides to:

1. Add a "Donate" tab to your B1.church site
2. Your giving URL will be: `https://yoursubdomain.b1.church/donate`
3. Members can give without logging in (public page) or log in for saved payment methods and donation history

## Step 4: Make a Test Donation

Before announcing to your congregation, verify everything works.

1. Make a small test donation to verify the flow works end-to-end
2. Check that the donation appears in B1 Admin under Donations

:::tip
Use Stripe's test mode first if you want to verify without real charges, then switch to live mode before announcing to your congregation.
:::

## Step 5: Announce to Your Congregation

Spread the word so members know they can give online.

1. Share the giving URL via your website, email newsletters, bulletins, and social media
2. Members can also give through the [B1 Mobile app](../../b1-mobile/giving/) — the giving feature is built in

:::info
Members who log in can save payment methods, set up recurring donations, and view their giving history. Anonymous giving works too — no login required.
:::

## Step 6: Ongoing Management

Keep your donation records current and generate reports throughout the year.

1. [Import Stripe transactions](../donations/stripe-import.md) regularly (weekly or monthly) to keep your records current
2. [View donation reports](../donations/donation-reports.md) to track giving trends and totals by fund
3. [Generate year-end giving statements](../donations/giving-statements.md) for your donors' tax records

:::tip
Run Stripe imports at least monthly so your records stay up to date. See the [Year-End Reports Guide](./year-end-reports.md) for the full year-end process.
:::

## You're Done!

Your church is now accepting online donations. Members can give through your website, the B1 Mobile app, or any device with a web browser. All donations are automatically tracked in B1 Admin.

## Related Articles

- [Funds](../donations/funds.md) — create and manage donation categories
- [Batches](../donations/batches.md) — organize donations into groups
- [Recording Donations](../donations/recording-donations.md) — manually enter cash and check donations
- [Stripe Import](../donations/stripe-import.md) — pull online transactions into B1 Admin
- [Donation Reports](../donations/donation-reports.md) — view giving trends and totals
- [Giving Statements](../donations/giving-statements.md) — generate year-end tax statements
- [Making Donations (Web)](../../b1-church/giving/making-donations.md) — the member giving experience
- [Making Donations (Mobile)](../../b1-mobile/giving/making-donations.md) — giving from the mobile app

---

## guides/sermon-library.md

# Build Your Sermon Library & Live Stream



Get your sermon archive online and set up live streaming — from importing your existing YouTube or Vimeo library to scheduling recurring live services with interactive chat. By the end, your congregation can watch past sermons and join live services on your website and mobile app.




#### Before You Begin

- B1 Admin account with content management permission
- YouTube or Vimeo channel with sermon videos (for importing your archive)
- YouTube Channel ID (for live streaming — find it in your YouTube Studio settings)



## Step 1: Create Sermon Playlists

Playlists organize your sermons into series and collections for easy browsing.

Follow the [Playlists](../sermons/playlists.md) guide to:

1. Create series/collections like "2024 Sunday Messages", "Marriage Series", "Christmas Services"
2. Add a name, description, publish date, and thumbnail for each playlist

:::tip
Create playlists before adding sermons. This makes it easier to organize sermons into the right series as you add them.
:::

## Step 2: Import Your Existing Sermons

If you already have sermon videos on YouTube or Vimeo, you can pull them all in at once.

Follow the [Bulk Import](../sermons/bulk-import.md) guide to:

1. Enter your YouTube or Vimeo channel URL
2. Preview the import to see which videos will be pulled in
3. Click Import to add them all at once

## Step 3: Add Individual Sermons

For one-off additions or sermons not part of a bulk import, add them individually.

Follow the [Managing Sermons](../sermons/managing-sermons.md) guide to:

1. Paste a video URL (YouTube, Vimeo, or Facebook)
2. Title, description, thumbnail, and duration auto-fill from the video metadata
3. Assign the sermon to a playlist

## Step 4: Set Up Live Streaming

Connect your YouTube channel so your B1 site automatically picks up your live stream.

Follow the [Live Streaming](../sermons/live-streaming.md) guide to:

1. Enter your YouTube Channel ID in the streaming settings
2. Configure your recurring service schedule (e.g., Sundays at 10:00 AM)
3. Customize the streaming page tabs: Chat, Prayer requests, and custom links

:::info
When you go live on YouTube, the B1 streaming page automatically picks up the stream. No extra steps needed on Sunday morning.
:::

## Step 5: Display on Your Website

Make your sermon library and live stream easily accessible to visitors.

Follow the [Managing Pages](../website/managing-pages.md) guide to:

1. Add a Sermons section to your B1 website so visitors can browse your library
2. Add a Live Stream section for the live viewing experience

## Step 6: Mobile Access

Members can access sermons and live services from any device.

1. Members can watch sermons in the [B1 Mobile app](../../b1-mobile/content/sermons.md) and on [B1.church](../../b1-church/content/sermons.md)
2. Live streaming with chat and prayer requests works on both platforms

:::info
The live chat and prayer request features let your online congregation participate in real time, just like being in the room.
:::

## You're Done!

Your sermon library is online and your live stream is configured. Members can catch up on past sermons anytime and join live services from anywhere. New sermon uploads can sync automatically.

## Related Articles

- [Playlists](../sermons/playlists.md) — organize sermons into series
- [Bulk Import](../sermons/bulk-import.md) — import from YouTube or Vimeo
- [Managing Sermons](../sermons/managing-sermons.md) — add and edit individual sermons
- [Live Streaming](../sermons/live-streaming.md) — configure live services
- [Sermons (Web)](../../b1-church/content/sermons.md) — member sermon viewing experience
- [Live Streaming (Web)](../../b1-church/content/live-streaming.md) — member live stream experience
- [Sermons (Mobile)](../../b1-mobile/content/sermons.md) — sermons on the mobile app

---

## guides/small-groups.md

# Run Small Groups



Set up small groups, Bible studies, or ministry teams with member management, group calendars, and conversations. Publish a church-wide event calendar on your website so visitors can see what's happening and members can stay connected through the web portal and mobile app.




#### Before You Begin

- B1 Admin account with admin access
- [People added to your directory](../people/adding-people.md) (group members need to exist first)



## Step 1: Create Group Categories & Groups

Organize your groups into categories so members can easily find what they're looking for.

Follow the [Creating Groups](../groups/creating-groups.md) guide to:

1. Create categories to organize your groups (e.g., "Small Groups", "Bible Studies", "Ministry Teams", "Committees")
2. Create groups within each category (e.g., "Tuesday Night Men's Group", "Women's Bible Study", "Youth Ministry")
3. Add a description and meeting time for each group

## Step 2: Add Members & Leaders

Populate your groups with members and designate leaders who can manage their own teams.

Follow the [Group Members](../groups/group-members.md) guide to:

1. Search for people and add them to the appropriate groups
2. Designate group leaders using the green key icon — leaders get extra permissions

:::tip
Group leaders can manage their own group calendar, post conversations, and coordinate events without needing full admin access.
:::

## Step 3: Set Up Group Calendars

Give each group its own calendar for meetings and events.

Follow the [Group Calendar](../groups/group-calendar.md) guide to:

1. Add recurring meetings (e.g., "Every Tuesday at 7 PM") and one-time events (e.g., "Group Cookout - March 15")
2. Group leaders can add and manage events for their own group

## Step 4: Create a Church-Wide Calendar

Aggregate events from all your groups into one unified calendar for the whole church.

Follow the [Creating Calendars](../calendars/creating-calendars.md) and [Curated Calendar](../calendars/curated-calendar.md) guides to:

1. Create a curated calendar that pulls events from multiple groups into one unified view
2. Share the ICS subscription link so members can add events to their personal calendar apps (Google Calendar, Apple Calendar, Outlook)

:::info
A curated calendar automatically aggregates events from the groups you connect. When a group leader adds an event, it shows up on the church calendar too.
:::

## Step 5: Publish to Your Website

Make your groups and calendar visible to visitors and members on your B1 website.

Follow the [Managing Pages](../website/managing-pages.md) guide to:

1. Add a Calendar section to your B1 website to display the curated calendar
2. Add a Groups section so visitors can browse available groups and learn how to join

## Step 6: Member Experience

Members can discover, join, and participate in groups from their phone or computer.

1. Members browse and join groups on [B1.church](../../b1-church/groups/browsing-groups.md)
2. Group members can view details, calendars, and post in [conversations](../../b1-church/groups/conversations.md)
3. All group features are also available on the [B1 Mobile app](../../b1-mobile/groups/)

:::info
Members see their groups, upcoming events, and group conversations on both web and mobile — everything stays in sync.
:::

## You're Done!

Your small groups are set up and connected. Members can discover groups, view events, and stay connected through conversations — all on your website and mobile app. Group leaders can manage their own teams independently.

## Related Articles

- [Creating Groups](../groups/creating-groups.md) — set up categories and groups
- [Group Members](../groups/group-members.md) — add members and designate leaders
- [Group Calendar](../groups/group-calendar.md) — manage group events
- [Creating Calendars](../calendars/creating-calendars.md) — set up ministry calendars
- [Curated Calendar](../calendars/curated-calendar.md) — build a unified church calendar
- [Browsing Groups (Web)](../../b1-church/groups/browsing-groups.md) — how members find groups
- [Group Conversations (Web)](../../b1-church/groups/conversations.md) — group discussions
- [Groups (Mobile)](../../b1-mobile/groups/) — groups on the mobile app

---

## guides/sunday-volunteers.md

# Manage Sunday Volunteers



Set up your volunteer teams, create weekly service plans, assign positions, build service orders with worship songs, and automate recurring tasks. By the end, your volunteers will see their assignments on the B1 website and mobile app, and can accept or decline directly.




#### Before You Begin

- B1 Admin account with admin access
- Volunteers [added to your people directory](../people/adding-people.md)



## Step 1: Create Volunteer Teams

Organize your volunteers into teams so you can manage assignments by ministry area.

Follow the [Creating Groups](../groups/creating-groups.md) and [Group Members](../groups/group-members.md) guides to:

1. Create a category (e.g., "Sunday Morning Teams")
2. Create groups like "Worship Team", "Sound & Media", "Greeters", "Kids Ministry Volunteers"
3. Add volunteers to each group by searching for their name and clicking Add

:::tip
Designate team leaders using the green key icon on the Members tab. Leaders can manage their own group calendar and coordinate their team.
:::

## Step 2: Build Your Song Library

Add worship songs so you can pull them into service plans each week.

Follow the [Songs](../serving/songs.md) guide to:

1. Add worship songs with titles, artists, and duration
2. For each song, add arrangements with lyrics and key designations
3. Add external links to YouTube performances, chord charts, or sheet music

:::info
Songs added here can be pulled into any service plan later. Build your library once, reuse it every week.
:::

## Step 3: Create a Service Plan

Plans are the weekly assignments that tell volunteers where they're needed.

Follow the [Plans](../serving/plans.md) guide to:

1. Navigate to Serving, select your ministry tab
2. Click "Add Plan" and pick the service date
3. On the Assignments tab, expand each team and assign volunteers to their positions
4. Volunteers will see their assignment status (Requested, Confirmed, Pending)

## Step 4: Build the Service Order

Lay out the flow of your service from start to finish.

Follow the [Service Order](../serving/service-order.md) guide to:

1. Switch to the "Service Order" tab in your plan
2. Click "Add Item" to add elements: worship songs (from your library), prayers, scripture readings, announcements, sermon, offering, closing
3. Drag and drop items to reorder the service flow

:::info
Service orders are plan-specific. Changes here don't affect other plans or the master song library.
:::

## Step 5: Set Up Recurring Tasks

Automate weekly responsibilities so nothing falls through the cracks.

Follow the [Tasks](../serving/tasks.md) and [Automations](../serving/automations.md) guides to:

1. Create automations for weekly recurring responsibilities (e.g., "Prepare communion elements", "Print bulletins", "Set up sound equipment")
2. Assign each automation to the responsible person or group
3. Tasks appear on their B1 dashboard and mobile app automatically

:::tip
Set automations to Inactive during holiday breaks or special seasons, then reactivate when you're ready. No need to delete and recreate.
:::

## Step 6: Enable Self-Service Signup (Optional)

Let volunteers sign up for positions themselves instead of waiting for admin assignments.

1. When editing a plan, set a **Signup Deadline** (hours before service) to control when self-signup closes. Leave blank for no deadline.
2. Optionally toggle **Show volunteer names on signup page** to let volunteers see who else is signed up.
3. For each position, check the **Allow Self-Signup** checkbox to make it available for self-service.
4. Add a **Description** to each position so volunteers know what the role involves.

Once self-signup positions are created, they automatically appear on the volunteer signup pages on [B1.church](../../b1-church/serving/volunteer-signup) and the [B1 Mobile app](../../b1-mobile/serving/volunteer-signup). Members can browse open positions, see how many spots remain, and sign up with one click.

:::tip
Mix admin-assigned and self-signup positions in the same plan. For example, assign your worship leader directly but let greeters and coffee servers self-select.
:::

## Step 7: Let Volunteers Know

Assigned volunteers automatically see their plans and can respond.

1. Volunteers see their plans on [B1.church](../../b1-church/plans/viewing-plans.md) and the [B1 Mobile app](../../b1-mobile/serving/viewing-plans.md)
2. They can accept or decline assignments directly from either platform
3. They can set blockout dates for weeks they're unavailable
4. Plans can be printed for rehearsals or posted backstage
5. Volunteers can browse and sign up for open positions via the [volunteer signup page](../../b1-church/serving/volunteer-signup)

:::tip
Push notifications on the mobile app alert volunteers when they receive new assignments or when plans change.
:::

## You're Done!

Your volunteer management system is set up. Each week, create a new plan, assign positions, and your team sees everything on their phone or computer. Recurring tasks handle the routine prep work automatically.

## Related Articles

- [Creating Groups](../groups/creating-groups.md) — set up teams and categories
- [Group Members](../groups/group-members.md) — add and manage team members
- [Plans](../serving/plans.md) — create and manage service plans
- [Service Order](../serving/service-order.md) — build the flow of a service
- [Songs](../serving/songs.md) — manage your worship song library
- [Tasks](../serving/tasks.md) — assign action items to people or groups
- [Automations](../serving/automations.md) — automate recurring tasks
- [Viewing Plans (Web)](../../b1-church/plans/viewing-plans.md) — how volunteers see plans online
- [Viewing Plans (Mobile)](../../b1-mobile/serving/viewing-plans.md) — how volunteers see plans on mobile
- [Volunteer Signup (Web)](../../b1-church/serving/volunteer-signup) — how members self-select volunteer positions
- [Volunteer Signup (Mobile)](../../b1-mobile/serving/volunteer-signup) — volunteer self-signup on mobile

---

## guides/track-attendance.md

# Track Church Attendance



Set up attendance tracking for your services and groups — from configuring campuses and service times, to recording attendance manually or via the self-service check-in app, to viewing trends in reports. By the end, you'll have a complete picture of who's attending and when.




#### Before You Begin

- B1 Admin account with admin access
- [People added to your directory](../people/adding-people.md)
- [Groups created](../groups/creating-groups.md) for the ministries you want to track



## Step 1: Configure Campuses & Services

Define where and when your church meets.

Follow the [Attendance Setup](../attendance/setup.md) guide to:

1. Add your campus (e.g., "Main Campus")
2. Add service times (e.g., "Sunday 9:00 AM", "Sunday 11:00 AM", "Wednesday 7:00 PM")
3. Assign groups to each service time to define what classes/ministries meet during that service

## Step 2: Enable Group Attendance Tracking

Turn on attendance tracking for the groups you want to monitor.

Follow the [Creating Groups](../groups/creating-groups.md) guide to:

1. Edit each group you want to track and turn on "Track Attendance"
2. Associate groups with service times so attendance is recorded against the right service

:::info
Not every group needs attendance tracking. Enable it for groups where you want to monitor participation — children's classes, small groups, Sunday school, etc.
:::

## Step 3: Record Attendance Manually

Check off who attended each service and group.

Follow the [Tracking Attendance](../attendance/tracking-attendance.md) guide to:

1. Navigate to Attendance, select the date and service
2. Check off who attended each group

:::tip
Manual tracking works great for adult services, small groups, and any situation where a check-in kiosk isn't practical.
:::

## Step 4: Set Up Self Check-In (Optional)

Let members check themselves in using a tablet kiosk.

Follow the [Check-In](../attendance/check-in.md) guide to:

1. Install the B1 Checkin app on a tablet for self-service check-in
2. Members search for their name and check in themselves and their family
3. Check-in attendance records appear alongside manually entered records — no difference in the data

:::info
For a complete children's ministry setup including hardware and printer configuration, see the [Children's Check-In Guide](./childrens-checkin.md).
:::

## Step 5: View Attendance Reports

See the big picture of participation across your church.

Follow the [Attendance Reports](../reports/attendance-reports.md) guide. Three report views are available:

1. **Attendance Trend** — see attendance over time to spot growth or decline
2. **Group Attendance** — compare totals across groups
3. **Daily Group Attendance** — day-by-day breakdown for detailed analysis

:::info
Reports combine both manually recorded and self-check-in attendance. There's no difference in how the data appears — both methods feed into the same reports.
:::

## You're Done!

Your attendance tracking is set up. Whether you record attendance manually, use the check-in app, or both — all the data flows into the same reports so you have a clear picture of participation across your church.

## Related Articles

- [Attendance Setup](../attendance/setup.md) — configure campuses and services
- [Tracking Attendance](../attendance/tracking-attendance.md) — record attendance manually
- [Check-In](../attendance/check-in.md) — self-service check-in app
- [Creating Groups](../groups/creating-groups.md) — set up groups with attendance tracking
- [Attendance Reports](../reports/attendance-reports.md) — view attendance trends
- [Children's Check-In Guide](./childrens-checkin.md) — full kids ministry check-in setup

---

## guides/year-end-reports.md

# Generate Year-End Giving Reports



Walk through the year-end process of finalizing your donation records, verifying fund settings, and generating tax-deductible giving statements for every donor. This is typically done in early January for the previous calendar year.




#### Before You Begin

- B1 Admin account with financial access
- Donations recorded throughout the year (online via Stripe and/or manually entered)
- Access to your Stripe account if you accept online donations



## Step 1: Import Final Stripe Transactions

Make sure all online donations from the end of the year are in your system.

Follow the [Stripe Import](../donations/stripe-import.md) guide to:

1. Navigate to Donations > Batches > Stripe Import
2. Select a date range covering the end of the year (e.g., December 1 - December 31)
3. Click Preview first to review, then Import Missing to finalize

:::warning
Run this import before generating statements. Any transactions you haven't imported won't appear on donor statements.
:::

## Step 2: Review Donation Reports

Verify your records are accurate before generating statements.

Follow the [Donation Reports](../donations/donation-reports.md) guide to:

1. Check the donation summary page for the full year
2. Review totals by fund and compare against your bank statements to catch any discrepancies
3. Click into individual batches to verify donor-level details if needed

## Step 3: Verify Fund Tax Status

Ensure each fund's tax-deductible setting is correct so statements are accurate.

Follow the [Funds](../donations/funds.md) guide to:

1. Open each fund and confirm the tax-deductible setting is correct

:::info
Only donations to funds marked as tax-deductible will appear on giving statements. If a fund should be tax-deductible but isn't marked that way, update it before generating statements.
:::

## Step 4: Generate Giving Statements

Create the official giving statements for your donors.

Follow the [Giving Statements](../donations/giving-statements.md) guide to:

1. Navigate to Donations > Statements
2. Select the year from the dropdown and review the summary statistics
3. Choose your download method:
   - **Download ZIP** — individual CSV files, one per donor
   - **Print All** — printable view with each statement on a new page

:::tip
Generate statements early in January while records are fresh. This gives you time to catch any issues before mailing them out.
:::

## Step 5: Distribute to Donors

Get the statements into your donors' hands.

1. Print and mail statements, or email individual CSVs to donors
2. Members can also view their own giving history and print statements from [B1.church](../../b1-church/giving/donation-history.md) and the [B1 Mobile app](../../b1-mobile/giving/donation-history.md)

## You're Done!

Your year-end giving reports are complete. Donors have their tax-deductible statements, and your financial records are finalized for the year.

## Related Articles

- [Stripe Import](../donations/stripe-import.md) — import online transactions
- [Donation Reports](../donations/donation-reports.md) — view giving trends and totals
- [Funds](../donations/funds.md) — manage funds and tax-deductible settings
- [Giving Statements](../donations/giving-statements.md) — generate year-end statements
- [Recording Donations](../donations/recording-donations.md) — manually enter cash/check donations
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — member self-service view
- [Set Up Online Giving Guide](./online-giving.md) — initial Stripe and giving setup

---

## index.md

# B1 Admin Overview



B1 Admin is your church management dashboard. It provides tools to manage every aspect of your church's operations -- from member directories and donations to website building and live streaming -- all from one place.



## Getting Started

1. Open your browser and go to [admin.b1.church](https://admin.b1.church)
2. Sign in with your username and password
3. You'll land on the **Dashboard**, which provides an overview of your church data along with **Quick Actions** for common tasks like adding people, creating groups, recording donations, and more

:::tip
New to B1 Admin? Start with the [Introduction](./introduction) for a video walkthrough, then visit [Settings](./settings/) to configure your church information and invite your team.
:::

## Key Features

- **[People](./people/)** - Manage your church directory, add members, bulk edit data, track households
- **[Groups](./groups/)** - Create and organize church groups with join requests and member management
- **[Attendance](./attendance/)** - Set up campuses, service times, and track attendance
- **[Donations](./donations/)** - Record giving in multiple currencies, manage funds, generate statements
- **[Serving](./serving/)** - Coordinate volunteers, create service plans, manage tasks
- **[Forms](./forms/)** - Build custom forms for registrations and data collection
- **[Reports](./reports/)** - View birthday, attendance, and donation reports
- **[Website](./website/)** - Build and manage your church website with custom navigation styles
- **[Sermons](./sermons/)** - Manage your sermon library and live streaming
- **[Calendars](./calendars/)** - Create curated calendars by connecting group events
- **[Settings](./settings/)** - Configure church info, roles, and permissions

:::info
Click the question mark icon in the top-right corner of any page for quick access to help and documentation.
:::

For support, email [support@churchapps.org](mailto:support@churchapps.org).

---

## integrations/chatgpt.md

# ChatGPT



Connect OpenAI's ChatGPT to your church's B1 data so you can ask questions like "who hasn't been in a group this quarter?" or "summarize giving for the building fund this month" and have ChatGPT pull the answers directly from B1. Two paths are supported: a **Custom GPT** that works on any ChatGPT Plus plan, and the **MCP server** for developer tooling that supports it.




#### Before You Begin

- A church admin with the **Edit Settings** permission (to mint an API key)
- A **ChatGPT Plus, Pro, Team, or Enterprise** account (the free tier cannot use Custom GPTs or Connectors)
- The full URL of your B1 API — usually `https://api.churchapps.org` for hosted churches, or your self-hosted Api host



## Pick the Right Path

| Path | Plan needed | Effort | What you get |
|---|---|---|---|
| **Custom GPT with Actions** | ChatGPT Plus / Team / Enterprise | 10 minutes | A shareable GPT that calls B1's REST API for any teammate to use |
| **MCP via OpenAI tooling** | Developer / Agent SDK / Pro Connectors | More | Full discovery via the MCP server, suited to coding tools and agent platforms |

For most churches the **Custom GPT** path is the right answer — it requires no developer setup, works inside the regular ChatGPT app and mobile clients, and can be shared with your team. The MCP path is documented below for technical staff using OpenAI's developer tools or agent platforms.

## Path A — Custom GPT with Actions

This wires ChatGPT directly to the B1 REST API. Your Custom GPT will be able to read and (optionally) write B1 records on behalf of whoever uses it.

### 1. Create an API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it `ChatGPT`, and pick scopes. Common starter sets:
   - **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Read + write:** add the matching `:write` scopes
3. Save and copy the full `cak_…` key.

See [API Keys](/docs/developer/api/api-keys) for the full scope list.

### 2. Build the Custom GPT

1. In ChatGPT, click your profile → **My GPTs** → **Create a GPT**.
2. Switch to the **Configure** tab and give the GPT a name (e.g. "B1 Assistant") and instructions like:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll to **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** `cak_.`
   - **Auth Type:** Bearer
   - Save.
4. In the **Schema** box, paste a minimal OpenAPI spec describing the endpoints you want the GPT to use. A starter that covers the most common reads:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

   Expand the schema with more endpoints as needed — every authenticated route in B1 accepts the same `cak_…` key. The [REST API reference](/docs/developer/api/endpoints) lists what's available.

5. Save the action. Test it with a prompt like *"how many people are in the church?"* — ChatGPT will call `listPeople` and answer.
6. **Publish** the GPT (Only me / Anyone with link / Organization) and share with your team.

### 3. Use it

Anyone you share the GPT with can ask natural-language questions — ChatGPT picks the right action, calls B1, and answers. The key's scopes still apply: a read-only key will refuse writes regardless of the action defined in the schema.

## Path B — MCP via OpenAI tooling

The B1 API includes an MCP server at `/mcp` that any MCP-aware OpenAI tool can use — for example the [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), the Responses API's MCP tool, or third-party agent platforms that consume MCP servers.

Authenticate with the same `cak_…` key in the `Authorization: Bearer` header. Three tools are exposed: `list_endpoints`, `describe_endpoint`, and `api_call`. See the [MCP Server developer reference](/docs/developer/api/mcp) for the protocol, transport, and tool schemas.

ChatGPT's built-in "Connectors" (Pro/Business/Enterprise) currently expect MCP servers with specific `search` and `fetch` tool shapes and OAuth-based authentication, which the B1 MCP server does not advertise. For ChatGPT inside the consumer app, the Custom GPT path above is the practical choice.

## Safety and Limits

- **Per-church isolation.** The API key resolves to one church. ChatGPT cannot see other churches' data.
- **Permission-scoped.** If you remove a permission from the person who minted the key, ChatGPT loses it on the next call — instantly.
- **Revocable.** Delete the key in **Settings → Developer → API Keys** and ChatGPT's access ends immediately.
- **Sharing a Custom GPT shares the data.** Anyone with access to the GPT can ask it questions and see whatever the key has scopes for. Limit sharing to staff who should see that data, and prefer narrower scopes (e.g. omit `donations:read` for a GPT shared widely).
- **Audit trail.** Mutations go through the same audit log as B1Admin actions; review them under **Reports → Audit Log**.

## Cost

ChurchApps is free and open-source — the API your Custom GPT calls is part of the API your church already runs. OpenAI charges for ChatGPT usage per their plans. There is no per-call cost from ChurchApps.

## Troubleshooting

**Action returns 401:** the bearer header isn't set correctly. In the action's authentication panel make sure **Auth Type: Bearer** is selected and the key value does not include the word `Bearer` (ChatGPT prepends it for you).

**Action returns 403:** the key doesn't have the scope for that endpoint. Mint a new key with the right scopes and update the GPT.

**ChatGPT calls the wrong action:** tighten the `summary` and `description` fields in your OpenAPI schema so the model picks the right one. Adding example queries to the GPT's instructions also helps.

**The action panel rejects the schema:** ChatGPT requires OpenAPI 3.1 with at least one `paths` entry and a `servers` URL. Validate the YAML in any online OpenAPI validator before pasting.

**Local development:** point the action's `servers` URL at your local Api (e.g. `http://localhost:8084`) — but note ChatGPT's actions only call public URLs, so for local testing use a tunnel like `ngrok` or hit the API directly with `curl` to confirm the key first.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [Claude](./claude) — same idea, for Anthropic's models
- [REST API reference](/docs/developer/api/endpoints) — every endpoint a Custom GPT action can hit

---

## integrations/claude.md

# Claude



Connect Anthropic's Claude to your church's B1 data. With an API key and a few minutes of setup, you can ask Claude questions like "how many first-time visitors came on Sunday?" or "draft a thank-you email to the people who gave to the building fund this month" — and Claude will read the answers directly from your church's records, scoped to your permissions.




#### Before You Begin

- A church admin with the **Edit Settings** permission (to mint an API key)
- One of: **Claude Code** (CLI / IDE extension), **Claude Desktop** (Mac/Windows), or a **Claude Pro/Max/Team** account
- The full URL of your B1 API — usually `https://api.churchapps.org` for hosted churches, or your self-hosted Api host



## What Claude Can See

Claude talks to B1 through the **Model Context Protocol (MCP) server** built into the B1 API. Every call Claude makes runs through the same auth, permission, and church-scoping rules as a request from B1Admin — meaning Claude:

- Only ever sees data for **your** church
- Is limited to whatever **permissions and scopes** the API key you give it carries
- Cannot reach webhooks, OAuth admin endpoints, or other operator-only paths (those are blocklisted)

A `donations:read` key lets Claude summarize giving but cannot record a gift. A `people:write` key can add a person but cannot see donations. Pick the scopes that match the work.

## Setup

### 1. Create an API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it `Claude`, and select the scopes Claude should have. Common starter sets:
   - **Read-only assistant:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Read + add notes / tasks:** add `people:write`
   - **Full operational assistant:** add the matching `:write` scopes you want
3. Save. The full `cak_…` key is shown **once** — copy it.

See [API Keys](/docs/developer/api/api-keys) for what each scope allows.

### 2. Connect Claude

Pick the Claude client you use:

#### Claude Code (CLI)

In a terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_."
```

That's it. Inside any Claude Code session, type `/mcp` to confirm the `b1` server is connected, then ask Claude any question about your church.

#### Claude Desktop

Edit Claude Desktop's config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add a `b1` server entry. Newer versions of Claude Desktop speak HTTP MCP natively:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_."
      }
    }
  }
}
```

If your Claude Desktop version only supports stdio servers, bridge through `mcp-remote`:

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_."
      ]
    }
  }
}
```

Restart Claude Desktop. The connector icon in the chat composer will show `b1` with three tools (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Custom Connector

Claude.ai's "Add custom connector" feature requires OAuth, which the B1 MCP server does not support today. Use Claude Code or Claude Desktop instead.

### 3. Ask Claude something

Once connected, no special syntax is needed — Claude discovers what's available on the fly. Examples:

- *"How many people are in my church and what are the active groups?"*
- *"Summarize this month's donations by fund."*
- *"List the people who attended the 10am service last Sunday but haven't been to a Wednesday group in the last 60 days."*
- *"Draft a welcome email for the four people added this week, addressed by first name."*

Behind the scenes Claude will call the MCP tools — first to discover the right endpoint, then to fetch the data — and answer in plain language.

## How It Works

The B1 API exposes a single MCP endpoint at `/mcp`. Claude connects to it, authenticates with your `cak_…` key, and gets access to three tools:

| Tool | What it does |
|---|---|
| `list_endpoints` | Lists the REST endpoints Claude can call, filterable by path. Used for discovery. |
| `describe_endpoint` | Returns a short summary and an example request/response for a specific endpoint. |
| `api_call` | Actually invokes a REST endpoint as the authenticated user. |

This is the same `/membership/people`, `/giving/donations`, `/attendance/visits` etc. surface your B1Admin uses — every authorization rule applies identically.

## Safety and Limits

- **Per-church isolation.** The API key resolves to one church. Claude has no way to see other churches' data.
- **Permission-scoped.** If you remove a permission from the person who minted the key in B1Admin, Claude loses it on the next call — instantly.
- **Revocable.** Delete the key in **Settings → Developer → API Keys** and Claude's access ends immediately.
- **Blocklist.** Provider webhooks, OAuth client admin endpoints, and the operator-only `apiEmails` route are not callable via MCP.
- **Response size cap.** A single tool response is capped at 64 KB so long lists don't blow out Claude's context — Claude will narrow the query with filters when this happens.
- **Audit trail.** Mutations go through the same audit log as B1Admin actions; you can review them under **Reports → Audit Log**.

## Cost

ChurchApps is free and open-source — the MCP server is part of the API your church already runs. Anthropic charges for Claude usage per their plans. There is no per-call cost from ChurchApps.

## Troubleshooting

**Claude reports "Unauthorized" or 401:** the bearer token is missing, malformed, or the key has been revoked. Re-check the `Authorization: Bearer cak_…` header (note the space and the literal `Bearer`).

**A tool call returns 403:** the API key doesn't have the scope for that endpoint. Add the scope in **Settings → Developer → API Keys** (you'll need to create a new key — scopes can't be changed in place) and update Claude's config.

**Claude can't find an endpoint:** ask it to call `list_endpoints` with a filter, e.g. *"use list_endpoints with filter 'donations' to find the right path"*. The route inventory is generated from the live API, so anything you can hit with `curl` is there.

**Local development:** swap `https://api.churchapps.org/mcp` for `http://localhost:8084/mcp` — same auth, same tools.

## Related

- [API Keys](/docs/developer/api/api-keys) — full scope reference
- [MCP Server (developer reference)](/docs/developer/api/mcp) — protocol details and tool schemas
- [ChatGPT](./chatgpt) — same idea, for OpenAI's models

---

## integrations/google-sheets.md

# Google Sheets



**B1 Export** is the official Google Sheets add-on for B1.church. It adds a sidebar to any spreadsheet that exports People, Donations, Groups, or Attendance from your B1 church into named tabs — on demand, with one click. The add-on runs entirely inside the user's Google account; nothing about it touches ChurchApps' servers beyond the read-only API calls each export makes.




#### Before You Begin

- A Google account with edit access to the spreadsheet you want to export into
- A church admin (or someone with read access to the data you want to export) able to mint a B1 API key
- The B1 Export add-on installed from the Google Workspace Marketplace



## What It Exports

| Menu item | Sheet tab | Data |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Each export **replaces** the contents of its named tab — re-running an export gives you a fresh snapshot, not appended rows. Other tabs in the spreadsheet are untouched.

## Setup

### 1. Create a B1 API key with the right scopes

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it "Sheets Export", and grant the **read** scopes for whatever you plan to export:
   - `people:read` for the People export
   - `donations:read` for Donations
   - `groups:read` for Groups
   - `attendance:read` for Attendance
3. A key that only does exports does **not** need `settings:write` — that scope is only for connectors that register webhooks (Zapier / Make). Keep this key narrow.
4. Save and copy the `cak_…` key.

### 2. Install the add-on

1. Open the spreadsheet you want to export into.
2. **Extensions → Add-ons → Get add-ons**.
3. Search for **B1 Export** and install it. Google asks you to grant access to your sheets and to external HTTP (so the add-on can call the B1 API).

After installation, a **B1 Export** entry appears under the **Extensions** menu of every spreadsheet you open with this Google account.

### 3. Connect the key

1. **Extensions → B1 Export → Connect…** (or **B1 Export → Connect…** from the menu bar after the first open).
2. Paste the API key into the sidebar, leave the Base URL as `https://api.churchapps.org` (unless you're testing against staging), and click **Save**.
3. Click **Test Connection** — a green "Connection OK" confirms the key works.

The key is stored in **per-user properties** (`PropertiesService.getUserProperties()`) — it's tied to your Google account, never written into the sheet, and never visible to other editors of the spreadsheet.

## Running an Export

Either:

- **From the menu** — **Extensions → B1 Export → Export People** (or Donations / Groups / Attendance)
- **From the sidebar** — open the sidebar (Connect…) and click the appropriate dataset button

A toast confirms when it's done — "_N_ row(s) written to 'B1 People'."

## Building Reports On Top

The exported tabs are plain Google Sheets data. Build your own analytics on referencing tabs:

- A **summary tab** with `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` to total card gifts
- A **filtered view** of just members with `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- A **chart** of attendance trends pulling from `B1 Attendance`

Re-running the export refreshes the underlying tab; your formulas update automatically.

## Scheduling Recurring Exports

The add-on is on-demand by default. For weekly or monthly exports, use Apps Script's built-in time-driven triggers:

1. **Extensions → Apps Script** in the spreadsheet (this opens the add-on's bound script).
2. Click the **⏰ Triggers** icon in the left sidebar.
3. **Add Trigger** for `exportPeople` (or any export function) — choose *Time-driven*, *Week timer*, e.g. *Every Monday 6am*.

The export runs in the background under your Google account. If the API key is rotated or revoked, the trigger emails you the next time it fails.

## Permissions & Privacy

- The add-on requests only `spreadsheets.currentonly` (it can only touch the spreadsheet it's open in) and `script.external_request` (so `UrlFetchApp` can call the B1 API). It does **not** see your Drive, Gmail, or other Google data.
- The B1 API key is stored per-user — other editors of the same spreadsheet cannot see it.
- All B1 API calls are made over HTTPS with `Authorization: Bearer cak_…`.

## Troubleshooting

- **"No API key set"** — open **Extensions → B1 Export → Connect…** and paste the key.
- **"B1 rejected the API key (401)"** — the key was revoked or is wrong. Re-mint and re-paste it.
- **"This API key lacks permission for /giving/donations (403)"** — the key doesn't have `donations:read`. Update the key's scopes in B1Admin.
- **Sheet doesn't refresh** after running — make sure you're looking at the *correct* tab name (`B1 People` etc.). The export creates the tab if it didn't exist.
- **"Quota exceeded"** — Apps Script imposes per-user daily quotas on `UrlFetchApp` (typically thousands of calls per day). A large church with many records may need to split exports across multiple days or use [Make](./make) / a custom integration for high-volume sync.

## Customising the Add-On

The add-on is open source — the Apps Script project lives in the `B1Integrations/GoogleSheetsAddon/` repo. If you want a column we don't export, an extra dataset, or a different output format, open an issue or PR there.

## See Also

- [Zapier](./zapier) — for real-time sync rather than on-demand export
- [Make](./make) — for sync with more complex transformations
- [API Keys (developer reference)](/docs/developer/api/api-keys)

---

## integrations/index.md

# Integrations



B1 plugs into the tools your team already uses. Connect Slack or Discord for staff notifications, automate workflows in Zapier or Make, or export data on demand to Google Sheets — without paying for a separate integration platform and without ChurchApps hosting anything extra. Every integration runs on the third party's own infrastructure and talks to your church through B1's webhooks or REST API.



## What's Available

| Integration | What it does | Direction | Effort to set up |
|---|---|---|---|
| **[Slack](./slack-discord)** | Post readable notifications (new people, donations, sign-ups, …) to a Slack channel | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord)** | Same, in a Discord channel | B1 → Discord | 2 minutes |
| **[Zapier](./zapier)** | Use B1 events as triggers and B1 actions in any of Zapier's 7,000+ apps | Both | 5–10 min per Zap |
| **[Make](./make)** | Same idea as Zapier, in Make's visual scenario builder | Both | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Export People / Donations / Groups / Attendance to a spreadsheet on demand | B1 → Sheet | 5 minutes |
| **[Claude](./claude)** | Ask Anthropic's Claude questions about your church data, scoped to your permissions | Both | 5 minutes |
| **[ChatGPT](./chatgpt)** | Same idea with OpenAI's ChatGPT, via a Custom GPT or MCP-aware OpenAI tooling | Both | 10 minutes |
| **[Connected services](./services/)** | Curated recipes for Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varies | 5–10 min each |

## How to Pick

- **Just want a notification in chat?** Use **Slack** or **Discord** — no third-party account, no Zap to maintain. Configured entirely inside B1Admin.
- **Want to automate something across apps** (e.g. "when someone gives, add them to my Mailchimp list and Slack #donations")? Use **Zapier** or **Make**. Zapier is friendlier; Make is cheaper at scale and has more flexible logic.
- **Need a one-off data pull or a scheduled report**? Use **Google Sheets** — paste an API key into the add-on's sidebar and click Export.
- **Want to ask questions in plain English** ("how many first-time visitors last Sunday?", "summarize giving this month")? Use **[Claude](./claude)** or **[ChatGPT](./chatgpt)** — both connect to B1 with a single API key.
- **Building your own custom integration?** None of the above — talk to the [REST API](/docs/developer/api) directly with an [API key](/docs/developer/api/api-keys), or subscribe a server you control to [webhooks](/docs/developer/api/webhooks).

## What They Have In Common

Every integration authenticates with a **B1 API key**, created in B1Admin under **Settings → Developer → API Keys**. The key:

- Is bound to a specific person in your church and inherits that person's permissions
- Can be narrowed with **scopes** — for example a Google Sheets export only needs `people:read`, not `settings:write`
- Can be revoked at any time, instantly cutting the integration's access without affecting anything else

A few connectors (Zapier, Make) also register a [webhook](/docs/developer/api/webhooks) on your behalf when the Zap or scenario is turned on, and remove it when you turn the Zap off — you don't manage the webhook URL yourself.

:::tip
For Zapier and Make to register webhooks automatically, the API key needs the **`settings:write`** scope (plus the resource scopes for whatever the integration touches). A read-only key works for actions and exports but not for triggers.
:::

## Cost

ChurchApps is free and open-source. Slack/Discord, the [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), and the official Zapier / Make / Google Sheets connectors are also free from our side. The third parties may charge for their own platforms (Zapier and Make both have generous free tiers; Slack, Discord, and Google Sheets are free for this purpose).

## Building Your Own

If none of the above fits, every B1 surface is open:

- **[REST API](/docs/developer/api)** — call B1 from any language with an `Authorization: Bearer cak_…` header
- **[Webhooks](/docs/developer/api/webhooks)** — subscribe a public HTTPS endpoint to one or more event types and receive signed JSON payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — if you're building a SaaS product used by many churches

## Next Steps

- [Slack & Discord](./slack-discord) — post chat notifications
- [Zapier](./zapier) — connect to 7,000+ apps
- [Make](./make) — visual workflow automation
- [Google Sheets](./google-sheets) — export to spreadsheets
- [Claude](./claude) — ask Anthropic's Claude about your church data
- [ChatGPT](./chatgpt) — ask OpenAI's ChatGPT about your church data
- [Connected services](./services/) — per-service recipes (Mailchimp, Donorbox, Clearstream, …)

---

## integrations/make.md

# Make



[Make](https://www.make.com) (formerly Integromat) is a visual workflow automation platform — similar in spirit to Zapier, with more flexible logic and a cheaper bill at scale. The official B1.church Make app lets you build "scenarios" that react instantly to B1 events and write records back to B1.




#### Before You Begin

- A [Make](https://www.make.com) account (the free tier covers small workflows)
- A church admin with the **Edit Settings** permission in B1Admin
- A rough idea of the scenario you want to build



## Modules

| Type | What | B1 event / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | any subscribed B1 event (`person.created`, `donation.created`, …) |
| **Action** | Create Person | adds a new person |
| **Action** | Add Donation | records a donation |
| **Action** | Add Group Member | adds a person to a group |
| **Search** | Search People | finds people by name or email |

The instant trigger lets you pick which event to listen for — one trigger module per scenario, configured per event.

## Setup

### 1. Create a B1 API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, name it "Make", and grant the scopes you need.
3. **Include `settings:write`** if any of your scenarios use the instant trigger — Make registers a webhook on your behalf when the scenario turns on.
4. Also grant the scopes the action modules need (e.g. `donations:write` for the Add Donation module).
5. Save and copy the `cak_…` key.

### 2. Install the connection

1. In Make, build a new scenario and drop the **B1.church** trigger module onto the canvas.
2. When prompted, **Create a connection**. Paste the API key into the *API Key* field and leave *API Base URL* as `https://api.churchapps.org` (unless you're testing against staging).
3. Click **Save** — Make tests the key by reading your church profile.

The connection is saved on your Make account and reused across scenarios.

### 3. Configure the trigger

1. Open the **Watch Events** module's settings.
2. Pick the event you want — e.g. `donation.created`.
3. Save. Make generates a unique webhook URL and stores it internally.

### 4. Add downstream modules

Drop any of Make's hundreds of app modules onto the canvas — Mailchimp, Google Sheets, Slack, HubSpot, your own HTTP endpoint, etc. Map the trigger's output (`event`, `churchId`, `data.id`, `data.amount`, …) into their input fields. Make's flatten / iterator / router / aggregator modules let you build branching and parallel flows that would be hard in Zapier.

### 5. Turn the scenario on

Toggle **Active** in the scenario header. Make calls B1's `POST /membership/webhooks` to register the URL. From that moment, every matching B1 event flows through the scenario in real time.

Turning the scenario off calls `DELETE /membership/webhooks/{id}` so there are no orphan subscriptions.

## Common Recipes

### Sync donations to a Google Sheet for finance review

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row. Map `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` into the sheet's columns.

### Conditional Slack notification by donation amount

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Branch A — Filter: `data.amount >= 1000` → Slack: post to `#major-gifts`
  - Branch B — fallthrough → Slack: post to `#donations`

### New person → CRM + welcome email + Slack

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: Notify `#new-people` (in parallel — use Make's router)

## How the Instant Trigger Works

The instant trigger is webhook-backed, not polling — when activated, Make calls `POST /membership/webhooks` with its generated URL and the event you chose. When the event fires in B1, B1 POSTs the envelope to Make's URL and your scenario runs within seconds. Deactivating the scenario removes the webhook.

The trigger only fires for events that happen **while the scenario is active**. There's no backfill.

## Limits & Notes

- **One event per Watch Events module.** To listen for several events in one scenario, drop multiple trigger modules into separate scenarios (or use a single module with the unioned event list — see below).
- **Signature verification is not exposed** — Make doesn't pass `X-B1-Signature` through to the scenario; the trust boundary is Make's unguessable per-scenario webhook URL. This is normal Make practice. If you need explicit signature checks, build a custom integration with the [SDK](/docs/developer/api/webhooks#sdk-support) instead.
- **Operation count** — every API call from an action module counts against your Make operations quota, not against anything on B1's side.

## Troubleshooting

- **Connection test fails** — most often a typo in the API key. Re-copy it from B1Admin (the full key is only shown once; if you've lost it, create a new key).
- **Trigger module doesn't activate** — check **Settings → Developer → Webhooks** in B1Admin. If you don't see a "Make — &lt;event&gt;" row after activating the scenario, the key is missing `settings:write`. Update the key and reactivate.
- **Action returns `403 Forbidden`** — the API key lacks the scope for that endpoint. For example, Add Donation needs `donations:write`. Update the key in B1Admin and re-test.

## Customising the App

The B1.church Make app is open source — the JSON definitions live in the `B1Integrations/Make/` repo. If you need a module that doesn't exist (e.g. a new action for an endpoint we haven't covered), open an issue or PR there.

## See Also

- [Zapier](./zapier) — same pattern with a simpler UI and a larger app catalog
- [Slack & Discord](./slack-discord) — built-in chat notifications without Make
- [Webhooks (developer reference)](/docs/developer/api/webhooks)

---

## integrations/services/checkr.md

# Checkr



[Checkr](https://checkr.com) runs background screening for staff and volunteers — a near-universal need for any church running a children's or youth program. Checkr doesn't have a Zapier app, but [Make.com's Checkr integration](https://www.make.com/en/integrations/checkr) is verified and exposes the actions you need to kick off a check from a B1 event.




#### Before You Begin

- A [Checkr](https://checkr.com) account with API access and at least one screening package configured
- A [Make](https://www.make.com) account
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

Make's Checkr app exposes 1 trigger and 6 actions:

| Direction | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtered to a volunteer group) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report event) | B1: Update the person's record (e.g. tag "Checkr cleared") |

Make's Checkr actions: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Plus 4 search modules.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — for the trigger webhook
- `people:read` — to look up the person's name/email when starting a check
- (Optional) `people:write` if you want to write the report status back as a custom field or tag

### 2. Build the "kick off a check on volunteer signup" scenario in Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — only continue if `data.groupId` matches your "Children's Volunteers" (or equivalent) group.
3. **Action** — B1.church: Find Person (by `data.personId`) to get email + first/last name.
4. **Action** — Checkr: Create Candidate. Map first/last/email from step 3.
5. **Action** — Checkr: Create Background Check Invitation. Map the new candidate id from step 4 to the *candidate_id* field. Pick the screening package (e.g. `tasker_standard` or whatever your account exposes).
6. (Optional) **Action** — Slack: notify your safe-ministry coordinator that a check has been initiated.

Turn the scenario on. New volunteers in the targeted group get an automatic Checkr invitation by email; they complete it on their phone or laptop; Checkr runs the screen.

### 3. (Optional) Receive the report back

1. **Trigger** — Checkr: Watch Events (webhook). Make registers a Checkr webhook on activation.
2. **Filter** — only continue if `event_type = report.completed`.
3. **Action** — Checkr: Get Report (use the report id from the webhook).
4. **Action** — B1.church: Find Person (by candidate email).
5. **Action** — Conditional Slack / Email: notify the coordinator with `clear` / `consider` / `suspended` status.

Note: B1 doesn't have a built-in "background-check status" field today. The pragmatic options are (a) post the result to a private Slack channel for review, (b) write it to a Google Sheet for audit, or (c) add the person to a "Cleared volunteers" B1 group on `clear`.

## Common Recipes

### Re-screen volunteers every 2 years

Pair the above with a Make schedule trigger:

- **Trigger** — Make: Schedule (monthly)
- **Action** — B1.church: List Group Members for "Cleared volunteers"
- **Action** — Filter by Make: cleared date older than 22 months
- **Action** — Checkr: Create Background Check Invitation (same as the initial flow)

### Block stage 1 access until check completes

If your church uses B1 group membership to gate access (e.g. only "Cleared" group members appear in serving schedules), keep new volunteers in a holding group until the Checkr `report.completed` event flips them.

## Limits & Notes

- **Checkr is US-only** for most screening packages. Australian, UK, and Canadian churches will need an alternative.
- **Pricing** is per check — every Create Invitation in Make burns a real check. Test in Checkr's sandbox / staging account first (Make's Checkr app respects the credentials you pass in the connection, so swapping creds switches sandbox/live).
- **Checkr API access is plan-gated.** Smaller Checkr accounts may be on a UI-only tier; contact Checkr to enable API.

## Troubleshooting

- **Create Candidate fails with `403`** — the Checkr API token is read-only or lacks the right account permissions. Re-issue it from the Checkr dashboard with write scope.
- **Invitation never arrives** — check the candidate's email in step 3; B1 may have an empty email field for that person. Add an email-required filter before the Checkr step.
- **Webhook trigger doesn't fire** — Checkr's webhook registration sometimes silently fails if your Make account isn't on a paid tier that supports outbound webhooks. Verify in Checkr's dashboard *Webhooks* page that Make's URL is listed.

## See Also

- [Make (overview)](../make) — B1 side of every Make scenario
- [Mobile Message](./mobile-message) — for SMS-providers-without-Zapier-apps, same Webhooks/HTTP pattern as the Checkr Make wiring
- [Checkr API docs](https://docs.checkr.com/)

---

## integrations/services/clearstream.md

# Clearstream



Trigger a [Clearstream](https://clearstream.io) text message from any B1 event — new person, new gift, form submission, calendar update — and pull replies back as B1 records. Clearstream's Zapier app exposes both directions, so the whole wiring is a recipe and not custom code.




#### Before You Begin

- A [Clearstream](https://clearstream.io) account with at least one list and an SMS allowance
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

| Direction | Trigger | Action |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (e.g. notify the finance team) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (e.g. prayer request team) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; tag with the keyword they texted |

Clearstream's Zapier actions: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — required for B1 to register the trigger webhook
- `people:read` — needed to look up the person from the event (`personId` → name/phone/email)
- (Optional) `people:write` if Clearstream replies should create B1 contacts

### 2. Build the "text on new gift" Zap

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person (the donation's `personId`)
3. **Action** — Clearstream: Send Text to Number. Use the person's phone from step 2 as the recipient, compose the message (`"Thanks for your gift, {first}! …"`).

Turn the Zap on. B1 registers the donation webhook on activation; you'll see `Zapier — donation.created` appear in **Settings → Developer → Webhooks**.

### 3. (Optional) Pull replies back as B1 records

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Filter by Zapier on the keyword — e.g. only continue if the text body starts with `PRAY`
3. **Action** — B1.church: Find Person (by phone)
4. **Action** — Filter / Path — if not found, create them; either way, file the text body somewhere (Slack, Google Sheet, or a B1 form submission via Webhooks by Zapier).

## Common Recipes

### Volunteer team paging

- **Trigger** — B1.church: New Form Submission (filtered on the prayer-request form id)
- **Action** — Clearstream: Send Text to List, where the list is your on-call pastoral team. Compose the body as `New prayer request: {data.questions.0.answer}`.

### First-time visitor follow-up sequence

- **Trigger** — B1.church: New Person, filtered on a B1 person tag of "First-time visitor"
- **Action** — Clearstream: Add Subscriber to Automated Workflow. Map the workflow id to a pre-built 7-day text drip.

### Keyword-driven group join

- **Trigger** — Clearstream: New Incoming Text (filter to keyword `MENS`)
- **Action** — B1.church: Find Person (by phone); fork on not-found → Create Person
- **Action** — B1.church: Add Group Member to the Men's Ministry group

## Limits & Notes

- **Clearstream meters SMS by message.** Every Send Text action consumes one or more credits depending on length and number of recipients — check your plan's allowance.
- **Phone must be in E.164 format** (e.g. `+15555550199`) for *Send Text to Number*. B1's person record stores whatever was entered; use a *Formatter by Zapier — Numbers → Format Phone Number* step if you can't guarantee the format.
- **No header is required from B1's side** — Clearstream's auth lives entirely inside its Zapier connection.

## Troubleshooting

- **Trigger never fires** — `Settings → Developer → Webhooks` should show a `Zapier — ` row after the Zap is turned on. If not, the B1 API key is missing `settings:write`. Re-mint and re-connect.
- **Clearstream returns "Invalid phone number"** — the recipient field isn't in E.164. Add a Format Phone Number step.
- **Send Text to List fails with `403`** — the Clearstream API user lacks permission for that list, or the list id is wrong. List ids are visible on the Clearstream list detail page.

## See Also

- [Text In Church](./text-in-church) — alternative SMS platform, similar wiring shape
- [Mobile Message](./mobile-message) — for churches outside the US
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Clearstream API docs](https://api-docs.clearstream.io/) — for custom integrations beyond the Zapier app

---

## integrations/services/donorbox.md

# Donorbox



If your church takes donations through Donorbox but tracks people and statements in B1, you can have Donorbox's instant Zapier triggers create matching donation records inside B1 — and create the donor as a B1 person if they don't already exist. No manual reconciliation, no monthly export.




#### Before You Begin

- A [Donorbox](https://donorbox.org) account with at least one campaign
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

| Direction | Donorbox trigger | B1 action |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instant) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurring) | Find Person → Add Donation (use Plan id as note) |

Donorbox publishes its triggers as **instant** — they fire within seconds of a real donation. No polling delay.

## Setup

### 1. Mint a B1 API key

In B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read` — to look up the donor by email
- `people:write` — to create them if they're new
- `donations:write` — to record the gift

Triggers in this direction are Donorbox's, not B1's, so you don't need `settings:write` here.

### 2. Build the "record a donation" Zap

1. **Trigger** — Donorbox: New Donation. Connect with Donorbox's API key (in Donorbox: *Account → Profile → API Settings*).
2. **Action** — B1.church: Find Person. Map the donor's email from the trigger to the *Email* search field.
3. **Action** — Filter by Zapier (optional): only continue if the donor wasn't found, then…
4. **Action** — B1.church: Create Person. Map first/last/email so the donor lands as a member, not just a gift record.
5. **Action** — B1.church: Add Donation. Map:
   - Amount → `data.amount`
   - Donation Date → trigger's donation date
   - Fund → pick the B1 fund that mirrors the Donorbox campaign (Zapier lets you switch funds based on a filter or formatter step)
   - Method → "Online"
   - Notes → Donorbox transaction id (handy when reconciling)

Turn the Zap on. The next live donation through Donorbox lands in **B1Admin → Donations** automatically.

## Common Recipes

### One Zap per fund

If you run multiple Donorbox campaigns that map to separate B1 funds, the cleanest layout is one Zap per campaign with a Donorbox *campaign* filter at the top — that way the fund mapping is hard-coded and you skip the lookup step.

### Treat updated donations as corrections

Donorbox's *New or Updated Donation* fires on edits too. Use a Zapier *Path* step on `event_type` to fork: "new" → Add Donation, "updated" → Find Donation + Update (note: B1's Zapier app does not currently have an Update Donation action — for now, log "updated" events to a Slack channel for manual review).

### Sync recurring plan changes to a Slack channel

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: Send Message to `#donations` (e.g. "Plan changed — Sarah's monthly gift is now $200")

## Limits & Notes

- **Match donors by email.** Donorbox doesn't share B1's person id; the only durable join key is email. Donors who give under a different email will create a new B1 person — your monthly reconciliation should look for these.
- **Refunds aren't separately exposed** — Donorbox emits a status update on the same donation. B1's Zapier app currently doesn't have an *Update Donation* action; the safe pattern today is to log refund events out-of-band and adjust the donation manually.
- **Test in Donorbox's sandbox first** to avoid creating fake gifts in production B1. Donorbox provides test mode credentials separate from live.

## Troubleshooting

- **"Person not found" warning every run** — that's fine if you've ordered the steps so a *Create Person* runs in the not-found branch. If the Create Person step never runs either, double-check the API key has `people:write`.
- **Donation amount looks 100× too big or small** — Donorbox sends cents in some payload variants and dollars in others. Use a *Formatter by Zapier — Numbers* step to divide by 100 if needed.
- **Duplicate donations from a single gift** — Donorbox fires both *New Donation* and *Updated Donation*. Either filter to `event_type = "donation.succeeded"` or build two Zaps with non-overlapping filters.

## See Also

- [Zapier (overview)](../zapier) — the B1 side of every Zapier recipe
- [Subsplash](./subsplash) — another donation platform with a Zapier app
- [Mailchimp](./mailchimp) — chain "new gift" into an email tag

---

## integrations/services/index.md

# Connected Services



The fastest way to connect B1 to another church-tech tool is usually a Zapier or Make recipe — you don't need new B1 infrastructure, and the third party hosts the workflow. This page is a curated list of services we've confirmed are wireable today, with a short, copy-paste setup guide for each.



## At a Glance

| Service | Category | Bridge | What you can wire |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier or Make | Sync new B1 people / givers into a Mailchimp audience |
| [Donorbox](./donorbox) | Donations | Zapier | Push Donorbox donations and donors back into B1 |
| [Subsplash](./subsplash) | App / Donations | Zapier | Pull Subsplash giving and people into B1 |
| [VOMO](./vomo) | Volunteering | Zapier | Sync volunteer signups between B1 groups and VOMO projects |
| [Clearstream](./clearstream) | SMS | Zapier | Trigger a Clearstream text from B1 events; ingest replies as B1 records |
| [Text In Church](./text-in-church) | SMS / Workflows | Zapier | Trigger Text In Church workflows from B1; receive Connect Card data |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier or Make | Send SMS from any B1 event |
| [Checkr](./checkr) | Background checks | Make | Kick off a background check when someone joins a serving team |

## What All Of These Have In Common

1. **B1 side of the wiring is identical** — create an API key with the right scopes in **B1Admin → Settings → Developer → API Keys**, then either let the bridge register a webhook for the trigger (Zapier / Make do this automatically, requires `settings:write`) or call B1's REST endpoints from a downstream action.
2. **The bridge bills you, not us.** ChurchApps is free; Zapier and Make both have free tiers that cover a handful of recipes.
3. **You can test the wiring without going live.** Both bridges have a "Test step" button that fires the trigger once against B1 and shows you the data shape before you turn the recipe on.

## Picking a Bridge

- **Zapier** is friendlier and has the larger app catalogue — use it as your default unless cost is an issue.
- **Make** is cheaper at scale and has more flexible routing/filter logic — use it when a single workflow has fan-out, conditionals, or many steps.
- **Webhooks by Zapier** (used for the Mobile Message doc) is a generic adapter that lets you POST to any HTTP endpoint from a Zap when the destination isn't a first-class Zapier app.

If you want something not on this list, B1's [REST API](/docs/developer/api) and [webhooks](/docs/developer/api/webhooks) are open — you can build a one-off bridge with the [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) in a few hours.

## What's Not Here (and Why)

Several popular church-tech tools — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — don't have a published Zapier app or Make module today. They have their own APIs but wiring them up to B1 is a custom-code job, not a recipe, so they don't fit this list. If a vendor adds a Zapier app or Make module, we'll add the doc.

We've also deliberately skipped Planning Center-Services-specific tools (music, presentation), competing ChMS products, migration consultants, and tools that only clean up PCO-specific data — none of them have a useful wiring path into B1.

## See Also

- [Zapier (overview)](../zapier) — the B1 side of every Zapier recipe is identical; this doc covers it once
- [Make (overview)](../make) — same for Make scenarios
- [Slack & Discord](../slack-discord) — chat notifications without any bridge
- [Google Sheets](../google-sheets) — on-demand exports
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the event catalog every recipe relies on

---

## integrations/services/mailchimp.md

# Mailchimp



Pipe new B1 people, givers, or group members into a Mailchimp audience so the next welcome series, year-end appeal, or volunteer newsletter pulls from a list that's always up to date. The wiring lives entirely in Zapier (or Make) — B1 fires the event, Mailchimp ingests the subscriber.




#### Before You Begin

- A [Mailchimp](https://mailchimp.com) account with at least one audience you want B1 people pushed into
- A [Zapier](https://zapier.com) account (the free tier covers small churches)
- A B1Admin user with **Edit Settings** permission so you can mint an API key



## What You Can Wire Up

| Direction | B1 trigger | Mailchimp action |
|---|---|---|
| B1 → Mailchimp | `person.created` | Add/Update Subscriber |
| B1 → Mailchimp | `donation.created` | Add Subscriber to Tag (e.g. "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Add Subscriber to Tag scoped to that group |
| Mailchimp → B1 | New Subscriber | B1 *Create Person* |

The Mailchimp side exposes lots more (campaigns, segments, automations) — see [Mailchimp's Zapier triggers](https://zapier.com/apps/mailchimp/integrations) for the full list. Anything mappable from the B1 envelope is fair game.

## Setup

### 1. Mint a B1 API key

In B1Admin go to **Settings → Developer → API Keys → New API Key**. Give it the scopes the Zap needs:

- `settings:write` — required for the trigger to register its webhook
- `people:read` — so the Zap can read first/last name, email, etc.
- (Optional) `people:write` if you also plan a Mailchimp → B1 direction

Save and copy the `cak_…` string — it's only shown once.

### 2. Build the Zap

1. **Trigger:** `B1.church — New Person`. On first use Zapier asks you to *Sign in to B1.church*; paste the API key.
2. **Action:** `Mailchimp — Add/Update Subscriber`. Map the trigger output:
   - `data.contactInfo.email` → Email Address
   - `data.name.first` → First Name
   - `data.name.last` → Last Name
   - (Optional) `data.id` → a Mailchimp merge field if you want to keep B1's person id alongside.
3. Turn the Zap on. Zapier registers a `person.created` webhook on B1 — verify in **Settings → Developer → Webhooks** that a row named "Zapier — person.created" appears.

That's it. Add a person in B1Admin to confirm — the new subscriber shows up in Mailchimp within seconds.

## Common Recipes

### Tag givers automatically

- **Trigger** — B1: New Donation
- **Action** — B1: Find Person (lookup by `personId`) to get the email
- **Action** — Mailchimp: Add Subscriber to Tag (tag `Gave-2026`)

### Drop a group-specific welcome series

- **Trigger** — B1: New Group Member, filtered by `data.groupId`
- **Action** — Mailchimp: Add Subscriber to Tag named after the group; trigger your existing automation off that tag

### Two-way: new Mailchimp signups become B1 contacts

- **Trigger** — Mailchimp: New Subscriber
- **Action** — B1: Create Person (map First/Last/Email)

## Make Alternative

Make's [Mailchimp app](https://www.make.com/en/integrations/mailchimp) covers 44 modules — the wiring is identical, with the B1 *Watch Events* trigger replacing Zapier's. See the [Make overview doc](../make) for the B1 side.

## Limits & Notes

- **Mailchimp's free tier caps contacts and audiences** — a Zap that floods a free audience past its limit will start erroring with `4xx Member limit reached`. Mailchimp's logs make this obvious.
- **Mailchimp deduplicates by email**, so re-running a Zap on the same B1 person updates them in place; it doesn't create duplicates.
- **Unsubscribes from Mailchimp don't flow back to B1.** If you want Mailchimp unsubscribes to clear B1's "Send Mail" preference, build the reverse Zap explicitly.

## Troubleshooting

- **Zap never fires** — check `Settings → Developer → Webhooks` for the `Zapier — person.created` row. If absent, the API key was missing `settings:write` when the Zap turned on. Re-mint, re-connect, toggle the Zap off and on.
- **`Member exists` warning on Add/Update** — switch the action from *Add Subscriber* to *Add/Update Subscriber* (the verb matters). The upsert variant is idempotent.
- **First name / last name come through blank** — B1's `data.name.first` and `data.name.last` are only populated if those fields are set on the person. Map `data.name.display` as a fallback.

## See Also

- [Zapier (overview)](../zapier) — the B1 side of every Zapier recipe
- [Make (overview)](../make) — same idea, visual builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)

---

## integrations/services/mobile-message.md

# Mobile Message



[Mobile Message](https://mobilemessage.com.au) is an Australian SMS API — popular with AU churches because it offers local numbers and competitive AU pricing where Clearstream and Text In Church are US-centric. Mobile Message doesn't have a first-class Zapier app today, but it does publish a public REST API, so you can wire B1 events to Mobile Message texts through **Webhooks by Zapier** (or Make's HTTP module) in a few minutes.




#### Before You Begin

- A [Mobile Message](https://mobilemessage.com.au) account with a registered Sender ID and API credentials (API username + password under *Account → API Settings*)
- A [Zapier](https://zapier.com) account (or [Make](https://www.make.com))
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

Mobile Message's API is "send SMS"-shaped — no triggers, just outbound text. So the recipes are all B1 → SMS:

| Direction | B1 trigger | Outcome |
|---|---|---|
| B1 → Mobile Message | `person.created` | Welcome text to the new person |
| B1 → Mobile Message | `donation.created` | Thank-you text to the donor |
| B1 → Mobile Message | `form.submission.created` | Page the on-call team |
| B1 → Mobile Message | `event.created` | Reminder broadcast to a list |

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — for the trigger webhook to register
- `people:read` — to look up the recipient's phone number from a `personId`

### 2. Build the Zap with Webhooks by Zapier

1. **Trigger** — B1.church: pick the event you want (e.g. New Donation).
2. **Action** — B1.church: Find Person (using `data.personId`) to get the phone number and name.
3. **Action** — Webhooks by Zapier: **POST**. Configure as below.

The POST step's settings:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier adds this automatically)
- **Basic Auth** — set the *Basic Auth* field to `|` (Zapier converts that to the right `Authorization: Basic …` header)

Turn the Zap on. Send a test gift in B1Admin to verify a text arrives.

## Common Recipes

### Event reminders the morning of

- **Trigger** — Schedule by Zapier (daily, 7am)
- **Action** — B1.church: Find Events for today (or use a Find step with a fixed date filter, or store today's event list in a Google Sheet)
- **Action** — Webhooks by Zapier: POST to Mobile Message with the event list to a registered subscriber group

### Use the batch endpoint for a list broadcast

Mobile Message's `/v1/messages` endpoint accepts up to 10,000 messages per call. To broadcast to a B1 group:

- **Trigger** — B1.church: New Form Submission (filter to a specific form)
- **Action** — B1.church: List Group Members for a target group (via a *Webhooks by Zapier — GET* step on `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize the response into a `messages` array
- **Action** — Webhooks by Zapier: POST the full array to `/v1/messages`

### Make alternative

If you prefer Make, drop the **HTTP — Make a request** module after the B1 Watch Events trigger, configure it the same way (POST, Basic Auth, JSON body). See the [Make overview](../make) for the B1 side.

## Limits & Notes

- **Basic Auth is the only authentication method** — Mobile Message issues a username and password from the dashboard. Treat both as secrets.
- **`sender` must be a registered Sender ID** on your Mobile Message account, or the send will return `400 Invalid sender`. AU regulations require sender registration.
- **AU phone numbers** can be `0412345678` (local) or `+61412345678` (international). The API accepts both, but normalise on `+61…` if you're sending overseas as well.
- **Up to 10,000 messages per request** — useful for broadcasts, but a single B1 webhook delivery will rarely emit a list that big; reserve the batch endpoint for scheduled bulk Zaps.

## Troubleshooting

- **POST returns `401 Unauthorized`** — Basic Auth credentials are wrong. Re-copy from the Mobile Message dashboard *Account → API Settings*. Note the username is your account email by default, not a separate API key.
- **POST returns `400 Invalid sender`** — the `sender` value isn't a registered Sender ID on your account. Register it in the Mobile Message dashboard first.
- **Text arrives but is truncated** — Mobile Message splits messages over ~160 characters into multiple parts; you're billed per part. Check the response body — it tells you the part count.

## See Also

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternative SMS providers with native Zapier apps (no Webhooks-by-Zapier step needed)
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Mobile Message API docs](https://mobilemessage.com.au/api-documentation)

---

## integrations/services/subsplash.md

# Subsplash



If you use Subsplash for your church app, giving, or forms but want B1 as the system of record for people and donations, Subsplash's Zapier app can pipe donations, new profiles, and form responses into B1 in real time. Note that Subsplash's Zapier app is currently **triggers-only** — the wiring is one-way (Subsplash → B1).




#### Before You Begin

- A Subsplash account on a plan that includes **API + Zapier** access (check with your Subsplash Client Success Manager — these gate behind plan tier)
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

All triggers below are Subsplash's. The actions are B1's.

| Subsplash trigger | B1 action |
|---|---|
| New Donation | Find Person → Add Donation (Create Person if missing) |
| New Pledge | Add Donation (with `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (no direct B1 action — log to a Google Sheet for manual review) |
| New Form Response | Create Person + (optionally) Add Group Member based on the form |

Subsplash → B1 is the only direction Subsplash's app supports right now.

## Setup

### 1. Mint a B1 API key

In B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read` — to look up the donor by email
- `people:write` — to create them if they don't exist
- `donations:write` — to record the gift
- (No `settings:write` needed — Subsplash, not B1, owns the trigger here.)

### 2. Connect Subsplash to Zapier

Follow [Subsplash's Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration). They issue an API token from inside the Subsplash Dashboard that Zapier uses to authenticate the trigger side.

### 3. Build the "record a donation" Zap

1. **Trigger** — Subsplash: New Donation
2. **Action** — B1.church: Find Person (by email)
3. **Filter / Path** — branch on "person found":
   - **Found:** B1.church: Add Donation. Map amount, date, fund, method = "Online", notes = Subsplash transaction id.
   - **Not found:** B1.church: Create Person → B1.church: Add Donation (using the newly created person's id).

Turn the Zap on. Future Subsplash donations flow into **B1Admin → Donations** within seconds.

## Common Recipes

### Send a thank-you when a first-time gift lands

- **Trigger** — Subsplash: New Donation
- **Action** — Filter by Zapier: only continue if it's the donor's first gift (use a *Lookup Table* on Donor Email against a Google Sheet of past givers, or a Zapier *Paths* step on the donor created date)
- **Action** — Mailchimp / SMTP / SendGrid: send first-gift thank-you message
- **Action** — B1.church: Add Donation (as usual)

### Filter pledges off the regular giving flow

- **Trigger** — Subsplash: New Pledge
- **Action** — B1.church: Add Donation with `notes = "Pledge — Subsplash"` and a fund called `Pledges` (separate from your operating fund) so you can report on pledges independently in **B1Admin → Donations → Reports**.

### Sync new app users as B1 people

- **Trigger** — Subsplash: New Person Created
- **Action** — B1.church: Create Person, populating name, email, phone. Tag in B1 by adding the new person to a group like "Subsplash App Users".

## Limits & Notes

- **Subsplash's Zapier app is triggers-only.** If you want B1-side changes (e.g. a new B1 person to land in Subsplash too), you'd need to build that bridge from B1's Zapier app triggers calling Subsplash's REST API via a custom *Webhooks by Zapier — POST* action. That's a custom integration, not a recipe.
- **API access is plan-gated.** If Zapier connection fails with `403 Forbidden`, your Subsplash plan likely doesn't include API access — contact your Client Success Manager.
- **Fund mapping is manual.** Subsplash passes a campaign or category name; B1 needs a numeric fund id. Either hard-code the fund in the Zap or maintain a Zapier *Lookup Table* mapping Subsplash campaigns to B1 funds.

## Troubleshooting

- **No trigger fires after a donation** — verify in Subsplash's Zapier dashboard that the connection still shows *Connected*. If the API token was rotated on the Subsplash side, the Zap silently stops; reconnect.
- **B1 *Add Donation* fails with 422** — most often a missing or unrecognised `fundId`. List your funds via **B1Admin → Donations → Funds** and copy the exact id into the Zap step.
- **First gift triggers twice** — Subsplash occasionally re-delivers a trigger if Zapier missed its ack. Add a *Filter by Zapier* on the donation id (Subsplash sends one in the payload) to drop duplicates.

## See Also

- [Donorbox](./donorbox) — same recipe shape, different donation platform
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Subsplash Zapier integration guide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash's docs)

---

## integrations/services/text-in-church.md

# Text In Church



[Text In Church](https://textinchurch.com) bundles SMS plus drip workflows and connect-card automations. Its Zapier app exposes both directions — pipe B1 events into a Text In Church workflow, and pull connect-card or new-contact triggers out the other side into B1.




#### Before You Begin

- A [Text In Church](https://textinchurch.com) account on a plan that includes the Zapier integration
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

| Direction | Trigger | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message via the relevant team |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (mirror group membership) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church actions also include *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, and group membership add/remove.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — required for B1-triggered Zaps
- `people:read`, `people:write` — to find or create the person
- `groups:write` — for group syncing
- (Optional) `donations:write` if you wire gift confirmations to TIC

### 2. Connect Text In Church to Zapier

Follow [Text In Church's Zapier integration guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). They generate an API token from inside the TIC dashboard.

### 3. Build the connect-card-to-B1 Zap

The most common direction. Connect cards fired from TIC become new B1 people automatically.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Action** — B1.church: Find Person (by email).
3. **Path** — branch on found / not found:
   - Not found → B1.church: Create Person.
   - Found → continue.
4. **Action** — B1.church: Add Group Member to a "New Contact" group.

Turn the Zap on. The next connect card submitted through TIC lands in **B1Admin → People** automatically.

## Common Recipes

### Trigger a connect-card-style workflow from a B1 form

- **Trigger** — B1.church: New Form Submission (filter on the "I'm new here" form id)
- **Action** — Text In Church: Create/Update Person, mapping the form's email / phone / name answers
- **Action** — Text In Church: Add to Group, where the group has a pre-built welcome workflow attached

### Mirror group membership

- **Trigger** — B1.church: New Group Member, filtered on a specific `groupId`
- **Action** — Text In Church: Add to Group (same person, mirror group). Pair with a `group.member.removed` Zap if you want full sync.

### Page a leader when someone joins

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message, recipient = the group leader's phone, body = `"{first} {last} just joined {group}"`.

## Limits & Notes

- **TIC's Zapier app gates behind plan tier.** If the Zapier integration is greyed out in the TIC dashboard, contact TIC support to enable it on your plan.
- **Group ids are TIC's, not B1's.** When mirroring, you'll maintain a mapping table somewhere (a Zapier *Lookup Table*, or hard-coded per-Zap).
- **Send Text Message costs credits.** Each Zap that fires *Send Text* consumes from your TIC SMS allotment.

## Troubleshooting

- **Connect-Card trigger doesn't fire** — TIC needs the Zapier integration toggle on. Also verify the form you tested with is configured as a "Connect Card", not a generic survey.
- **Create Person in B1 fails with 401** — the API key is wrong, revoked, or missing `people:write`. Re-mint.
- **Duplicate B1 people** — TIC sends both *Person Created* and *Connect Card Submitted* for the same event. Pick one as your source of truth and add a Zapier Filter on the other.

## See Also

- [Clearstream](./clearstream) — alternative SMS platform with similar Zapier shape
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Text In Church Zapier guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC's docs)

---

## integrations/services/vomo.md

# VOMO



VOMO is a volunteer engagement platform — people sign up for projects, check in at the kiosk, and accumulate hours. If you use VOMO for volunteer scheduling but B1 for people records, Zapier can sync membership and check-ins between them so neither side drifts.




#### Before You Begin

- A [VOMO](https://vomo.org) account on a plan that exposes Zapier (check with VOMO support if unsure)
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission



## What You Can Wire Up

VOMO's Zapier app exposes four instant triggers and four actions. The recipes most churches want:

| Direction | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (if new) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member to a "Currently Serving" group, or record as attendance |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (by email); else custom step |
| Either | VOMO Participation (signups) | B1: Add Group Member to project-specific group |

The VOMO actions are limited to **drafting projects** and **finding** existing organizers/projects — there's no "add this person to a VOMO project" action today. The interesting wiring is mostly VOMO → B1.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read`, `people:write` — to look up and create volunteers as B1 people
- `groups:write` — to add them to serving-team groups
- (Optional) `attendance:write` if you treat kiosk check-ins as attendance

### 2. Build the membership-sync Zap

1. **Trigger** — VOMO: Membership (event = `created`).
2. **Action** — B1.church: Find Person, matched on email.
3. **Filter / Path** — fork on found vs. not found:
   - Not found → B1.church: Create Person, then Add Group Member to the appropriate volunteer group.
   - Found → B1.church: Add Group Member directly.
4. Turn on. New VOMO volunteers now appear in B1 with the right group membership.

### 3. (Optional) Build the kiosk-check-in Zap

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person (by email)
3. **Action** — your choice:
   - *If treating as attendance* — Webhooks by Zapier POST to B1's `/attendance/visits` endpoint (B1's Zapier app doesn't yet have a first-class *Record Attendance* action). The B1 [API key](/docs/developer/api/api-keys) goes in the `Authorization: Bearer cak_…` header.
   - *If treating as group membership* — B1.church: Add Group Member with a "Currently Serving (Today)" group, and a second Zap later in the day removes them via a scheduled cleanup.

## Common Recipes

### Per-project group sync

- **Trigger** — VOMO: Participation (created)
- **Action** — Filter by Zapier on project id, then
- **Action** — B1.church: Add Group Member to a B1 group whose name mirrors the VOMO project.

When the VOMO project ends, manually clear the B1 group (or pair this with a *Participation deleted* trigger that removes them).

### Send a "thanks for signing up" text via SMS

Chain VOMO Participation → Clearstream Send Text or Text In Church Send Message in the same Zap. Both have first-class Zapier actions — see [Clearstream](./clearstream) and [Text In Church](./text-in-church).

### Detect drop-off

Run a daily Zapier *Schedule* trigger that calls Find Organizer in VOMO for a list of B1 people who joined the serving team this month — if VOMO returns "not found", they didn't activate VOMO and need a nudge.

## Limits & Notes

- **Email is the join key.** VOMO's payloads expose a user email but no B1 person id. Donors who use different emails in each system will create duplicates.
- **No "Add to Project" action in VOMO's Zapier app today.** If you need B1 → VOMO project enrollment, you'd POST to VOMO's REST API from a *Webhooks by Zapier* step, which is a custom integration.
- **VOMO's free / lower tiers may not include Zapier.** Confirm with VOMO support before promising a wiring date.

## Troubleshooting

- **Trigger never fires** — VOMO's instant triggers require the API token to remain valid. Re-test the Zap; reconnect VOMO if the token was rotated.
- **B1 *Add Group Member* fails with 422** — the group id in the action doesn't exist. Open **B1Admin → Groups**, click the group, and copy the URL's id segment into the Zap step.
- **Duplicate B1 people from a single VOMO volunteer** — they probably signed up under a different email than they already had in B1. Either standardise emails, or add a Zapier *Path* that also searches by phone before creating.

## See Also

- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — pair volunteer signups with SMS confirmations
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the events VOMO can trigger on

---

## integrations/slack-discord.md

# Slack & Discord



Post readable notifications from B1 directly to a Slack or Discord channel — new people, donations, group sign-ups, form submissions, calendar events, and more. No third-party account, no Zap to maintain: B1 reformats events into chat messages and POSTs them to the channel's webhook URL itself.




#### Before You Begin

- You need the **Edit Settings** permission in B1Admin
- An admin in your Slack workspace or Discord server to create the channel's Incoming Webhook
- Decide which channel you want notifications in (you can use the same channel for several event types, or split them across channels)



## How It Works

B1 has a built-in **Connector Type** for chat platforms. When you create a webhook with type **Slack** or **Discord**, the webhook engine still does its usual delivery + retry + signed-header dance, but the body it sends is reshaped from B1's normal `{event,churchId,data}` envelope into the small `{text}` (Slack) or `{content}` (Discord) message those services expect.

No B1 servers reach out to Slack on a per-church basis other than the existing outbound webhook flow — there is nothing new to host, nothing extra to pay for.

## Slack — Step by Step

### 1. Get a Slack Incoming Webhook URL

1. Open [api.slack.com/apps](https://api.slack.com/apps) in the Slack workspace you want notifications in.
2. Click **Create New App → From scratch**, name it something like "B1 Notifications", and pick the workspace.
3. In the left nav choose **Incoming Webhooks** and toggle **Activate Incoming Webhooks** to *On*.
4. Click **Add New Webhook to Workspace**, pick the channel (e.g. `#donations`), then **Allow**.
5. Slack lands you back on the page with a fresh **Webhook URL** that looks like `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copy it — that's the only piece of information B1 needs.

:::caution
Treat the Slack webhook URL as a secret. Anyone with it can post arbitrary messages to the channel. If you accidentally expose it, regenerate it from the Slack app page (regenerating just rotates the URL; update B1 to match).
:::

### 2. Connect it in B1Admin

1. In B1Admin go to **Settings → Developer → Webhooks**.
2. Click **New Webhook**.
3. Fill in:
   - **Name** — something readable like "Donations → #donations". Only your team sees it.
   - **Connector Type** — choose **Slack**.
   - **Payload URL** — paste the Slack URL from step 1.
   - **Events** — tick the events you want as messages. For a donations channel, just `donation.created`. For a #people channel, try `person.created` and `group.member.added`.
4. Click **Save**. A "Signing Secret" dialog appears — you can ignore it for Slack (Slack doesn't verify B1 signatures) and close it.

### 3. Test it

Re-open the webhook from the list and click **Send Test Event**. Within a second or two a message like

> 💝 New donation: $50.00

appears in your Slack channel, and a new row shows up in the **Recent Deliveries** table on the same screen with status `succeeded`. You're done.

## Discord — Step by Step

### 1. Get a Discord Webhook URL

1. In your Discord server, hover over the channel you want notifications in and click the **⚙ gear** (Edit Channel).
2. Open **Integrations → Webhooks → New Webhook**.
3. Give it a name and (optionally) an avatar, then click **Copy Webhook URL** — looks like `https://discord.com/api/webhooks/123…/abc…`.

### 2. Connect it in B1Admin

Identical to the Slack flow above, except set **Connector Type** to **Discord**. Paste the Discord URL into **Payload URL** and save.

:::tip
You do **not** need to add `/slack` to the end of the Discord URL — B1 sends Discord-native `{content}` payloads, not Slack-compatible ones. Just paste the URL Discord gave you.
:::

### 3. Test it

Same **Send Test Event** button — Discord shows the message in the chosen channel and the delivery log flips to `succeeded`.

## What the Messages Look Like

| Event | Example message |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

The full list lives in the [webhook event catalog](/docs/developer/api/webhooks#event-catalog) — any event there can be routed to Slack/Discord.

## One Channel Per Topic

You don't have to put every event in one place. Most churches set up a handful of webhooks:

- A **#donations** channel that only listens to `donation.created`
- A **#new-people** channel for `person.created` and `group.member.added`
- A **#admin-alerts** channel for low-volume things like `form.submission.created`

There's no limit on the number of webhooks per church. Each one is independent — deleting or disabling one doesn't affect the others.

## Inspecting Deliveries

The webhook editor's **Recent Deliveries** table shows the last 50 attempts. Click a row to see the exact payload that was sent and the response that came back. For a Slack connector the payload is `{"text":"💝 New donation: $50.00"}` — not the raw `{event,churchId,...}` envelope — because B1 reshapes it before delivery.

If something failed (red `failed` or `exhausted` badge), the dialog shows the HTTP status and response body so you can see exactly what Slack or Discord didn't like — usually a copy/paste error in the URL.

## Troubleshooting

- **No message appears + delivery status `400`** — usually the Connector Type is set to **Standard** but the URL is a Slack/Discord one. Slack/Discord reject the raw envelope. Switch the dropdown to **Slack** or **Discord** and resend the test.
- **Webhook auto-disabled** — after 3 consecutive failed deliveries B1 turns the webhook off. Fix the URL (or rotate it on Slack/Discord) and toggle **Active** back on.
- **Message arrived but is missing detail** — every chat platform limits message size. B1's messages are one-liners by design; for richer notifications use [Zapier](./zapier) or [Make](./make) to compose a fuller Slack message via their Slack actions.

## Switching Connector Types Later

You can change the Connector Type on an existing webhook — it takes effect on the next delivery. If you switch from Slack to Standard, point the URL at your own HTTPS endpoint and the same signing secret (it was issued when the webhook was created) starts being verifiable as the raw envelope.

## See Also

- [Zapier](./zapier) — for multi-step workflows triggered by B1 events
- [Make](./make) — visual scenario builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — the full payload + signature format if you ever point a webhook at your own server

---

## integrations/zapier.md

# Zapier



The official B1.church app on Zapier lets a Zap react to events in your church (new person, new donation, new group member, …) and write records back to B1. No coding, no infrastructure — you wire it up in Zapier's drag-and-drop editor, paste an API key, and turn the Zap on.




#### Before You Begin

- A [Zapier](https://zapier.com) account (the free tier is enough for a handful of Zaps)
- A church admin with the **Edit Settings** permission in B1Admin (you'll create an API key)
- An idea of what you want to do — e.g. "when a person is added in B1, add them to my Mailchimp list"



## Triggers and Actions

| Type | What | B1 event / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | adds a new person |
| **Action** | Add Donation | records a donation |
| **Action** | Add Group Member | adds a person to a group |
| **Search** | Find Person | looks up a person by name or email |

Combine these freely with any of Zapier's 7,000+ supported apps.

## Setup

### 1. Create a B1 API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, give it a name like "Zapier", and select the scopes the Zap needs.
3. **Important:** Zapier triggers register a webhook on your behalf when the Zap turns on, which requires the **`settings:write`** scope. Always include `settings:write` if any of your Zaps use a B1 trigger.
4. Also grant the scopes the actions need — for example a "Add Donation" action needs `donations:write`, "Create Person" needs `people:write`.
5. Save. The full `cak_…` key is shown **once** — copy it.

### 2. Connect Zapier to B1

1. In Zapier, build a new Zap.
2. When you pick a B1 trigger or action for the first time, Zapier asks you to **Sign in to B1.church**.
3. Paste the API key from step 1 and click **Yes, Continue**. Zapier validates it against your church.

The connection is saved in Zapier and reused by every Zap on your account.

### 3. Build the Zap

Pick a trigger, then add one or more action steps. Examples below.

## Common Recipes

### Add new B1 people to Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. Map B1's `name__first`, `name__last`, `contactInfo__email` into Mailchimp's First Name / Last Name / Email fields.

### Post donations to a Slack channel with a richer card than the built-in connector

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Compose any layout — buttons, attachments, etc. — that the built-in [Slack connector](./slack-discord) can't.

### Add new group members to a Google Group

- **Trigger** — B1: New Group Member (filtered to a specific `groupId`)
- **Action** — Filter by Zapier: only continue if the B1 group is the one you care about
- **Action** — B1: Find Person (use the trigger's `personId` to fetch the email)
- **Action** — Google Groups: Add Member

### Forward form submissions to a project tracker

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## How Triggers Work Under the Hood

Triggers are **REST hooks**, not polling — Zapier doesn't ping B1 every 15 minutes. When you turn the Zap on, Zapier asks B1 to register a webhook pointing at a private Zapier URL; when the event fires, B1 POSTs the envelope to Zapier and your Zap kicks off **within seconds**. Turn the Zap off and Zapier asks B1 to delete the webhook — no orphan subscriptions.

This means the trigger only fires for events that happen **after** the Zap is turned on. There is no backfill — turning a Zap on does not replay yesterday's donations.

## Limits & Notes

- **Multiple Zaps with the same trigger** each register their own B1 webhook — there's no conflict, but it's worth knowing if you're inspecting **Settings → Developer → Webhooks** and wondering why three identical `Zapier — donation.created` rows are there.
- **Test data in Zap setup** — when you build a Zap, Zapier asks for sample data to map fields. It will pull the most recent matching event from B1 if there is one; otherwise it uses a synthetic sample from the app definition.
- **Action failures surface as Zap errors** in Zapier's task history. Common cause: an API key without the right scope (e.g. an "Add Donation" action needs `donations:write`). Re-mint the key with the correct scopes and re-connect in Zapier.
- **Outbound API call quotas** — every B1 API call from an action counts toward your Zapier task quota, not toward anything on B1's side.

## Troubleshooting

- **"Authentication failed"** when connecting — the API key is wrong, revoked, or missing the scopes the Zap needs. Re-mint it in B1Admin with at least `settings:write` plus whatever resource scopes the Zap touches, then update the connection.
- **Trigger never fires** — confirm the webhook actually got registered: in B1Admin, **Settings → Developer → Webhooks** should now show a row named "Zapier — &lt;event&gt;". If it's not there, the API key probably lacked `settings:write` when you turned the Zap on. Fix the key, toggle the Zap off and back on.
- **Trigger fires twice** — Zapier occasionally redelivers if its acknowledgement was lost. Use a "Filter by Zapier" step on a unique id (e.g. the person's `id`) if you need strict deduplication.

## See Also

- [Make](./make) — same pattern, different platform
- [Slack & Discord](./slack-discord) — simpler chat notifications without Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)

---

## introduction.md

# Welcome to B1.church Admin!



Thank you for choosing B1.church! This introduction walks you through the basics of getting started with the B1.church Admin platform, from signing in and navigating the dashboard to setting up your church's information and exploring the available tools.



For further support, please email [support@churchapps.org](mailto:support@churchapps.org).

## Introduction Video

[Video]

## Walkthrough

1. Using Google Chrome, go to [admin.b1.church](https://admin.b1.church) and sign in with your username and password.
2. This will take you to the **B1.church Admin dashboard**. From here, you can manage your church's database, website, mobile app, lessons, and more.
3. Click on **Settings** to set up your church's information, administrative roles, and other details.
4. Click on the **edit pencil** to set up your church information.
5. Back on the dashboard, click the **question mark icon** in the top right corner for help and tutorials.
6. Click **View Documentation** to see a list of tutorials to help you get started with B1.church.
7. Navigate back to the dashboard and click the **arrow next to your profile picture** and choose **Switch App**.
8. Choose **Lessons.church** to manage your church's online lessons and curriculum.
9. Switch back to B1.church by clicking the arrow next to your profile picture and choosing **Switch App** again.
10. You can now enter B1.church through the **member portal** or the **admin portal**. The member portal allows you to see how B1.church looks to your members, view your groups, and manage your personal donations.

:::tip
Start with the [Settings](./settings/) page to configure your church name, branding, and team permissions. This ensures everything else you set up will display correctly.
:::

## Next Steps

After watching this introduction, explore these key features:

- [Adding People](./people/adding-people) -- Learn how to add members to your database
- [Groups](./groups/) -- Set up and manage church groups
- [Serving Plans](./serving/plans) -- Organize your serving ministry
- [Attendance](./attendance/) -- Track attendance and check-in
- [Website](./website/) -- Build and customize your church website
- [Settings](./settings/) -- Configure your church information and permissions

---

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

## people/bulk-editing.md

# Bulk Editing People


Bulk editing allows you to update multiple people at once, saving time when making the same change to many individuals. You can update membership status, marital status, gender, opt-out preferences, and group memberships in a single operation.



#### Before You Begin

- You need permission to manage people data. See [Roles & Permissions](./roles-permissions.md) for details.
- You should have already added or imported the people you want to edit. See [Adding People](./adding-people.md) if needed.


## Selecting People for Bulk Editing

1. Navigate to **People** in B1 Admin
2. Use the search or filter tools to find the people you want to update
3. Check the boxes next to each person's name to select them
   - You can select people individually
   - Or use the header checkbox to select all visible people on the current page
4. Once you have selected at least one person, the **Bulk Actions** button will appear

:::tip
If you need to update a large group of people based on specific criteria, use the [AI Search](./ai-search.md) feature or filters to narrow down your list first, then select all matching people.
:::

## Available Bulk Actions

The **Bulk Actions** menu provides several options:

### Update Membership Status

Update the membership status for all selected people:

1. Click **Bulk Actions** → **Set Membership Status**
2. Choose the new status:
   - **Visitor** -- First-time or occasional attendees
   - **Regular Attendee** -- Frequent attendees who aren't members
   - **Member** -- Official church members
   - **Staff** -- Church staff members
   - **Inactive** -- People who are no longer attending
3. Choose update mode:
   - **Overwrite all** -- Replace the current status for all selected people
   - **Only update empty** -- Only set the status for people who don't have one
4. Click **Update**

### Update Marital Status

Update marital status in bulk:

1. Click **Bulk Actions** → **Set Marital Status**
2. Select the new status:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Choose whether to overwrite existing values or only update empty fields
4. Click **Update**

### Update Gender

Update gender information for multiple people:

1. Click **Bulk Actions** → **Set Gender**
2. Select the value:
   - **Unspecified**
   - **Male**
   - **Female**
3. Choose update mode (overwrite all or only empty)
4. Click **Update**

### Update Opt-Out Status

Control whether people have opted out of communications:

1. Click **Bulk Actions** → **Set Opted Out**
2. Choose:
   - **No** -- Allow communications (remove opt-out)
   - **Yes** -- Block communications (set opt-out)
3. Choose update mode
4. Click **Update**

:::warning
Be careful when changing opt-out status. People who have explicitly opted out should not receive communications unless they have given new consent.
:::

### Add to Group

Add all selected people to one or more groups:

1. Click **Bulk Actions** → **Add to Group**
2. Search for and select the group(s) to add people to
3. You can select multiple groups to add people to all of them
4. Click **Add to Groups**

Each person will be added as a regular member of the selected group(s). You can later promote individuals to group leaders if needed from the [Group Members](../groups/group-members.md) page.

### Remove from Group

Remove all selected people from one or more groups:

1. Click **Bulk Actions** → **Remove from Group**
2. Search for and select the group(s) to remove people from
3. You can select multiple groups
4. Click **Remove from Groups**

:::info
This action only removes people from the specified groups. It does not delete their person records.
:::

### Delete People

Permanently delete the selected people from your church database:

1. Click **Bulk Actions** → **Delete**
2. Review the list of people who will be deleted
3. Type **DELETE** in the confirmation field
4. Click **Confirm Delete**

:::danger
Deleting people is permanent and cannot be undone. This will remove all their data including:
- Personal information
- Group memberships
- Attendance records
- Donation history
- Form submissions

Only use this action if you are absolutely certain you want to remove these people from your system.
:::

## Bulk Edit Results

After completing a bulk action, you'll see a summary showing:

- **Total selected** -- How many people were included in the operation
- **Successfully updated** -- How many records were changed
- **Failed** -- Any records that couldn't be updated (if applicable)
- **Unchanged** -- Records that didn't need changes (e.g., when using "only update empty" mode)

If any updates failed, you'll see error details explaining why.

## Best Practices

- **Start small** -- Test bulk operations on a few records first to ensure you're making the right changes
- **Use filters** -- Narrow your list with filters or AI search before selecting people to ensure you're only updating the right individuals
- **Double-check selections** -- Review the selected people before applying bulk changes
- **Use "only update empty" mode** -- When you want to fill in missing data without overwriting existing information
- **Document major changes** -- Keep notes about bulk updates in case you need to reference them later
- **Coordinate with your team** -- Let other administrators know when making large bulk changes

## Common Use Cases

### Updating New Members

After a membership class, update all attendees to Member status:

1. Search for the people who attended the class
2. Select them all
3. Use **Bulk Actions** → **Set Membership Status** → **Member**

### Organizing Small Groups

Add multiple people to a new small group:

1. Search for the people you want in the group
2. Select them
3. Use **Bulk Actions** → **Add to Group** and select the small group

### Cleaning Up Data

Fill in missing marital status for married couples:

1. Filter for people who are married (using household information)
2. Select those with blank marital status
3. Use **Bulk Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Related Articles

- [Searching People](./searching-people.md) -- Find people to edit
- [AI Search](./ai-search.md) -- Use natural language to find specific groups of people
- [Group Members](../groups/group-members.md) -- Manage group membership
- [Exporting Data](./exporting-data.md) -- Export people data before making bulk changes

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



The B1 Transfer tool makes it easy to bring your existing data into B1, whether you are starting fresh from a spreadsheet, migrating from another church management platform, or importing giving records. It can also be used to export or back up your data at any time.




#### Before You Begin

- You need an active B1 Admin account with access to **Settings**.
- Have your data exported and ready from your previous system before starting.
- This tool is intended for initial data migration. If you have already been using B1 for a while, importing again may create duplicate records.



## Accessing the Transfer Tool

1. Log in to **B1 Admin**.
2. Go to **Settings** in the left sidebar.
3. Click the **Import/Export** button in the top right of the page header.
4. This will open the **B1 Transfer** tool in a new tab at [transfer.b1.church](https://transfer.b1.church).

The transfer tool walks you through four steps: Source, Preview, Destination, and Run.

---

## Step 1 - Choose Your Source

Select where your data is coming from. There are seven options:

- **B1 Database** — Pulls data directly from your existing B1 church. Useful for making a backup or converting your data to another format. You must be logged in to use this option.
- **B1 Import Zip** — A zip file in B1's own format. This is primarily used to restore a previous B1 export.
- **Breeze Import Zip** — A zip file containing exported files from Breeze ChMS.
- **Planning Center Zip** — A zip or CSV file exported from Planning Center.
- **Custom CSV / Excel** — Any CSV or Excel file containing people data. After uploading, you will map your columns to B1 fields before the import proceeds.
- **Tithe.ly CSV** — A people or giving export file from Tithe.ly (CSV or Excel format accepted).
- **CCB / Pushpay CSV** — A people or giving export CSV from Church Community Builder or Pushpay.

You can drag and drop your file onto the upload area, or click to browse for it.

---

## Step 1b - Map Your Fields (Custom CSV / Excel only)

If you selected **Custom CSV / Excel**, after uploading your file the tool will show a field mapping screen before moving to the preview.

Each column from your file is listed alongside a sample value. For each column, use the dropdown to choose the matching B1 field. The tool will auto-detect common column names like "First Name," "Email," or "Zip Code," but you should review every row and correct anything it missed.

Available B1 fields include:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — assigns the person to a group by name
- **Form Answer (custom field)** — saves that column's value as a custom field attached to the person's record. If you use this option, you will be asked to give the form a name.

Columns you do not want to import can be set to **(Skip)**. At least one name field (First Name or Last Name) must be mapped before you can continue.

Click **Confirm Mapping & Import** to proceed to the preview.

---

## Step 2 - Preview Your Data

After uploading, the tool displays a preview of everything that will be imported. Use the tabs to review each data type:

- **People** — Listed by household, with photos if included.
- **Groups** — Organized by campus, service, time, and category.
- **Attendance** — Session dates, groups, and visit counts.
- **Donations** — Batches, funds, donors, and amounts.
- **Forms** — Form names and content types.

Review this carefully before proceeding. If something looks wrong, click **Start Over** and correct your source file.

---

## Step 3 - Choose Your Destination

Select where you want the data to go:

- **B1 Database** — Imports directly into your church's B1 database. After selecting this, the tool will show a final count of records to be added. Click **Start Transfer** to confirm.
- **B1 Export Zip** — Downloads your data as a B1-format zip file. Good for backups.
- **Breeze Export Zip** — Converts your data to Breeze format.
- **Planning Center Zip** — Converts your data to Planning Center format.

:::warning
The source and destination cannot be the same format. If they match, the tool will warn you to prevent accidental duplication.
:::

---

## Step 4 - Run

The tool processes the transfer and shows progress for each step:

- Campuses, Services, and Times
- People
- Photos
- Groups and Group Members
- Donations
- Attendance
- Forms, Questions, Answers, and Form Submissions
- Compressing (for zip file destinations only)

:::warning
Do not close your browser while the transfer is running. Wait until all steps show as complete.
:::

---

## Preparing a Breeze Import Zip

1. In Breeze, go to **Settings** and click **Export** in the left sidebar.
2. Export three separate files: **People**, **Tags**, and **Contributions**.
3. Select all three files, right-click, and compress them into a single zip file.
   - On a Mac: select the files, right-click, and choose **Compress**.
   - On a PC: select the files, right-click, choose **Send to**, then **Compressed (zipped) folder**.
4. Upload the zip file using the **Breeze Import Zip** option in Step 1.

The Breeze import transfers people, groups (tags), and donation records automatically.

---

## Preparing a Planning Center Export

1. In Planning Center, export your people data as a CSV or zip file.
2. Upload it using the **Planning Center Zip** option in Step 1.

---

## Preparing a Tithe.ly Export

1. In Tithe.ly, export your **People** data as a CSV or Excel file. You can also export a separate **Giving** file if you want to bring in donation records.
2. The tool will automatically detect whether the file contains people or giving data based on the column names.
3. Upload the file using the **Tithe.ly CSV** option in Step 1.

:::info
Tithe.ly exports can be imported one file at a time. Run the process twice if you need to import both people and giving records separately.
:::

---

## Preparing a CCB or Pushpay Export

1. In Church Community Builder or Pushpay, export your **People** data as a CSV file. You can also export a separate giving/contributions file.
2. The tool will automatically detect whether the file contains people or giving data based on the column names.
3. Upload the file using the **CCB / Pushpay CSV** option in Step 1.

---

## After Importing

Once the transfer is complete, take a few minutes to verify your data:

1. Browse the [People](../people/adding-people.md) page and spot-check a few profiles.
2. Confirm that names, emails, phone numbers, and addresses came through correctly.
3. Check that household connections are intact.
4. Review any imported groups and giving records.

If you notice issues, you can edit individual profiles from the People page. You can also run the transfer tool again to [export your data](exporting-data.md) as a backup.

---

## people/index.md

# People



The **People** section is the heart of your church management in B1 Admin. This is where you maintain your church directory -- searching for members, adding new people, viewing and editing profiles, and tracking households. Whether you have a small congregation or a large one, keeping your people records organized is the foundation that powers every other feature in B1.



## What You Can Do

Here is an overview of the key features available in the People section:

1. **Search your directory** -- Use the quick search bar to find anyone by name, or take advantage of advanced filters and AI-powered natural language search to locate exactly who you need. See [Searching People](./searching-people.md) and [AI Search](./ai-search.md) for details.

2. **Add new people** -- Quickly add individuals to your directory and fill in their profile details, contact information, and household connections. See [Adding People](./adding-people.md) for step-by-step instructions.

3. **Bulk edit people** -- Update multiple people at once by changing their membership status, marital status, gender, opt-out preferences, or group memberships. This saves time when making the same change to many individuals. See [Bulk Editing](./bulk-editing.md).

4. **Import and export data** -- Bring in member data from a CSV file or migrate from another church management system like Breeze. You can also export your directory to CSV at any time. See [Importing Data](./importing-data.md) and [Exporting Data](./exporting-data.md).

5. **Manage profiles** -- View and edit detailed profiles for each person, including contact info, household members, [group memberships](../groups/group-members.md), [attendance history](../attendance/tracking-attendance.md), [donations](../donations/recording-donations.md), and [custom forms](../forms/creating-forms.md).

6. **Assign roles and permissions** -- Control who on your team can access different parts of B1 Admin by assigning roles. See [Assigning Roles](./roles-permissions.md).

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

## profile/devices.md

# Managing Devices



The Devices page lets you manage ChurchAppsPlayer devices connected to your account. These devices are used for streaming content and displaying church media on screens at your location.




#### Before You Begin

- Have a ChurchAppsPlayer device powered on and connected to the internet
- Note the pairing code displayed on the device's screen
- Review your [profile settings](./managing-profile.md) if you have not already



## Viewing Your Devices

When you open the Devices page, you will see a table listing all registered devices with the following information:

- **Label** -- The name you have assigned to the device.
- **Registration Date** -- When the device was first paired with your account.
- **Last Active Date** -- The most recent time the device connected to your account.

## Adding a New Device

1. Click the **Add Device** button at the top of the Devices page.
2. You will be prompted to enter a **pairing code**.
3. Find the pairing code displayed on the ChurchAppsPlayer device you want to connect.
4. Enter the code and confirm.
5. The device will appear in your devices table once successfully paired.

:::tip
Make sure the ChurchAppsPlayer device is powered on and connected to the internet before attempting to pair it. The pairing code is displayed on the device's screen.
:::

## Editing a Device Label

1. Click the **device name** in the devices table.
2. Update the label to something descriptive (for example, "Sanctuary Main Screen" or "Lobby Display").
3. Save your changes.

:::tip
Using clear, descriptive labels makes it easy to identify which device is which, especially when you have multiple screens set up at your church.
:::

## Managing Device Access

Use the Devices page to keep track of which devices have access to your church's streaming and content. If a device is no longer in use, you can remove it from your account to keep your device list clean and secure.

:::warning
Regularly review your connected devices to make sure only active, authorized devices are linked to your account. Remove any devices that are no longer in use to maintain security.
:::

## Next Steps

- [Managing Your Profile](./managing-profile.md) -- Edit your personal account settings

---

## profile/index.md

# Profile



The Profile section lets you manage your personal account settings in ChurchApps. Your profile is shared across all ChurchApps tools, so changes you make here apply everywhere -- from B1 Admin to the B1 Mobile app.



## What You Can Do

From the Profile section, you can:

- **Update your name and email** -- Keep your contact information current.
- **Change your password** -- Set a new password for your account.
- **Switch themes** -- Toggle between light and dark mode to match your preference.
- **Manage connected devices** -- View and control which ChurchAppsPlayer devices are linked to your account.
- **View linked accounts** -- See and manage any external services connected to your ChurchApps account.

## Profile Sub-Sections

The Profile area has the following pages:

1. **[Managing Your Profile](./managing-profile.md)** -- Edit your personal information, change your password, manage linked accounts, adjust theme preferences, and handle account deletion.
2. **[Managing Devices](./devices.md)** -- View, add, and manage ChurchAppsPlayer devices paired with your account.

:::tip
Keep your email address up to date. It is used for account recovery and important notifications from your church.
:::

## Next Steps

- [Managing Your Profile](./managing-profile.md) -- Edit your personal settings
- [Managing Devices](./devices.md) -- Manage connected devices

---

## profile/managing-profile.md

# Managing Your Profile



The Profile page lets you edit your personal account settings. Your profile is shared across all ChurchApps products, so any changes you make here will be reflected everywhere you use ChurchApps.




#### Before You Begin

- You must be logged in to your ChurchApps account
- Have your new email address or password ready if you plan to update them



## Profile Information

The top section of the Profile page contains your basic account details:

1. **Email** -- Your email address used for logging in and receiving notifications.
2. **First Name** and **Last Name** -- Your display name across ChurchApps.
3. **Password** -- Update your account password.

To update your information, edit the fields and click the **Save Changes** button.

## Changing Your Password

1. Scroll to the password fields on the Profile page.
2. Enter your new password in the **Password** field.
3. Re-enter it in the **Confirm Password** field.
4. Click **Save Changes**.

:::info
Your password must be at least 8 characters long. Make sure both the password and confirmation fields match exactly.
:::

## Linked Accounts

The **Linked Accounts** section shows any external services connected to your ChurchApps account. You can view which accounts are linked and manage those connections from this section.

## Theme Preferences

ChurchApps supports both light and dark display modes:

1. Find the **Theme** toggle on your Profile page.
2. Switch between **Light** and **Dark** mode.
3. The interface will update immediately to reflect your choice.

Your theme preference is saved to your account and will apply across all your sessions.

## Account Deletion

At the bottom of the Profile page, you will find the option to permanently delete your account. This action removes your account and associated data and cannot be undone.

:::warning
Account deletion is permanent and cannot be reversed. Make sure you truly want to remove your account before proceeding.
:::

:::info
If you are a **Domain Admin**, make sure to transfer administrative responsibilities to another user before deleting your account. See [Roles & Permissions](../settings/roles-permissions.md) for details on managing admin roles.
:::

:::info
Profile editing is disabled in demo mode. If you are using a demo account, you will not be able to make changes to your profile settings.
:::

## Next Steps

- [Managing Devices](./devices.md) -- View and manage your connected ChurchAppsPlayer devices

---

## reports/attendance-reports.md

# Attendance Reports



B1 Admin provides three attendance reports to help you understand how people are engaging with your services and groups. Each report offers a different perspective on your attendance data, from high-level trends to daily breakdowns.




#### Before You Begin

- Make sure attendance is being [tracked consistently](../attendance/tracking-attendance.md) for your services and groups
- Ensure your [groups](../groups/creating-groups.md) and services are configured in B1 Admin
- You need the appropriate [permissions](../settings/roles-permissions.md) to access reports



## Attendance Trend

The Attendance Trend report shows how attendance changes over time for your services.

1. Navigate to **Reports** and click the **Attendance Trend** card.
2. Set the **date range** to define the time period.
3. Select a **service** or **group** to filter the results.
4. The report displays a trend line showing attendance counts over the selected period.

This report is useful for spotting patterns like seasonal dips, growth trends, or the impact of special events.

## Group Attendance

The Group Attendance report shows attendance totals by group for a selected date range.

1. Navigate to **Reports** and click the **Group Attendance** card.
2. Set the **date range** for the report.
3. Select the **group(s)** you want to review.
4. The report displays total attendance figures for each group.

Use this report to compare attendance across groups and identify which groups are growing or need attention.

## Daily Group Attendance

The Daily Group Attendance report provides a day-by-day breakdown of attendance data for your groups.

1. Navigate to **Reports** and click the **Daily Group Attendance** card.
2. Set the **date range** for the report.
3. Select the **group(s)** you want to review.
4. The report shows attendance numbers for each individual day within the range.

This report gives you granular detail, which is helpful for understanding week-to-week variation or identifying specific days with unusually high or low attendance.

:::tip
Use the Attendance Trend report for a high-level overview and the Daily Group Attendance report when you need to drill into specific dates.
:::

## Practical Uses

- **Planning** -- Use attendance trends to plan seating, staffing, and resources for upcoming services.
- **Outreach** -- Identify declining attendance patterns early so you can follow up with members.
- **Board reports** -- Include attendance data in your regular leadership reports to show ministry health.
- **Event evaluation** -- Compare attendance before and after special events to measure their impact.

:::warning
Attendance data is recorded through your group and service check-in processes. If attendance is not being tracked consistently, your reports will not accurately reflect actual participation. See [Tracking Attendance](../attendance/tracking-attendance.md) for setup instructions.
:::

---

## reports/audit-log.md

# Audit Log



The audit log tracks all significant actions and changes across your church management system. Use it to review login activity, track who made changes to people records, monitor permission updates, and maintain accountability across your team.




#### Before You Begin

- B1 Admin account with server admin access
- Navigate to **Settings** to find the Audit Log



## Viewing the Audit Log

1. Go to **Settings** in B1 Admin.
2. Select **Audit Log**.
3. The log displays recent entries in a table with the following columns:
   - **Date** -- When the action occurred.
   - **Category** -- The type of action (color-coded for quick scanning).
   - **Action** -- What was done (e.g., create, update, delete, login_success).
   - **Entity** -- The type and ID of the record that was affected.
   - **IP Address** -- The IP address of the user who performed the action.
   - **Details** -- A summary of the specific changes made.

## Filtering the Log

Use the filters at the top of the page to narrow down the results:

- **Category** -- Filter by action type:
  - **All Categories** -- Show everything.
  - **Login** -- Login successes and failures.
  - **People** -- Creating, updating, or deleting person records.
  - **Permissions** -- Permission grants and revocations.
  - **Donations** -- Donation record changes.
  - **Groups** -- Group management actions.
  - **Forms** -- Form submission activity.
  - **Settings** -- Configuration changes.
- **Start Date** -- Show entries from this date forward.
- **End Date** -- Show entries up to this date.

Click **Search** after setting your filters to update the results.

## Understanding Categories

Each category is color-coded for quick identification:

- **Login** -- Blue chip. Tracks successful and failed login attempts.
- **People** -- Purple chip. Tracks person record creates, updates, and deletes.
- **Permissions** -- Red chip. Tracks when access rights are granted or revoked.
- **Donations** -- Green chip. Tracks donation record changes.
- **Groups** -- Gray chip. Tracks group management operations.
- **Forms** -- Orange chip. Tracks form submission activity.
- **Settings** -- Yellow chip. Tracks configuration changes.

## Exporting the Log

When log entries are displayed, a **CSV download** button appears. Click it to export the current filtered results to a spreadsheet for offline review or record-keeping.

## Pagination

Use the pagination controls at the bottom of the table to navigate through results. You can display 25, 50, or 100 entries per page.

:::info
Audit log entries are automatically retained for one year. Entries older than 365 days are removed to keep the system performant.
:::

:::tip
Review the audit log regularly, especially after onboarding new team members or making significant configuration changes. It helps identify unexpected activity early.
:::

## Related Articles

- [Roles & Permissions](../settings/roles-permissions) -- Manage who has access to what
- [Data Security](../settings/data-security) -- Understand how your data is protected
- [Reports Overview](./index.md) -- See all available reports

---

## reports/birthday-report.md

# Birthday Report



The Birthday Report helps you stay connected with your congregation by showing members with upcoming birthdays. Use it to plan celebrations, send cards, or make announcements during services.




#### Before You Begin

- Ensure birth dates are entered on each person's profile. See [Adding People](../people/adding-people.md) for details.
- You need the appropriate [permissions](../settings/roles-permissions.md) to access reports



## Running the Report

1. Navigate to **Reports** from the main menu.
2. Click the **Birthday Report** card.
3. Set the **date range** using the date filters to define which birthdays you want to see.
4. The report will display a list of members with birthdays in that range.

## What the Report Shows

The Birthday Report displays:

- **Member name** -- The person's name from your church database.
- **Birth date** -- The date of their birthday.

Results are listed within the date range you selected, making it easy to see who has a birthday coming up.

## Practical Uses

- **Weekly announcements** -- Run the report for the upcoming week and include birthdays in your bulletin or announcements.
- **Birthday cards** -- Generate a list for the month and have your team send personal birthday cards.
- **Small group leaders** -- Group leaders can run the report to remember birthdays of members in their group.
- **Milestone celebrations** -- Filter for specific date ranges to plan milestone birthday celebrations.

:::tip
Run this report at the beginning of each month to plan ahead. You can set the date range to cover the entire month so you have time to prepare cards or announcements.
:::

:::info
Birthday data comes from the birth date field on each person's profile. Make sure your [membership records](../people/adding-people.md) are up to date for accurate results.
:::

---

## reports/donation-summary.md

# Donation Summary



The Donation Summary report gives you a clear picture of your church's giving activity. Use it to track donation totals, monitor giving trends, and prepare financial reports for your leadership team.




#### Before You Begin

- Ensure donations are being [recorded consistently](../donations/recording-donations.md) in your system
- You need the appropriate [permissions](../settings/roles-permissions.md) to access financial reports



## Running the Report

1. Navigate to **Reports** from the main menu.
2. Click the **Donation Summary** card.
3. Set the **date range** to define the reporting period.
4. Apply additional filters such as **fund** or other criteria to narrow the results.
5. The report will display the giving summary for the selected period.

## What the Report Shows

The Donation Summary report includes:

- **Total donations** -- The overall giving amount for the selected period.
- **Donor count** -- The number of unique donors who contributed.
- **Amounts by fund** -- A breakdown of giving across different funds, if applicable.

## Practical Uses

- **Financial planning** -- Review giving trends to forecast future income and plan your budget.
- **Board reports** -- Generate summaries for regular board or leadership meetings with clear giving data.
- **Year-end reviews** -- Run the report for the full year to prepare annual financial summaries.
- **Campaign tracking** -- Filter by fund to track progress on special giving campaigns or building projects.
- **Seasonal analysis** -- Compare giving across different periods to understand seasonal patterns.

:::tip
Run this report monthly to stay informed about your church's financial health. Comparing month-over-month data helps you spot trends early.
:::

:::warning
Donation data comes from recorded contributions in your system. Make sure donations are entered consistently -- whether through online giving, check processing, or manual entry -- for the most accurate reports. See [Recording Donations](../donations/recording-donations.md) for details.
:::

---

## reports/index.md

# Reports



The Reports page gives you quick access to pre-built reports that help you understand your church data. Use these reports to track attendance trends, monitor giving activity, and stay connected with your congregation through birthday celebrations.



## Available Reports

The Reports page displays report cards for each available report. Click any card to open the report with its filters.

- **[Birthday Report](./birthday-report)** -- View upcoming birthdays for your congregation members.
- **[Attendance Trend](./attendance-reports)** -- See how attendance patterns change over time across your services.
- **[Group Attendance](./attendance-reports)** -- View attendance totals by group for a selected date range.
- **[Daily Group Attendance](./attendance-reports)** -- Get a day-by-day breakdown of group attendance data.
- **[Donation Summary](./donation-summary)** -- Review giving totals and trends for financial planning.
- **[Audit Log](./audit-log)** -- Track all changes and actions across your church management system (found under Settings > Audit Log).

## Using Reports

1. Navigate to **Reports** from the main menu.
2. Click on a **report card** to open it.
3. Use the **filters** at the top of each report to narrow the data by date range, group, service, or other criteria.
4. Review the results displayed in the report.

:::tip
Run reports regularly to stay on top of attendance trends, upcoming birthdays, and giving patterns. This data helps you plan ministries and outreach more effectively.
:::

:::info
Report data depends on consistent data entry. Make sure your team is [tracking attendance](../attendance/tracking-attendance.md), [recording donations](../donations/recording-donations.md), and keeping [people records](../people/adding-people.md) up to date for the most accurate results.
:::

## Learn More

- [Birthday Report](./birthday-report) -- Finding and using birthday data.
- [Attendance Reports](./attendance-reports) -- Understanding the three attendance reports.
- [Donation Summary](./donation-summary) -- Reviewing giving data and financial summaries.
- [Audit Log](./audit-log) -- Tracking system activity and changes.

---

## sermons/bulk-import.md

# Bulk Import



The Bulk Import page lets you quickly populate your sermon library by importing videos from YouTube or Vimeo. This is the fastest way to bring in your existing sermon content rather than adding each video one at a time.




#### Before You Begin

- You need the **contentApi.streamingServices.edit** permission. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](playlists) to import your sermons into
- Have your YouTube Channel ID or Vimeo account information ready



## Choosing Your Source

1. In the B1 Admin, click **Sermons** in the left sidebar, then click the **Bulk Import** tab.
2. You will see two clickable cards:
   - **YouTube** (red) -- Import videos from a YouTube channel
   - **Vimeo** (blue) -- Import videos from a Vimeo account
3. Click the card for the platform where your sermons are hosted.

:::tip
You can go back and switch sources at any time if you have videos on both platforms.
:::

## Before You Import

Before importing videos, you need at least one playlist to organize them into. If you have not created any playlists yet:

1. Click the **Playlists** tab.
2. Click **Create First Playlist** and fill in the name, description, publish date, and thumbnail.
3. Click **Save**, then return to the **Bulk Import** tab.

See [Playlists](playlists) for detailed instructions on creating and managing playlists.

## Importing Videos

1. After selecting YouTube or Vimeo, enter your **YouTube Channel ID** or **Vimeo account information** in the field provided.
2. Click the **Fetch** button to retrieve all available videos from your channel or account.
3. After fetching, you will see a list of all your videos with checkboxes.
4. Check the boxes next to the videos you want to import. You can select all or pick specific ones.
5. Optionally, enable **Auto Import New Videos** to automatically add future uploads to your library.
6. Click the **Import Into Playlist** dropdown to choose which playlist these videos should be added to.
7. Click the **Import** button to complete the bulk import.

Your videos will be imported with all their details, including titles, descriptions, dates, and thumbnails.

:::info
Bulk import is ideal for getting started when you are migrating from another platform. For adding individual sermons going forward, use the [Managing Sermons](managing-sermons) page instead.
:::

## Next Steps

- [Managing Sermons](managing-sermons) -- Edit imported sermon details
- [Playlists](playlists) -- Create and manage sermon series
- [Live Streaming](live-streaming) -- Set up live streaming for your services

---

## sermons/index.md

# Sermons



The Sermons section in B1 Admin lets you manage your church's sermon library and live streaming. You can add individual sermons, organize them into playlists, configure live stream schedules, and import existing content in bulk from YouTube or Vimeo.



:::info
To access the Sermons section, you need the **contentApi.streamingServices.edit** permission. If you do not see Sermons in your menu, ask your church administrator to grant you the appropriate role. See [Roles & Permissions](../settings/roles-permissions.md) for details on managing permissions.
:::

## What You Can Do

The Sermons section is organized into four main areas:

### Sermons

Add and manage individual sermon entries in your library. Each sermon can include a title, speaker, date, description, thumbnail, and links to video or audio content. You can link sermons to YouTube, Vimeo, Facebook, or custom video URLs. See [Managing Sermons](managing-sermons) for full details.

### Playlists

Organize your sermons into series or collections. Playlists make it easy for your congregation to browse through a sermon series in order. Each playlist has its own name, description, and thumbnail. See [Playlists](playlists) for more information.

### Live Stream Times

Configure your church's live streaming schedule. Set up recurring weekly services or one-time events, manage chat and video settings, and control when your stream goes live. Visitors will see the next scheduled service time on your streaming page. See [Live Streaming](live-streaming) for setup instructions.

### Bulk Import

Quickly populate your sermon library by importing videos in bulk from YouTube or Vimeo. This is the fastest way to migrate your existing sermon content into B1. See [Bulk Import](bulk-import) to get started.

:::tip
If you are setting up sermons for the first time, start by creating a [playlist](playlists), then either [add sermons individually](managing-sermons) or [import them in bulk](bulk-import) from YouTube or Vimeo.
:::

## Next Steps

- [Managing Sermons](managing-sermons) -- Add and edit individual sermons
- [Playlists](playlists) -- Organize sermons into series
- [Live Streaming](live-streaming) -- Set up your live stream schedule and settings
- [Bulk Import](bulk-import) -- Import sermons from YouTube or Vimeo

---

## sermons/live-streaming.md

# Live Streaming



The Live Stream Times page lets you configure your church's streaming schedule, manage service times, and customize the viewer experience. Set up recurring weekly services or one-time events, configure chat and video settings, and control when your stream goes live.




#### Before You Begin

- You need the **contentApi.streamingServices.edit** permission. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Have your YouTube Channel ID ready if you plan to use automated live streaming
- Add at least one [sermon](managing-sermons) or permanent live URL to use as your stream source



The page has two main tabs: **Services** for managing your live stream schedule and **Settings** for configuring your streaming page.

## Managing Services

### Adding a Service

1. In the B1 Admin, click **Sermons** in the left sidebar, then click the **Live Stream Times** tab.
2. Click the **Add Service** button to create a new scheduled service.
3. Enter a **Service Name** (for example, "Sunday Morning").
4. Set the **Service Time** -- choose the day and time your service begins.
5. Set **Recurs Weekly** to **Yes** for regular weekly services, or **No** for a one-time event.

### Configuring Chat and Video Settings

6. Under **Chat Settings**, set how many minutes before and after the service the chat should be enabled. This lets visitors start chatting before service begins and continue afterward.
7. Under **Video Settings**, set how early to start the video stream for countdown or pre-service content.
8. Select which sermon to play from the dropdown:
   - **Latest Sermon** -- Automatically plays your most recently added video.
   - **Current Live Service** -- Plays your current live stream from YouTube using your Channel ID.
   - You can also choose any specific sermon you have already saved.
9. Click **Save** to schedule your service.

:::info
Your service will automatically update each week if set to recurring. You can add as many services as you need. Visitors will see the next scheduled service time when they visit your streaming page.
:::

## Streaming Page Settings

Click the **Settings** tab to customize the tabs and links that appear alongside your live stream.

### Adding Tabs

1. Click the **Add** button to add a new tab to your live stream page.
2. Choose the **Chat** pre-designed tab or add a custom tab with an external URL.
3. For the Chat tab, just give it a name in the **Tab Text** box and the setup is complete.
4. For a linked tab, enter the tab name, choose an icon by clicking the icon button, and enter the URL.
5. Your configured tabs will appear on the live streaming page for viewers to access additional resources and interactive features.

### Previewing Your Stream

Click the **View Your Stream** button to see exactly how your live streaming page will look to visitors, including your logo, service times, and configured tabs.

## Setting Up Your YouTube Live Stream

To connect your YouTube channel for automatic live streaming:

1. Go to **Sermons** and click **Add Sermon**, then select **Add Permanent Live URL**.
2. The video provider defaults to **Current YouTube Live Stream**. Enter your **YouTube Channel ID**.
3. Add a title and description, then click **Save**.
4. In **Live Stream Times**, create a service and select your permanent live URL from the sermon dropdown.

:::tip
To find your YouTube Channel ID, go to your YouTube channel's advanced settings and copy the Channel ID value.
:::

## Customizing Colors and Logo

Your live stream page uses your website's [Appearance](../website/appearance) settings:

- The **light accent color** with dark text is used for the header.
- The **dark accent color** with light text is used for the sidebar.
- Your **Light Background Logo** appears on the streaming page. Use an image with a transparent background and a 4:1 aspect ratio.

To change these, go to **Website** then **Appearance** and update your [Color Palette](../website/appearance#color-palette) and [Logo](../website/appearance#logo-and-branding) settings.

## Adding Streaming Hosts

To give team members access to the host-only chat alongside the public chat:

1. Go to **Settings** in the left sidebar and click **Roles**.
2. Click the plus button and select **Add Custom Role**.
3. Name the role "Streaming Host" and click **Save**.
4. Click the new role, then click **Add** in the Members section to add people.
5. Scroll down to **Edit Permissions**, expand the **Content** section, and check **Host Chat**.

When hosts log into the live stream page, a private **Host Chat** tab appears alongside the public chat for staff-only conversation during the broadcast.

:::info
For more details on creating roles and managing permissions, see [Roles & Permissions](../settings/roles-permissions.md).
:::

## Troubleshooting

If your automated YouTube live stream is not displaying correctly when using the "Current YouTube Live Stream" option with your Channel ID, try the following:

**Symptoms:**
- The live stream embed shows "Video unavailable"
- The page loads but no video appears
- Direct YouTube embeds work, but the automated channel live stream does not

**Solution:**
Check your YouTube channel for old or upcoming scheduled live streams and delete them:

1. Go to your YouTube Studio.
2. Navigate to **Content** then **Live**.
3. Look for any old scheduled lives or upcoming scheduled streams.
4. Delete these old or scheduled live stream entries.
5. Test your live stream page again.

:::warning
YouTube's automated channel live stream embed can be blocked when there are multiple scheduled or past live stream entries in your channel. Removing these allows YouTube to properly identify and serve your current live stream.
:::

**Additional requirements:**
- Your live stream must be set to **Public** (not Unlisted or Private).
- Embedding must be allowed in your YouTube stream settings.
- Make sure you are using the **Current YouTube Live Stream** provider (with Channel ID), not the **YouTube** provider (with Video ID).

## Next Steps

- [Managing Sermons](managing-sermons) -- Add sermons to your library
- [Playlists](playlists) -- Organize sermons into series

---

## sermons/managing-sermons.md

# Managing Sermons



The Sermons page displays your entire sermon library. From here you can add new sermons, edit existing entries, and organize your content by playlist. Each sermon can link to video or audio hosted on YouTube, Vimeo, Facebook, or a custom URL.




#### Before You Begin

- You need the **contentApi.streamingServices.edit** permission. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Create at least one [playlist](playlists) to organize your sermons into
- Have your video IDs or URLs ready from YouTube, Vimeo, or Facebook



## Viewing Your Sermon Library

1. In the B1 Admin, click **Sermons** in the left sidebar.
2. The Sermons page shows all your sermon entries, organized by playlist. Each sermon displays its thumbnail, title, and date.
3. Click on any sermon to view or edit its details.

## Adding a Sermon

1. Click the **Add Sermon** button in the top right corner and select **Add Sermon** from the dropdown.
2. Select a **Playlist** to assign the sermon to.
3. Choose your **Video Provider** -- YouTube, Vimeo, Facebook, or Custom URL. We recommend YouTube as it works best with the B1 system.
4. Enter the video ID or URL and click **Fetch**. For YouTube, the video ID is the string of characters after `v=` in the YouTube URL.
5. When you click **Fetch**, the sermon details are imported automatically, including the publish date, duration, title, description, and thumbnail.
6. Make any changes you want and click **Save**.

:::tip
You can also add a permanent live stream URL by selecting **Add Permanent Live URL** from the **Add Sermon** dropdown. This creates a persistent connection to your YouTube channel's live stream using your Channel ID. See [Live Streaming](live-streaming) for more details.
:::

## Editing a Sermon

1. Click on any sermon in your library to open its details.
2. Update the title, speaker, date, description, thumbnail, or media links as needed.
3. Click **Save** to apply your changes.

## Sermon Details

Each sermon entry can include:

- **Title** -- The sermon name displayed to visitors
- **Speaker** -- Who delivered the sermon
- **Date** -- The publish or delivery date
- **Description** -- A summary of the sermon content
- **Thumbnail** -- A preview image shown in your sermon library
- **Video/Audio Links** -- URLs to the sermon media on YouTube, Vimeo, Facebook, or a custom host

## Scheduling a Sermon for Live Stream

After adding a sermon, you can schedule it for broadcast on your live stream page:

1. Go to the **Live Stream Times** tab.
2. Edit a service and under **Video Settings**, select your sermon from the dropdown.
3. The sermon will play at the scheduled service time.

:::info
For importing multiple sermons at once instead of adding them one by one, use the [Bulk Import](bulk-import) tool to pull videos directly from your YouTube or Vimeo account.
:::

## Next Steps

- [Playlists](playlists) -- Organize sermons into series
- [Live Streaming](live-streaming) -- Configure your streaming schedule
- [Bulk Import](bulk-import) -- Import multiple sermons at once

---

## sermons/playlists.md

# Playlists



Playlists let you organize your sermons into series or collections. When visitors browse your sermon library on your B1.church website, playlists help them find and follow along with a complete sermon series in the right order.




#### Before You Begin

- You need the **contentApi.streamingServices.edit** permission. See [Roles & Permissions](../settings/roles-permissions.md) if you do not have access.
- Have a name, description, and thumbnail image ready for your playlist



## Viewing Playlists

1. In the B1 Admin, click **Sermons** in the left sidebar.
2. Click the **Playlists** tab at the top of the page.
3. You will see a list of all your existing playlists with their names and descriptions.

## Creating a Playlist

1. Click the **Create First Playlist** button (if you have no playlists yet) or click **Add Playlist**.
2. Enter a **name** for the playlist -- for example, the sermon series title like "Faith Foundations" or "Summer in the Psalms."
3. Add a **description** to give visitors a brief overview of the series.
4. Set a **publish date** to control when the playlist becomes visible.
5. Upload a **thumbnail image** to represent the series visually.
6. Click **Save** to create your playlist.

:::tip
Create your playlists first before adding sermons. This way you can assign each sermon to the correct playlist as you go, rather than reorganizing later.
:::

## Adding Sermons to a Playlist

When you [add or edit a sermon](managing-sermons), you assign it to a playlist using the **Playlist** dropdown. All sermons assigned to the same playlist are grouped together and displayed in order on your website.

:::info
You can also assign sermons to playlists during [Bulk Import](bulk-import). When importing from YouTube or Vimeo, select a playlist from the **Import Into Playlist** dropdown before clicking **Import**.
:::

## How Playlists Appear on Your Website

Playlists are displayed on your B1.church website as browsable collections. Visitors can:

- See all available sermon series at a glance
- Click into a playlist to view all sermons in that series
- Watch or listen to sermons in order

## Next Steps

- [Managing Sermons](managing-sermons) -- Add individual sermons to your playlists
- [Bulk Import](bulk-import) -- Import multiple sermons and assign them to playlists

---

## serving/automations.md

# Automations



Automations create tasks automatically on a recurring schedule. Instead of manually creating the same tasks every week or month, you can set up an automation once and let the system handle it for you, ensuring nothing falls through the cracks.




#### Before You Begin

- Familiarize yourself with how [Tasks](./tasks.md) work in B1 Admin
- Identify which recurring responsibilities you want to automate



## Viewing Automations

Navigate to **Serving** and open the **Automations** page. You will see a list of all your automations, each showing its title, active status, and recurrence pattern.

## Creating an Automation

1. On the Automations page, click **Add Automation**.
2. Enter a **title** for the automation. This will also be used as the title of the tasks it creates.
3. Set the **recurrence pattern** -- choose how often the task should be created (for example, weekly, monthly, or on specific days).
4. Assign the task to a **person or group** who will be responsible each time it runs.
5. Set the automation to **Active** so it begins creating tasks on schedule.
6. Click **Save**.

## Editing an Automation

1. Click on an existing automation in the list to open it.
2. Update the title, recurrence pattern, assignment, or any other settings.
3. Click **Save** to apply your changes.

## Activating and Deactivating

You can control whether an automation is running without deleting it:

- **Active** -- The automation will create tasks according to its schedule.
- **Inactive** -- The automation is paused and will not create any new tasks until you reactivate it.

:::tip
Set an automation to **Inactive** during holiday breaks or special seasons when the recurring task is not needed. You can reactivate it at any time without losing your configuration.
:::

## How It Works

When an automation runs, it creates a new [task](./tasks.md) with the configured title and assignment. The task behaves just like any other task -- assignees receive notifications and can manage the task from their dashboard or the Tasks page.

:::info
Automations only create new tasks going forward. They do not retroactively create tasks for past dates.
:::

## Next Steps

- Learn more about managing individual [Tasks](./tasks.md) that automations create
- Use automations alongside [Service Plans](./plans.md) to keep your weekly service preparation on track

---

## serving/index.md

# Serving



The Serving section is your hub for coordinating volunteers and planning church services. Whether you are organizing Sunday worship, midweek gatherings, or special events, this is where you bring everything together so your teams know exactly who is serving and when.



## How the Serving Page Works

When you open the **Serving** page, you will see your ministries displayed as tabs across the top. Each ministry has its own plan types and teams, so you can manage multiple ministries independently. For example, you might have separate tabs for Worship, Kids Ministry, and Hospitality.

Non-admin staff who are members of a ministry can also access the Serving page. They will see only the ministries they belong to and can create and edit plans, assignments, plan types, and the service order for their ministry without needing full admin permissions.

:::tip
If you are an admin, toggle **Show All** to view all ministries at once. This is helpful when you need to check assignments across multiple teams.
:::

## Sub-Sections

The Serving section includes three key areas:

- **[Plans](./plans.md)** -- Create service plans for specific dates and assign volunteers to teams. Plans help you organize who is serving when, so everyone knows their role ahead of time. Use the **[Plans Overview](./plans-overview.md)** to see all upcoming assignments across multiple weeks in one grid.
- **[Songs](./songs.md)** -- Manage your worship song library with lyrics, arrangements, and external links. Your worship team can use this to prepare for upcoming services.
- **[Tasks](./tasks.md)** -- Assign and track tasks for your team members. Set up [Automations](./automations.md) to create recurring tasks automatically, so nothing falls through the cracks.

## Getting Started

1. Navigate to **Serving** from the main menu in B1 Admin.
2. Click the add ministry button to create a new ministry or toggle "show all" to view existing ministry tabs. Select a **ministry tab** to view its plan types and teams.
3. Choose "create a plan type" or choose an existing plan type to start [creating service plans](./plans.md), or explore the [Songs](./songs.md) and [Tasks](./tasks.md) sub-sections.

:::info
Before you can create plans, you will need to create your Ministries in the Serving area and Teams within each Ministry . 
:::

---

## serving/plan-validation.md

# Plan Validation & Volunteer Notifications



B1 Admin automatically checks your plans for problems before Sunday — unfilled positions, scheduling conflicts, and volunteers who have blocked out the date. When everything looks good, you can notify your whole team with a single click.




#### Before You Begin

- Create a [service plan](./plans.md) and assign volunteers to positions
- Add [service times](./plans.md) to the plan so conflict detection can check for overlaps
- Make sure volunteers have the B1 Mobile app installed to receive push notifications



## The Validation Panel

Every plan has a **Validation** panel that runs automatically as you build it. It checks three things:

### Unfilled Positions
If a position requires more people than are currently assigned, the validation panel lists exactly what is still needed — for example, *"Sound Tech: 1 more person needed."* You can see at a glance whether your plan is fully staffed before the week arrives.

### Scheduling Conflicts
If a volunteer is assigned to two positions that overlap in time within the same plan, the validation panel flags the conflict — for example, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* This catches double-bookings before they become a Sunday morning problem.

### Blockout Dates
Volunteers can set dates they are unavailable in B1 Mobile. If someone is assigned to a plan that falls within one of their blockout dates, the validation panel surfaces the conflict automatically so you can find a replacement.

### Cross-Plan Conflicts
The validation also checks across all your plans at once. If the same volunteer is assigned in two different plans that overlap in time — for example, a 9am service and a 10am service that both run until 10:30am — B1 Admin will flag that person as double-booked across plans.

:::tip
You don't need to do anything to run validation — it updates automatically every time you add or change an assignment. Just keep an eye on the panel as you build the plan.
:::

## Notifying Volunteers

Once your plan is set, you can notify all assigned volunteers at once directly from the validation panel.

1. Open the plan and scroll to the **Validation** panel
2. If there are unnotified volunteers, you will see a link showing how many need to be notified (e.g., *"Notify 8 volunteers"*)
3. Click the link to send push notifications to everyone who hasn't been notified yet
4. Volunteers receive a notification on their phone letting them know they have been scheduled and prompting them to confirm their assignment

:::info
Only volunteers who have not yet been notified will be included. If you add someone to the plan later, the link will reappear so you can notify the new addition without re-notifying the rest of the team.
:::

:::warning
Volunteers must have the B1.church mobile experience installed (PWA on their home screen, or the deprecated B1 Mobile native app for users who still have it) with notifications enabled to receive push notifications. See [Installing as an App (PWA)](/docs/b1-church/getting-started/installing-pwa) for setup instructions.
:::

## Related Articles

- [Service Plans](./plans.md)
- [Automations](./automations.md)
- [Installing the B1.church PWA](/docs/b1-church/getting-started/installing-pwa)

---

## serving/plans-overview.md

# Plans Overview



The Plans Overview gives you a bird's-eye view of all your volunteer assignments across multiple service dates at once. Instead of opening each plan individually, you can see who is serving in every position across upcoming weeks in a single grid — and quickly spot any gaps that still need to be filled.




#### Before You Begin

- Create at least one Ministry and Plan Type in the Serving area
- Create [service plans](./plans.md) with dates and volunteer assignments
- Ensure your volunteers have been added to your [people directory](../people/adding-people.md)



## Accessing the Overview

1. Navigate to **Serving** from the main menu in B1 Admin.
2. Select a **ministry tab** at the top of the page.
3. Click on a **plan type** to open its plan list.
4. Click the **Overview** button near the top of the page.

## Reading the Overview Grid

The overview displays a grid where:

- **Rows** represent each position (e.g., "Music: Guitar", "Tech: Projection") grouped by category
- **Columns** represent upcoming service dates (e.g., "Apr 14", "Apr 21")
- **Cells** show the name of the volunteer assigned to that position on that date

Positions highlighted in **red** are unfilled — no volunteer has been assigned yet. This makes it easy to see staffing gaps at a glance without opening each plan individually.

:::tip
Volunteer names are shown in a shortened format (first name and last initial, e.g., "John D.") to keep the grid compact when you have many positions.
:::

## Filtering the Overview

You can adjust what the overview shows using the filter controls at the top:

- **Start Date / End Date** — By default the overview shows 12 weeks into the future. Enter custom dates to expand or narrow the range.
- **Ministry** — Switch to a different ministry without leaving the overview.
- **Plan Type** — Filter to a specific plan type within the selected ministry.

Click **Filter** after making changes to update the grid.

## Exporting to CSV

Click **Export CSV** to download the current grid as a spreadsheet. The export includes all positions and volunteer assignments for the filtered date range, making it easy to share with ministry leaders or print for planning meetings.

:::info
The CSV export reflects whatever filters are currently applied — only the dates and plan type shown in the grid are included in the download.
:::

## Related Articles

- [Service Plans](./plans.md) — Create and manage individual service plans
- [Service Order](./service-order.md) — Build the order of service within a plan
- [Scheduling Lessons](./scheduling-lessons.md) — Schedule lessons alongside your service plans

---

## serving/plans.md

# Service Plans



Service plans organize who is serving and when. Each plan is tied to a specific date and ministry, making it easy to coordinate your volunteer teams week by week and ensure every service is fully staffed.




#### Before You Begin

- Set up your ministries and teams in the Serving area
- Make sure volunteers have been added to your [people directory](../people/adding-people.md) and assigned to teams



## Accessing Plans

1. Navigate to **Serving** from the main menu.
2. Select a **ministry tab** at the top of the page.
3. Click on a **plan type** to see the list of plans for that type.
4. Click on a specific plan to open it.

:::info
Full admin access is not required to manage plans. Anyone who is a member of a ministry can navigate to Serving and create, edit, and schedule plans for their own ministry without needing the Plans Edit permission. Editors with the Plans Edit role can manage plans across every ministry.
:::

## Creating a Plan

1. From the plan type view, click **New Plan**.
2. Give the plan a name or use the date as the name. Select the **date** for the service.
3. If you would like to copy from a previous plan, choose positions only or positions and assignments. If you do not want to copy, just choose nothing. You can also copy the order of service from my previous plan.
4. Save the plan. You can now begin assigning team members and building out the [service order](./service-order.md).

## The Plan Detail Page

When you open a plan, you will see two tabs:

- **Assignments** -- Manage which team members are assigned to this plan. You can add people from your existing teams and see who has confirmed or is still pending.
- **[Service Order](./service-order.md)** -- Build the order of service with elements like worship songs, prayers, announcements, and the sermon.

## Assigning Team Members

1. Open a plan and go to the **Assignments** tab.
2. Click on **add Position** to expand it. Fill out the information in the add a position form. For category name add whatever category you like.
3. Click on **People Needed** and choose volunteers to fill that position.
4. Add members from your team roster by clicking **Add**.
5. Assigned members will appear under their team with their assignment status.
6. Click notify volunteers to notify them within the B1 app or via email.

:::tip
Set up your teams in the ministry settings before creating plans. This way, you will have a ready pool of volunteers to assign from.
:::

## Associating Groups with a Plan Type

Below the plan list on the plan type page, the **Groups** section lets you decide which groups can see the plans for this plan type from their member portal. This is a quick way to surface upcoming services to the right teams without giving them admin access.

1. On the plan type page, scroll down to the **Groups** section.
2. Click **Add Group** and pick a group from the dropdown.
3. In the **Shows** column, choose whether members of that group should see **Past**, **Future**, or **Both** plans for this plan type.
4. Repeat to associate additional groups, or click the trash icon to remove a group.

:::info
Only groups tagged as **Standard** appear in the picker. Members of an associated group automatically see this plan type's plans on the [Plans](/docs/b1-church/plans/) tab in the B1 member portal — limited to the past/future/both window you selected.
:::

## Printing Plans

You can print a plan for distribution to your team. Open the plan, Open the service order tab and use the **Print** option to generate a printable version that includes assignments and the service order. This is useful for handing out at rehearsals or posting in a common area.

:::info
Plans are organized by ministry. Make sure you are on the correct ministry tab before creating or viewing plans.
:::

## Next Steps

- Use the [Plans Overview](./plans-overview.md) to see all upcoming assignments across multiple weeks in one grid and spot unfilled positions
- Build out your [Service Order](./service-order.md) with songs, readings, and other elements
- Add [songs](./songs.md) from your library directly into the service order
- Use [Tasks](./tasks.md) to assign follow-up action items to team members

---

## serving/scheduling-lessons.md

# Scheduling Lessons from Lessons.church



B1 Admin integrates directly with [Lessons.church](https://lessons.church) so you can schedule curriculum for your classrooms right inside your service plans. This keeps everything — volunteers, assignments, and lesson content — in one place.




#### Before You Begin

- Set up your ministries in the Serving area
- Have an active [Lessons.church](https://lessons.church) account — sign up there first if your church doesn't have one yet



:::tip Follow a guided walkthrough
Want to see the full setup from start to finish? Our **step-by-step guide** covers linking providers, scheduling a lesson, and connecting FreePlay to your classroom TV — with short videos and written steps you can check off as you go.
:::

## Step 1 — Link Your Lessons.church Account

This is a one-time setup per ministry. You need to connect your Lessons.church account before you can browse and schedule content.

1. Log in to [B1 Admin](https://admin.b1.church/) and go to **Serving**
2. Open the ministry you want to connect (e.g., Children's Ministry)
3. Scroll down to the **Content Provider Accounts** section
4. Click **Link New Provider**
5. Select **Lessons.church** from the list
6. A device authorization screen will appear with a code
7. Go to [lessons.church](https://lessons.church), log in, and enter the code to authorize the connection
8. Once approved, you will see **"Account linked"** under Lessons.church in B1 Admin

:::info
The Content Provider Accounts section is per ministry. If you run multiple ministries (e.g., Children's and Youth), you will need to link Lessons.church for each one separately.
:::

## Step 2 — Schedule a Lesson

Once linked, you can schedule lessons directly from Plans.

1. In B1 Admin, go to **Serving → Plans**
2. Select your ministry tab and click **Add Plan Type** — give the plan type a name such as Children's Church or Sunday School
3. Click on the plan type you just made and click **Schedule Lesson** for one lesson or **bulk schedule** for a series of lessons.
3. Select the **date** for the lesson (defaults to the upcoming Sunday)
4. Click **Select Lesson** — a content browser dialog opens
5. At the top of the dialog, confirm **Lessons.church** is selected as the provider
6. Browse through the content:
   - Select a **Program** (e.g., "Bible Stories for Kids")
   - Select a **Study** within that program (e.g., "Creation and Early Stories")
   - Select the specific **Lesson**
   - Select the **Venue** — this is the age-group version of the lesson
7. Click **Associate Lesson** to confirm
8. Choose your **copy option** for volunteers:
   - **Nothing** — fresh plan, no volunteers carried over
   - **Positions Only** — copies volunteer roles from the previous plan but not who is assigned
   - **Positions and Assignments** — copies both roles and assigned volunteers *(most common)*
9. Click **Save**

The plan is created and named automatically (e.g., "Feb 23 - Elementary"). Volunteers can open the plan to see their assignments and review the lesson content before Sunday.

:::warning
Make sure to select the correct **Venue** for your classroom's age group. Choosing the wrong venue means your volunteers will see content designed for a different age level.
:::

:::tip
**Plan ahead** — You can schedule multiple weeks of lessons at once so your team can prepare in advance. Use the past lesson list in the plan view to avoid accidentally repeating content.
:::

## Customizing Lesson Content

Once a lesson is scheduled, you can tailor it for your specific classroom — remove sections that don't apply, hide roles your room doesn't use, or reorder the content to match your preferred flow. Customizations can be saved for just one classroom or applied across all classrooms at your church.

See the [Customizing Lessons](/docs/lessons-church/customization/customizing-lessons) guide for step-by-step instructions.

## Playing Lessons on a Classroom TV with FreePlay

Scheduling a lesson in B1 Admin pairs perfectly with **[FreePlay](/docs/freeplay/)** — ChurchApps' free media player for classroom TVs and Fire Sticks. When your plan is set up, FreePlay can pull the lesson content directly from Lessons.church and play it full-screen in the classroom. Your teacher controls the pace with a TV remote, advancing through videos and slides as the lesson flows.

This means your volunteers see the plan on their phones while the content plays on the room's TV — no separate setup, no USB drives, no last-minute scrambling.

[Learn how to connect FreePlay to a content provider →](/docs/freeplay/content-providers/connecting-providers)

## Don't See Your Curriculum Provider?

The list of available providers is growing. If your church uses a curriculum provider that isn't showing in B1 Admin yet, reach out to us and we'll work on getting them added.

Feel free to copy and send the message below directly to your curriculum provider — once they reach out to us we'll get the integration set up:

---

> **Subject: ChurchApps Integration Request**
>
> Hi [Curriculum Provider Team],
>
> We love your curriculum and use it every week with our kids. We also use ChurchApps to manage our volunteers and service plans, and we use FreePlay (freeplay.church) to play lesson content directly on our classroom TVs. It has been a game changer for our teachers.
>
> Right now we have to manage your curriculum separately, but if you were integrated with ChurchApps we could schedule your lessons right inside our service plans and play them through FreePlay on our classroom screens — all without leaving the tools we already use.
>
> ChurchApps already works with several curriculum providers and their team is ready to work with you too. Could you reach out to them at **support@churchapps.org** to get the conversation started? We'd love to see this happen!
>
> Thank you!

---

## Related Articles

- [Service Plans](./plans.md)
- [Service Order](./service-order.md)
- [Customizing Lessons](/docs/lessons-church/customization/customizing-lessons)
- [FreePlay — Playing Lessons on a Classroom TV](/docs/freeplay/classroom-mode/playing-lessons)
- [Lessons.church Scheduling Guide](/docs/lessons-church/classrooms/scheduling-lessons)

---

## serving/service-order.md

# Service Order



The service order defines the sequence of elements in your worship service. Use it to lay out everything from the opening song to the closing prayer, so your entire team knows the flow of the service ahead of time.




#### Before You Begin

- [Create a service plan](./plans.md) for the date you want to build a service order for
- Optionally, add [songs](./songs.md) to your library so you can link them directly into the service order



## Accessing the Service Order

1. Navigate to **Serving** and select your ministry.
2. Click on a **plan type**, then open a specific **plan**.
3. Click the **Service Order** tab on the plan detail page.

## Building Your Service Order

The service order is a list of items arranged in the sequence they will occur during the service. Common elements include:

- Worship songs
- Prayers
- Scripture readings
- Announcements
- Sermon or message
- Offering
- Closing

## Adding Items to the Service Order

1. On the **Service Order** tab, click **Add Item**.
2. Choose the type of element you want to add (for example, a song from your library, a custom item, or a heading).
3. Enter the details for the item, such as the title and any notes.
4. Click **Save**.

:::tip
You can add songs directly from your [Songs](./songs.md) library. This links the song details, including lyrics and arrangements, to your service plan so your worship team has everything they need.
:::

## Reordering Items

Drag and drop items to rearrange the order. The sequence shown on screen is the order your team will follow during the service.

## Editing and Removing Items

- Click on any item in the service order to **edit** its details.
- Use the **delete** option to remove an item from the order.

:::info
The service order is specific to each plan. Changes you make here only affect the selected plan and will not alter other plans or your song library.
:::

## Including Items in Specific Service Times

If your plan has more than one service time (for example, an 8 a.m. and 10 a.m. service), you can choose which services each item should appear in. This is useful when an announcement is only relevant to one service, or when a song is sung in one service but not another.

1. Open a plan that has two or more service times defined on the **Times** tab.
2. On the **Service Order** tab, click an item to edit it.
3. Under **Include in Services**, you will see a checkbox for each service time, labeled with the time.
4. Uncheck any service where the item should be skipped.
5. Click **Save**.

By default, every item is included in every service. Excluded service times are hidden when you print the plan filtered to that service, so each service receives a clean run sheet with only the relevant items.

:::tip
The **Include in Services** section only appears when the plan has more than one service time. If you only see one service, edit the plan's **Times** tab to add additional services first.
:::

## Sharing the Service Order

Once your service order is complete, you can print the full plan (including the service order) from the plan detail page. This gives your team a complete rundown of the service.

## Next Steps

- Manage your worship repertoire on the [Songs](./songs.md) page
- Assign volunteers to the service on the [Plans](./plans.md) Assignments tab
- Create [Tasks](./tasks.md) for any follow-up items related to the service

---

## serving/songs.md

# Songs



The Songs page manages your worship song library. Keep all your song details, lyrics, and arrangements in one place so your worship team can easily prepare for upcoming services and maintain a consistent repertoire.




#### Before You Begin

- Navigate to the **Serving** section in B1 Admin to access the Songs page
- Optionally, have your [service plans](./plans.md) set up so you can link songs directly into the [service order](./service-order.md)



## Browsing Your Song Library

When you open the **Songs** page, your songs are displayed as cards. Each card shows the song's thumbnail image, title, artist, and duration. Scroll through the library or use search to find what you need.

## Searching for Songs

1. Click the **Search** button on the Songs page.
2. Type a song **title** or **artist** name.
3. The results will filter as you type, showing matching songs from your library.

## Adding a Song

1. Click **Add Song** on the Songs page.
2. Search the external song database by title or artist.
3. Select the song you want to add.
4. The song will be added to your library with its basic details pre-filled.

:::tip
After adding a song, click on it to review and update its details, add arrangements, or attach external links like YouTube videos or chord charts.
:::

## Viewing and Editing a Song

Click on any song card to open its detail page. From here you can:

- **Edit song details** -- Update the title, artist, duration, and other metadata.
- **Manage arrangements** -- Each song can have multiple arrangements (for example, different keys or versions). Add, edit, or remove arrangements as needed.
- **Add lyrics** -- Enter or update the lyrics for each arrangement.
- **Set the key** -- Specify the musical key for each arrangement so your team knows how to prepare.
- **Add external links** -- Attach links to resources like YouTube videos, chord charts, or sheet music hosted elsewhere.

## Arrangements

A single song can have multiple arrangements to accommodate different services or team configurations. Each arrangement includes:

- **Lyrics** for display or projection
- **Key** designation
- **External links** to additional resources

:::info
Songs from your library can be added directly to a [Service Order](./service-order.md) within a plan, linking the song details and arrangements to that specific service.
:::

## Next Steps

- Add songs to your [Service Order](./service-order.md) when building out a [service plan](./plans.md)
- Coordinate with your worship team using [Tasks](./tasks.md) for song preparation and practice

---

## serving/tasks.md

# Tasks



Tasks let you assign action items to people or groups in your church. Whether it is a one-time to-do or a recurring responsibility, tasks help you track what needs to be done and who is responsible so nothing gets overlooked.




#### Before You Begin

- Make sure the people or [groups](../groups/creating-groups.md) you want to assign tasks to exist in B1 Admin
- Navigate to the **Serving** section to access the Tasks page



## Viewing Tasks

Navigate to **Serving** and open the **Tasks** page. You will see a list of your open tasks. Each task shows its title, assignee, and status.

:::tip
By default, only open tasks are shown. Toggle **Show Closed** to see completed tasks as well.
:::

## Creating a Task

1. On the Tasks page, click **Add Task**.
2. Enter a **title** for the task.
3. Click the **Assign To** box and type the name of a person, or switch to **Group** and type a group name.
4. Click **Search** and select the person or group from the results.
5. Add a **note** with any details or instructions for the assignee.
6. Click **Save**.

The task will now appear in the task list and will be visible to the assignee on their dashboard and mobile app.

## Managing a Task

Click on any task to open its detail page. From here you can:

- **Change the status** -- Switch between **Open** and **Closed** using the status dropdown.
- **Reassign the task** -- Update the assignee to a different person or group.
- **Add notes** -- Include additional information or updates for the assignee.
- **Edit the title** -- Update the task title as needed.

## Task Lifecycle

1. A new task starts with a status of **Open**.
2. The assignee receives a notification and can view the task from their dashboard, the Tasks page, or the mobile app.
3. Once the work is complete, the assignee (or an admin) changes the status to **Closed**.
4. Closed tasks are removed from the default view but can still be accessed by enabling **Show Closed**.

:::info
You can automate recurring tasks so they are created on a schedule. See [Automations](./automations.md) for details on setting this up.
:::

## Next Steps

- Set up [Automations](./automations.md) to create recurring tasks automatically
- Use tasks alongside [Service Plans](./plans.md) to track service preparation action items

---

## serving/tv-pairing.md

# Connecting a Classroom TV to Your B1 Admin Lessons



You can connect a classroom TV to your B1 Admin lessons using **FreePlay** — ChurchApps' free TV app for churches. Once connected, the TV displays the lesson content you have scheduled in B1 Admin, making it available for your teachers right on the classroom screen.




#### Before You Begin

- Schedule at least one lesson in B1 Admin (see [Scheduling Lessons](./scheduling-lessons.md))
- Install **FreePlay** on the TV or Fire Stick you want to use



## Step 1 — Install FreePlay on Your TV

Install the **FreePlay** app on your classroom display:

- **Amazon Fire Stick / Fire TV** — Search for **FreePlay** in the Amazon Appstore
- **Android TV / Google TV** — Search for **FreePlay** in the Google Play Store
- **Apple TV** — Search for **FreePlay** in the App Store

For full setup instructions see the [FreePlay Getting Started guide](/docs/freeplay/getting-started/).

## Step 2 — Connect B1.church as a Content Provider

1. Open the **FreePlay** app on the TV
2. Navigate to the **Content Providers** screen (select the **Providers** icon in the sidebar)
3. Find and select **B1.church** from the list of available providers
4. Follow the on-screen prompts to sign in with your B1 church credentials
5. FreePlay displays **Connected!** once the connection is successful

Once connected, B1.church appears in your FreePlay sidebar. FreePlay will pull the lesson content you have scheduled in B1 Admin so your teachers can play it directly on the classroom TV.

:::tip
After connecting, your teachers can use the TV remote to advance through videos and slides at their own pace as the lesson flows. No separate setup or USB drives needed.
:::

:::info
For detailed steps on authenticating with a content provider (QR code, form login, etc.), see [Connecting to Providers](/docs/freeplay/content-providers/connecting-providers).
:::

## Related Articles

- [Scheduling Lessons](./scheduling-lessons.md)
- [Service Plans](./plans.md)
- [FreePlay Overview](/docs/freeplay/)
- [FreePlay — Content Providers](/docs/freeplay/content-providers/)
- [FreePlay — Connecting to Providers](/docs/freeplay/content-providers/connecting-providers)

---

## settings/church-settings.md

# Church Settings



The Church Settings page is where you configure your church's basic information, contact details, and branding. These details are used across all ChurchApps tools, including your B1.church website and the B1 Mobile app.




#### Before You Begin

- You need the "Edit Church Settings" permission. See [Roles & Permissions](./roles-permissions.md) if you do not have access.
- Have your church's address, contact information, and logo ready



## Editing Your Church Information

1. Navigate to the **Settings** page in the left sidebar.
2. Click the **Edit Settings** button in the header.
3. Update any of the following fields:
   - **Church Name** -- The name displayed across all ChurchApps products.
   - **Address** -- Your church's physical address.
   - **Contact Information** -- Phone number, email, and other contact details.
4. Click **Save** to apply your changes.

## Setting Up Your Subdomain

Your church gets a free subdomain at **yourchurch.b1.church**. This is the web address where members and visitors can access your church's online presence.

1. On the Settings page, locate the **Subdomain** field.
2. Enter your preferred subdomain (for example, "gracechurch" for gracechurch.b1.church).
3. Save your changes.

:::info
Your subdomain must be unique across all ChurchApps churches. If your preferred name is taken, try adding your city or state (for example, "gracechurch-dallas").
:::

## Configuring Branding

Customize how your church appears across all ChurchApps tools:

1. Upload your **church logo** by clicking the logo area and selecting an image file.
2. Add any additional **church images** used on your website and [mobile app](./mobile-app.md).

:::tip
For best results, use a logo with a transparent background in PNG format. This ensures it looks great on both light and dark backgrounds.
:::

## Import and Export

The **Import/Export** button in the Settings header opens a dedicated tool in a new browser window. Use this to:

- Import member data from another church management system.
- Export your ChurchApps data for backup or migration purposes.

This is especially helpful when you are first setting up your church and need to transfer existing records into ChurchApps.

:::warning
When importing data, always back up your existing records first. Import operations add data to your system and may create duplicate entries if run multiple times.
:::

---

## settings/data-security.md

# Data Security



While there is no such thing as a perfectly secure system, ChurchApps takes data security seriously. This page explains the measures taken to protect all data entered into B1.church Admin and other ChurchApps products.




#### Before You Begin

- Review this page to understand how your church's data is protected
- Set up [Roles & Permissions](./roles-permissions.md) to control who can access sensitive information
- Familiarize yourself with the [privacy policy](https://churchapps.org/privacy)



## Limiting Sensitive Data Stored

Our first approach is to not store any more sensitive data than necessary. This means never storing any credit card or bank account details used for making donations. When a user makes a donation using B1.church Admin or B1, the credit card data is never transmitted to any of our servers, only your payment gateway (Stripe). This means in the event of a data breach, no credit card or bank info would be compromised.

We also never store passwords in our system. All passwords are processed through a one-way hashing algorithm in which some of the data is destroyed, making it impossible for anyone to retrieve passwords from the database, even us. To verify passwords, the entered value must pass through the same one-way hash and produce the same result.

After removing these two sources the only sensitive data that remains is a list of names and contact info.

:::tip
Because ChurchApps never stores credit card or bank information, even a worst-case data breach would not expose financial account details. Only names and contact information would be at risk.
:::

## Using Standard Best Practices

We use the industry standard best practices for security, including encrypting all data in transit to and from our servers using HTTPS. All servers are hosted in a secure physical datacenter with Amazon Web Services. All database servers are stored behind a firewall and are inaccessible from the Internet.

## Data Segregation

Data is separated into different databases based on scope. Each of our APIs (Membership, Giving, Attendance, Messaging, Doing and Lessons) are independent silos of data with their own databases. If one of them is compromised, the usefulness of the data is limited without others also being compromised. For example, if the Giving API/database was to be compromised, a bad actor could potentially gain access to a list of donations and dates (but never card/bank data). However, they would not have access to which users made the donations or which churches they were for as that data is stored in the separate Membership database.

:::info
Data segregation means that compromising one system does not give access to all church data. Each API operates independently with its own database, limiting the impact of any potential breach.
:::

## Limited Access

Access to the production servers is strictly limited to the server administrators who require access. This is currently two individuals who are also members of the board. Developers, volunteers and other board members are not permitted access to the production servers.

## Privacy Policy

Your data is yours and will never be sold to third parties. You can read our full privacy policy [here](https://churchapps.org/privacy).

## GDPR Compliance

ChurchApps supports GDPR compliance for churches with members in the UK or European Union. Here's how we address the key requirements:

### Data Subject Rights

ChurchApps provides tools to help churches respond to data subject requests:

- **Right of Access (Article 15)** — Members can request a copy of their personal data by contacting their church. Administrators can export any person's data from the **Data Management** section on the person detail page in B1.church Admin.
- **Right to Erasure (Article 17)** — Members can request account deletion by contacting their church. Administrators can anonymize a person's data across all modules from the **Data Management** section on the person detail page. Anonymization replaces personal information with generic values while preserving aggregate records (donation totals, attendance counts) needed for church financial reporting.
- **Right to Restriction (Article 18)** — Members can request restriction of processing by contacting their church, including opting out of communications.
- **Right to Data Portability (Article 20)** — Administrators can export personal data in a structured, machine-readable JSON format on behalf of members who request it.

### Using the Data Management Tools

To access GDPR data tools for an individual:

1. Go to **People** in B1 Admin and open the person's record.
2. Click **Edit** to enter edit mode.
3. Scroll down to the **Data Management** section (collapsed by default) and click to expand it.
4. Use **Export Data** to download a JSON file of all data stored for that person.
5. Use **Anonymize** to replace personal information with generic values. You will be asked to type `ANONYMIZE` to confirm — this action cannot be undone.

:::warning
Anonymization is permanent. Donation totals and attendance counts are preserved for financial reporting purposes, but all personal identifiers (name, email, address, etc.) are removed and cannot be recovered.
:::

### Data Processing

ChurchApps acts as a **data processor** on behalf of your church (the **data controller**). Our [Data Processing Agreement](https://churchapps.org/terms) outlines the responsibilities of each party, including sub-processor usage, breach notification procedures, and data handling on termination.

### International Data Transfers

ChurchApps data is hosted on Amazon Web Services (AWS) in the United States. International data transfers from the UK/EU are covered by AWS's Standard Contractual Clauses (SCCs) under the [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). The AWS DPA is automatically incorporated into the AWS Service Terms for all customers. EU-based hosting is not required when appropriate transfer mechanisms like SCCs are in place.

For details on how transfer risks have been evaluated, see the [Transfer Risk Assessment](./transfer-risk-assessment.md).

### Sub-Processors

- **Amazon Web Services (AWS)** — Infrastructure hosting, data storage, and content delivery
- **Stripe** — Payment processing for donations (no card data is stored by ChurchApps)

:::info
For full details on how we handle personal data, see our [Privacy Policy](https://churchapps.org/privacy) and [Terms of Service](https://churchapps.org/terms). If you have questions about GDPR compliance, contact us at support@churchapps.org.
:::

---

## settings/index.md

# Settings



The Settings section is where you configure your church's account, branding, and administrative options in B1 Admin. From here you can manage everything from your church name and subdomain to user permissions and mobile app configuration.



## What You Will Find Here

The Settings area is organized into four sub-sections accessible from the sidebar:

1. **Settings** -- Configure your church's basic information, branding, and subdomain. See [Church Settings](./church-settings.md) for details.
2. **Mobile Apps** -- Set up and customize the navigation tabs that appear in the [B1.church PWA](/docs/b1-church/getting-started/installing-pwa) for your members (the same tabs are also rendered by the deprecated B1 Mobile native app). See [Mobile App Settings](./mobile-app.md) for details.
3. **Server Admin** -- Access advanced administration tools for managing your church's server-level settings.
4. **Forms** -- Create and manage custom forms for collecting information from your congregation.

## The Main Settings Page

When you first open the Settings page, you will see your **church name** and **subdomain** displayed at the top. The header provides quick-access buttons for common tasks:

- **Edit Settings** -- Update your church's name, address, contact information, and branding.
- **Mobile Apps** -- Jump directly to mobile app configuration.
- **Roles** -- Manage user roles and permissions for your team.
- **Import/Export** -- Transfer data between systems using the import/export tool.

:::tip
Start by configuring your church name and branding under **Edit Settings**, then set up [Roles](./roles-permissions.md) to invite your team members with the right level of access.
:::

:::info
For information about how your data is protected, see [Data Security](./data-security.md).
:::

## Next Steps

- [Church Settings](./church-settings.md) -- Configure your church information and branding
- [Roles & Permissions](./roles-permissions.md) -- Set up user roles and access control
- [Mobile App Settings](./mobile-app.md) -- Customize the navigation tabs shown in the B1.church PWA
- [Data Security](./data-security.md) -- Learn how your data is protected

---

## settings/mobile-app.md

# Mobile App Settings



The Mobile App Settings page lets you configure the navigation tabs that appear in the **B1.church mobile experience (PWA)** for your church members. You control which tabs are visible, what they link to, and how they are displayed.



:::info The native B1 Mobile app is deprecated
Tabs configured here are delivered through the [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), which has replaced the native B1 Mobile app. Members can install the PWA on their home screen from any page on `https://yourchurchname.b1.church` instead of downloading the legacy app from the App Store or Google Play.
:::


#### Before You Begin

- You need the "Edit Church Settings" permission. See [Roles & Permissions](./roles-permissions.md) if you do not have access.
- Configure your [Church Settings](./church-settings.md) first, including your church name and branding



## Accessing Mobile App Settings

1. Navigate to the **Settings** page in the left sidebar.
2. Click the **Mobile Apps** button in the header.
3. The Mobile App Settings page displays your current app tabs.

## Adding a New Tab

1. Click the **Add Tab** button at the top of the page.
2. Fill in the tab details:
   - **Name** -- The label that appears on the tab (for example, "Sermons" or "Give").
   - **Icon** -- Click the icon selector to choose an icon for your tab. You can also upload a custom image.
   - **Tab Type** -- Select from options like Bible, Live Stream, Donation, Website, and more.
   - **URL** -- Enter the web address the tab should link to.
   - **Visibility** -- Control who can see this tab (everyone, members only, etc.).
3. Click **Save Tab** to add it to your app.

## Editing an Existing Tab

1. Click on any existing tab in the **App Tabs** list.
2. Update the tab's name, icon, URL, type, or visibility settings.
3. Click **Save Tab** to apply your changes.

## Reordering Tabs

You can change the order in which tabs appear in the mobile app. Drag and drop tabs in the list to rearrange them. The order shown on this page matches the order your members will see in the app.

:::info
Some tabs may appear automatically when certain conditions are met -- for example, a Live Stream tab may show up when a stream is active. Manually added tabs give you full control over what your members see at all times.
:::

:::tip
Keep your tab count manageable. Three to five tabs works well for most churches. Too many tabs can make navigation confusing for your members.
:::

## Where These Tabs Appear

The tabs you configure here are displayed in the **B1.church PWA** that your members install from any page on `https://yourchurchname.b1.church`. Changes you make on this page are reflected the next time a member opens the app. (Tabs are also rendered by the legacy [B1 Mobile native app](/docs/b1-mobile/) for any members still running it, but that app is deprecated and no longer being updated.)

## Next Steps

- [Church Settings](./church-settings.md) -- Configure your church information and branding
- [Roles & Permissions](./roles-permissions.md) -- Manage access for your team

---

## settings/roles-permissions.md

# Roles & Permissions



Roles let you control what different users can access within your ChurchApps account. You can create custom roles for staff, volunteers, and other team members, each with their own level of access to keep your data secure.




#### Before You Begin

- You need Domain Admin access or a role with permission to manage roles
- Have a list of team members and the areas they need access to
- Review the available permission categories below to plan your roles



## Accessing Roles

1. Navigate to the **Settings** page in the left sidebar.
2. Click the **Roles** button in the header.
3. The Roles page displays all currently defined roles for your church.

## Understanding the Roles Page

The Roles page is divided into two panels:

- **Left side** -- Shows the list of members assigned to the selected role.
- **Right side** -- Displays the permission settings you can configure for that role.

Click on any role name to view and manage its members and permissions.

## Adding Users to a Role

1. Select the role you want to add members to.
2. Use the **search field** on the left side to find the person you want to add.
3. Select the person from the search results.
4. They will be added to the role immediately.

## Removing Users from a Role

1. Select the role containing the user you want to remove.
2. Find the person in the member list on the left side.
3. Click the **remove button** next to their name.

## Configuring Permissions

Each role can be granted access to specific areas of B1 Admin. Permissions are organized by section:

- **People** -- Access to the member directory and person records.
- **Donations** -- Access to donation records and fund management.
- **Attendance** -- Access to attendance tracking and reports.
- **Content** -- Access to website and content management.
- And additional areas as they are available.

Use the checkboxes on the right side of the Roles page to enable or disable access for each area.

:::warning
**Domain Admins** have full access to all areas of your ChurchApps account. Their permissions cannot be modified or restricted. Use this role only for your most trusted administrators.
:::

:::tip
Create specific roles like "Treasurer" with only **Donations** access, or "Check-In Volunteer" with only **Attendance** access. This follows the principle of least privilege and keeps your data secure. See [Data Security](./data-security.md) for more on how ChurchApps protects your information.
:::

---

## settings/transfer-risk-assessment.md

# Transfer Risk Assessment



This document records ChurchApps' assessment of risks associated with international transfers of personal data from the UK/EEA to the United States, as required under UK GDPR and EU GDPR. This is an internal compliance record maintained by ChurchApps as data processor.



**Last reviewed:** April 2026

## 1. Transfer Details

| Item | Detail |
|---|---|
| **Data Exporter** | Churches using ChurchApps (Data Controllers) located in the UK/EEA |
| **Data Importer** | ChurchApps (Data Processor), operating from the United States |
| **Categories of Data Subjects** | Church members, attendees, visitors, donors, volunteers, children (managed by parents/administrators) |
| **Categories of Personal Data** | Names, email addresses, phone numbers, postal addresses, dates of birth, gender, marital status, profile photos, donation records, attendance records, group memberships, volunteer assignments, messaging history |
| **Sensitive Data** | None intentionally collected. No health data, biometric data, or criminal records are stored. Financial account details (credit cards, bank accounts) are never stored by ChurchApps — these are handled directly by Stripe. |
| **Purpose of Transfer** | Providing church management software services (member management, donations, attendance tracking, communications, volunteer scheduling, event registration) |
| **Destination Country** | United States |
| **Transfer Mechanism** | EU Standard Contractual Clauses (SCCs) and UK International Data Transfer Addendum (IDTA), incorporated via the AWS Data Processing Addendum |

## 2. Sub-Processors

| Sub-Processor | Role | Location | Transfer Mechanism |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastructure hosting, data storage, content delivery (us-east-2 region) | United States | AWS DPA with SCCs (automatically included in AWS Service Terms) |
| **Stripe** | Payment processing for donations | United States | Stripe DPA with SCCs |

Credit card and bank account data is transmitted directly from the user's browser to Stripe and is never stored on or transmitted through ChurchApps servers.

## 3. Risk Assessment

### 3.1 Encryption

- **In transit:** All data is encrypted using TLS/HTTPS for all communications between users and ChurchApps servers.
- **At rest:** Data stored on AWS is encrypted at rest using AWS-managed encryption.

### 3.2 Access Controls

- Production server access is limited to two individuals who are members of the ChurchApps board of directors.
- Developers, volunteers, and other board members do not have access to production servers or databases.
- Database servers are behind a firewall and are not directly accessible from the internet.
- Church data is logically separated — each church can only access its own data through application-level access controls.

### 3.3 Data Segregation

Data is distributed across six independent databases (Membership, Giving, Attendance, Messaging, Doing, Content). Compromise of one database does not expose data from the others. For example, the Giving database contains donation amounts and dates but not the names or contact information of donors (stored in Membership).

### 3.4 Data Minimization

- No credit card or bank account information is stored (handled by Stripe).
- Passwords are stored using one-way hashing and cannot be retrieved.
- Churches control what data they collect from their members.

### 3.5 Data Subject Rights

ChurchApps provides technical tools enabling churches to fulfill data subject requests:

- **Access & Portability:** Full data export in machine-readable JSON format.
- **Erasure:** Anonymization across all six databases, replacing personal data with generic values while preserving aggregate records required for financial reporting.
- **Restriction:** Inactive membership status excludes individuals from search, directory, reports, and messaging while retaining their record.
- **Rectification:** Members and administrators can edit personal information through the application.

### 3.6 Breach Notification

ChurchApps commits to notifying affected churches within 72 hours of becoming aware of a personal data breach, as documented in the [Terms of Service](https://churchapps.org/terms) (Section 11.6).

### 3.7 US Government Access Risk

The primary risk associated with US-hosted data is potential access by US government authorities under FISA Section 702 or Executive Order 12333. This risk is assessed as **low** for the following reasons:

- ChurchApps processes church membership and attendance data, not data of intelligence value.
- Data subjects are church members and attendees — not categories typically targeted by surveillance programs.
- No sensitive personal data (health, financial accounts, political opinions) is stored.
- AWS's DPA includes commitments regarding government access requests and transparency reporting.
- The EU-US Data Privacy Framework (established 2023) provides additional safeguards for data transfers to certified US organizations.

## 4. Overall Risk Conclusion

The risk to data subjects from this international transfer is assessed as **low**. The combination of:

- Standard Contractual Clauses as the legal transfer mechanism
- Encryption in transit and at rest
- Strict access controls with only two authorized individuals
- Data segregation across independent databases
- No storage of financial account details
- Low sensitivity and low intelligence value of the data processed
- Technical tools for exercising all data subject rights

provides adequate supplementary measures to ensure that the transferred data receives a level of protection essentially equivalent to that guaranteed within the UK/EEA.

## 5. Review Schedule

This assessment will be reviewed annually or when there is a material change to the data processing, sub-processors, or legal framework governing international data transfers.

---

## website/appearance.md

# Appearance



The Appearance page lets you customize the overall look and feel of your church website. From colors and fonts to spacing and custom CSS, you can control every visual aspect of your site from one place.




#### Before You Begin

- Complete the [Initial Setup](initial-setup) for your website
- Have your church logo ready in PNG format with a transparent background and a 4:1 aspect ratio
- Know your church's brand colors (hex values) if you have an existing style guide



## Accessing Appearance Settings

1. In the B1 Admin, click **Website** in the left menu.
2. Click the **Appearance** tab at the top of the Website Pages view.
3. The Site Styles page loads with a live preview of your website on the left and **Style Settings** options on the right.

## Color Palette

1. Click **Color Palette** in the Style Settings panel.
2. You will see **Base Colors** (light, accent, and dark shades) and **Semantic Colors** (Primary, Secondary, Success, Warning, and Error).
3. Click any color swatch to open the color picker. Drag the selector or enter a hex value to choose your color.
4. The **Color Combinations Preview** shows how your selected colors work together.
5. Use **Suggested Palettes** to quickly apply a pre-designed color scheme.
6. Click **Save** when you are satisfied.

## Typography

1. Click **Typography Settings** in the Style Settings panel.
2. Click **Select a Font** to open the font browser. You can search by name or browse categories like Serif, Sans Serif, Display, Handwriting, and Monospace.
3. Set fonts for both headings and body text.
4. Click **Typography Scale** to adjust the size hierarchy for Heading 1 through Heading 4. Use the scale multiplier and base size fields to fine-tune.
5. Click **Save** to apply your font choices.

## Spacing

1. Click **Spacing Scale** in the Style Settings panel.
2. Adjust spacing values for Extra Small through Extra Large. Practical examples show how each value affects layout.
3. Click **Save Spacing** to apply the values across your entire site.

## Logo and Branding

1. Click **Logo** in the Style Settings panel.
2. Upload your **Light Background Logo** and **Dark Background Logo**. Use images with a transparent background and a 4:1 aspect ratio for best results.
3. Upload a **Social Media Image** for link previews and a **Favicon** for the browser tab icon.

:::tip
For best results, use a logo with a transparent background in PNG format. This ensures it looks great on both light and dark backgrounds across your website and [mobile app](../settings/mobile-app.md).
:::

## Navigation Styles

Customize your website's navigation bar colors for both solid and transparent modes:

1. Scroll to the **Navigation Styles** section
2. Click **Edit Navigation Styles**
3. Configure colors for solid navigation (with background) and transparent navigation (overlay mode)
4. Click **Save** to apply your navigation colors

For detailed instructions, see [Navigation Styles](./navigation-styles.md).

## Custom CSS and JavaScript

1. Click **CSS and Javascript** in the Style Settings panel.
2. Add **Custom CSS** to override default styles for advanced customization.
3. Add **Custom HTML** for tracking codes or other scripts.
4. Use the **Common Javascript Examples** section for snippets like Google Analytics integration.

:::warning
Custom CSS is powerful but can break your site's layout if used incorrectly. Most churches can achieve the look they want using the built-in color, font, and spacing controls. Only use custom CSS if you are comfortable with web development.
:::

## Style Themes

If you want a quick starting point, the **Suggested Palettes** in the Color Palette section offer pre-built themes that set coordinated colors in one click. You can always fine-tune individual settings after applying a theme.

## Next Steps

- [Managing Pages](managing-pages) -- Build and organize your website pages
- [Files](files) -- Upload media assets for your site

---

## website/files.md

# Files



The Files page is the central repository for all media and documents used on your church website. From here you can upload, organize, browse, and manage every image, document, and media file your site needs.




#### Before You Begin

- Complete the [Initial Setup](initial-setup) for your website
- Optimize images before uploading for faster page load times
- Prepare your files in common web formats (PNG, JPG, PDF, etc.)



## Uploading Files

1. Navigate to the **Website** section in B1 Admin and click the **Files** tab.
2. Drag and drop files directly onto the upload area, or click the upload button to browse your computer.
3. Your files will upload and appear in the file library immediately.

:::tip
For best results, optimize images before uploading. Smaller file sizes help your website load faster for visitors. Tools like TinyPNG or Squoosh can compress images without noticeable quality loss.
:::

## Organizing with Folders

1. Create folders to group related files together -- for example, "Sermon Graphics," "Event Banners," or "Staff Photos."
2. Move files between folders to keep your library tidy as it grows.
3. Use clear, descriptive folder names so your team can find files quickly.

## Browsing and Searching

- Scroll through the file library to see thumbnails of all your uploaded files.
- Use the **search** function to find files by name when your library gets large.
- Click on any file to view its details, including the file name, size, and URL.

## Using Files on Your Website

1. Click on a file to view its details.
2. **Copy the file URL** to use it in your website pages. You can paste this URL into image elements, download links, or anywhere else that accepts a file URL.
3. Files you upload here are available for use across all your website pages and content blocks.

:::info
When building pages in [Managing Pages](managing-pages), you can reference any file uploaded here by its URL. This keeps all your media organized in one central location.
:::

## Deleting Files

1. Select the file you want to remove.
2. Click the **Delete** button to permanently remove it from your library.
3. Make sure the file is not currently being used on any page before deleting it, as this will break any links or images that reference it.

:::warning
Deleted files cannot be recovered. Double-check that a file is no longer in use on any page before removing it.
:::

## Next Steps

- [Managing Pages](managing-pages) -- Add your uploaded files to website pages
- [Appearance](appearance) -- Customize your site's visual theme

---

## website/index.md

# Website



The Website section in B1 Admin gives you a full-featured website builder for your church. You can create pages, customize your site's look and feel, manage media files, and publish event calendars -- all without writing any code.



## What You Can Do

The Website builder is organized into five main areas:

### Pages

Create and manage all the pages on your church website. The **Pages** table shows each page along with its status -- either **Generated** (automatically created by the system) or **Custom** (created by you). You can add new custom pages, edit existing ones, or convert auto-generated pages into custom pages for full control over their content.

The left sidebar displays your navigation links in a tree structure. You can reorder links using drag-and-drop to set the exact hierarchy and order you want visitors to see.

### Blocks

Build reusable content components that you can place on multiple pages. Blocks save you time when you have content like a call-to-action, announcement banner, or contact section that appears in more than one place. Update a block once and the change applies everywhere it is used.

### Appearance

Customize your website's theme, colors, fonts, logo, and spacing. You can apply pre-built style themes for a quick start or fine-tune every detail with the color palette editor, typography settings, and custom CSS. See the [Appearance](appearance) guide for full details.

### Files

Upload and organize all your media assets -- images, documents, and other files -- in one central location. Use folders to keep things tidy and copy file URLs for use anywhere on your site. See [Files](files) for more information.

### Calendars

Publish event calendars on your website so visitors can see what is happening at your church. Create curated calendars that pull events from multiple groups into a single view.

:::tip
Start with [Initial Setup](initial-setup) if you are configuring your website for the first time. It walks you through domain setup, creating your first page, and configuring your site's appearance.
:::

## Next Steps

- [Initial Setup](initial-setup) -- Get your website up and running for the first time
- [Managing Pages](managing-pages) -- Learn how to create and organize your pages
- [Using the Page Editor](page-editor) -- Build and style your page content with the visual editor
- [Appearance](appearance) -- Customize your site's look and feel
- [Files](files) -- Upload and manage media files

---

## website/initial-setup.md

# Initial Setup



Every B1 account comes with a website ready to go. This guide walks you through setting up your church domain, configuring your site's appearance, creating your first pages, and organizing your navigation.




#### Before You Begin

- You need a B1.church account with administrative access
- If using a custom domain, have your DNS provider login credentials ready (e.g., GoDaddy, Cloudflare, or AWS)
- Prepare your church logo in PNG format with a transparent background for best results



## Setting Up Your Domain

Your church automatically receives a subdomain on B1.church (for example, `yourchurch.b1.church`). You can also point your own custom domain to your B1 site.

1. Go to **B1.church Admin** by visiting admin.b1.church or clicking your profile dropdown and choosing **Switch App**.
2. Click **Dashboard** in the left sidebar, then select **Settings** from the dropdown menu.
3. Click **Manage** to view your subdomain. Set it to something short and recognizable with no spaces.
4. To use a custom domain, log into your DNS provider (such as GoDaddy, Cloudflare, or AWS) and add two records:
   - An **A record** for your root domain pointing to `3.23.251.61`
   - A **CNAME record** for `www` pointing to `proxy.b1.church`
5. Return to B1.church Admin, add your custom domain to the list, and click **Add** then **Save**. Your site will be accessible from your custom domain within a few minutes.

:::tip
If you do not see the Settings option, ask the person who set up your church account to grant you the "Edit Church Settings" permission. See [Roles & Permissions](../settings/roles-permissions.md) for details.
:::

## Creating Your First Page

1. In the B1 Admin, click **Website** in the left menu to open the Website Pages view.
2. Click **Add Page** in the top right corner.
3. Choose **Blank** as the page type and name it "Home."
4. Click **Page Settings** and set the URL path to `/` (a forward slash with no text) for your home page. Other pages use `/page-name`.
5. Click **Edit Content** to start building. Every page must begin with a **Section** -- this is the container for all other elements.
6. After adding a section, click **Add Content** again to insert text, images, videos, cards, forms, and more by dragging them into your section.

:::info
For detailed instructions on working with pages and navigation, see [Managing Pages](managing-pages). For a full guide to the visual editor, see [Using the Page Editor](page-editor).
:::

## Configuring Site Appearance

1. From the Website Pages view, click the **Appearance** tab at the top.
2. Use the **Color Palette** to set your brand colors for primary, secondary, and accent tones.
3. Under **Typography Settings**, choose your heading and body fonts from the font browser.
4. Upload your church logo under **Logo** in the Style Settings. Provide both a light background and dark background version.
5. Configure your **Site Footer** with your church's contact information and links.

:::info
Changes you make in Appearance apply across your entire website. See the [Appearance](appearance) page for detailed instructions on each setting.
:::

## Setting Up Navigation

Your navigation links appear in the left sidebar of the Website Pages view. To organize them:

1. Click **Add** to create a new navigation link and point it to one of your pages.
2. Drag and drop links to reorder them or nest them under parent items.
3. Preview your site to confirm the navigation looks correct.

## Next Steps

- [Managing Pages](managing-pages) -- Learn how to work with pages and navigation in detail
- [Appearance](appearance) -- Fine-tune your site's colors, fonts, and layout
- [Files](files) -- Upload images and documents for your website

---

## website/managing-pages.md

# Managing Pages



The Website Pages view is your central hub for creating, editing, and organizing all the pages on your church website. You can manage both your page content and your site's navigation from this single screen.




#### Before You Begin

- Complete the [Initial Setup](initial-setup) to configure your domain and basic site settings
- Have your content and images ready. Use the [Files](files) manager to upload media assets first.



## Understanding Page Types

The **Pages** table lists every page on your site along with its status:

- **Generated** -- Pages that were automatically created by the system based on your church's data (for example, a Groups page or Sermons page). These pages update themselves as your data changes.
- **Custom** -- Pages that you created yourself with your own content and layout.

You can convert any auto-generated page into a custom page if you want full control over its content and design.

## Adding and Editing Pages

1. Click the **Add Page** button in the top right corner of the Pages table.
2. Choose a page type (blank or a template) and give it a name.
3. Click **Edit** next to any page to open the [page editor](page-editor), where you can add sections, text, images, and other elements.
4. Click **Page Settings** to update the page title, URL path, and other metadata.
5. Use the **Preview** button to open your page in a new window and see exactly how it will look to visitors.

:::tip
For your home page, set the URL path to just `/`. For all other pages, use a descriptive path like `/about` or `/contact`.
:::

## Managing Navigation

The left sidebar of the Website Pages view displays your navigation links. These links control the menu that visitors see on your website.

1. Click **Add** to create a new navigation link. You can point it to any page on your site or to an external URL.
2. To reorder links, drag and drop them into the order you want. You can also nest links under a parent item to create dropdown menus.
3. Click the **Edit** icon next to any link to change its label, URL, or position.
4. To remove a link from the navigation, click the **Delete** icon.

:::info
Removing a navigation link does not delete the page itself. The page still exists and can be accessed directly by its URL -- it simply will not appear in the menu.
:::

## Tips for Organizing Your Site

- Keep your top-level navigation to five or six items so visitors can find things quickly.
- Use nested links for related sub-pages (for example, an "About" dropdown with "Our Team," "Beliefs," and "History").
- Review your navigation on mobile by clicking **Mobile Preview** to make sure it works well on smaller screens.
- Give pages clear, descriptive names that help visitors understand what they will find.

:::tip
You can add [forms](../forms/creating-forms.md) to your pages to collect registrations, prayer requests, or other information from visitors.
:::

## Image Lightbox

When visitors click on an image on your website, it opens in a full-screen lightbox overlay. This lets people view photos at a larger size without leaving the page. No configuration is required — the lightbox is enabled automatically for images in your page content.

## Next Steps

- [Initial Setup](initial-setup) -- First-time setup instructions
- [Using the Page Editor](page-editor) -- Learn how to build and style page content
- [Appearance](appearance) -- Customize your site's visual theme
- [Files](files) -- Upload and manage media assets for your pages

---

## website/navigation-styles.md

# Navigation Styles



Customize your church website's navigation bar colors to match your branding. You can configure colors for both solid backgrounds and transparent overlays, giving you complete control over how your navigation looks across different pages.




#### Before You Begin

- You need permission to manage your church website. See [Roles & Permissions](../people/roles-permissions.md) for details.
- Have your brand colors ready, including hex color codes (e.g., #03A9F4).
- Understand the difference between solid and transparent navigation styles on your website.



## Understanding Navigation Modes

Your website navigation can appear in two different styles depending on the page:

- **Solid navigation** -- Navigation bar with a background color, typically used on content pages
- **Transparent navigation** -- Navigation that overlays the page content, typically used on pages with hero images or full-screen backgrounds

You can customize colors for both modes independently.

## Accessing Navigation Styles

1. Navigate to **Website** in B1 Admin
2. Click on **Appearance** in the sidebar
3. Scroll to the **Navigation Styles** section
4. Click **Edit Navigation Styles**

## Configuring Solid Navigation

Solid navigation appears with a background color behind the navigation bar. You can customize:

### Background Color

1. Toggle the **Override** switch for **Background Color**
2. Click the color picker
3. Choose your desired background color
4. The default is white (#FFFFFF)

### Link Color

1. Toggle the **Override** switch for **Link Color**
2. Choose the color for navigation link text
3. This affects links in their default state
4. The default is dark gray (#555555)

### Link Hover Color

1. Toggle the **Override** switch for **Link Hover Color**
2. Choose the color links change to when users hover over them
3. This provides visual feedback for clickable links
4. The default is light blue (#03A9F4)

### Active Color

1. Toggle the **Override** switch for **Active Color**
2. Choose the color for the currently active page link
3. This helps users know which page they're on
4. The default is light blue (#03A9F4)

## Configuring Transparent Navigation

Transparent navigation overlays your page content with no background. You can customize:

### Link Color

1. Toggle the **Override** switch for **Link Color**
2. Choose a color that contrasts well with your page background
3. Often white or light colors work best over dark backgrounds
4. The default is dark gray (#555555)

### Link Hover Color

1. Toggle the **Override** switch for **Link Hover Color**
2. Choose the hover state color
3. Ensure it's visible against your page background
4. The default is light blue (#03A9F4)

### Active Color

1. Toggle the **Override** switch for **Active Color**
2. Choose the active page indicator color
3. Should stand out while still fitting your design
4. The default is light blue (#03A9F4)

:::info
Transparent navigation does not have a background color setting since it overlays the page content directly.
:::

## Saving Your Changes

1. After configuring your colors, click **Save Navigation Styles**
2. Your changes apply immediately to your live website
3. Visit your website to see the navigation in both modes

## Resetting to Defaults

If you want to go back to the default colors:

1. Toggle off the **Override** switches for any custom colors
2. Click **Save Navigation Styles**
3. The navigation returns to the default color scheme

Or click **Cancel** to discard all changes without saving.

## Best Practices

### Color Contrast

- **Readability** -- Ensure link colors have enough contrast with the background
- **WCAG compliance** -- Aim for at least 4.5:1 contrast ratio for accessibility
- **Test both modes** -- Preview your site with both solid and transparent navigation

### Brand Consistency

- **Use your brand colors** -- Match your logo and website theme
- **Limit your palette** -- Stick to 2-3 colors for a cohesive look
- **Consider your images** -- If using transparent navigation, test it against typical page backgrounds

### Hover and Active States

- **Clear feedback** -- Make hover states obviously different from default links
- **Distinguish active pages** -- Use a distinct color so users know where they are
- **Smooth transitions** -- The system automatically animates color changes

## Troubleshooting

### Colors Don't Look Right

- **Clear your cache** -- Browser caching may show old colors
- **Check hex codes** -- Make sure you entered valid hex color codes
- **Test on different backgrounds** -- Colors may look different depending on the page

### Navigation Not Visible

- **Transparent mode** -- If using transparent navigation over light images, dark text may be hard to see
- **Solution** -- Adjust your link colors or use darker page backgrounds
- **Alternative** -- Add a subtle shadow or background overlay to the navigation area

## Technical Details

Navigation styles are stored as JSON and applied using CSS variables:

- Changes take effect immediately without rebuilding the site
- Colors cascade to all navigation elements
- Overrides are optional; unset colors use theme defaults

## Related Articles

- [Appearance](./appearance.md) -- Customize your website's overall look and feel
- [Managing Pages](./managing-pages.md) -- Create and organize your website pages
- [Page Editor](./page-editor.md) -- Design page layouts and content

---

## website/page-editor.md

# Using the Page Editor



The B1 page editor is a visual drag-and-drop builder that lets you design your church website pages without writing any code. You can add sections and content blocks, customize styles, preview your work, and undo changes -- all from within your browser.




#### Before You Begin

- Complete [Initial Setup](initial-setup) to get your website configured
- Create at least one page in [Managing Pages](managing-pages)
- You need the **content.edit** permission to access the editor



## Opening the Editor

1. In B1 Admin, click **Website** in the left menu.
2. Find the page you want to edit in the Pages table and click **Edit**.

The editor opens in full-screen mode. The left panel shows your page structure and available content elements; the center area shows a live preview of your page.

:::info
The editor always displays in light mode, regardless of your B1 Admin theme setting. This ensures the preview accurately matches how your page will look to website visitors.
:::

## Page Structure: Sections and Elements

Every page is built from two levels:

- **Sections** -- The top-level containers that divide your page into horizontal bands (for example, a hero section, a content block, or a footer strip). Every page must have at least one section before you can add content.
- **Elements** -- The individual content pieces placed inside a section, such as text, images, buttons, cards, forms, and calendars.

### Adding a Section

1. Click **Add Section** (or the **+** button at the top of the left panel).
2. Choose a layout for your section -- options include single column, two columns, three columns, and more.
3. The new section appears in the preview. Click it to select it and configure its background color, padding, and other style options.

### Adding Elements to a Section

1. Click inside a section in the preview to select it.
2. Click **Add Content** and choose an element type from the list:
   - **Text** -- Headings, paragraphs, and rich text
   - **Image** -- Upload or link to a photo
   - **Button** -- A clickable call-to-action link
   - **Card** -- An image with a title and description
   - **Form** -- Embed a [form](../forms/creating-forms) directly on the page
   - **Calendar** -- Display an event calendar
   - **FAQ** -- Accordion-style question and answer blocks
   - **Video** -- Embed a video by URL
3. Configure the element using the settings panel that appears.

### Reordering Content

Drag sections or elements using the handle icon (six dots) on the left side of each item to reorder them. You can drag elements within a section or move them between sections.

## Styling Your Page

### Section Styles

Click any section to open its style panel. You can set:

- **Background** -- Solid color, gradient, or image
- **Padding** -- Top and bottom spacing inside the section
- **Width** -- Full-width or centered/contained

### Element Styles

Click any element to open its style panel. Common options include font size, color, alignment, margin, and padding. For images, you can set alt text and link targets.

### Custom CSS

For advanced styling, each section and element has a **Custom CSS** field where you can write your own CSS rules. These are scoped to that element, so they will not unintentionally affect the rest of the page.

:::tip
If you need to apply styles across your entire site -- such as a custom font or global color -- use the [Appearance](appearance) settings instead of custom CSS on individual pages.
:::

## Previewing Your Page

Use the preview controls in the toolbar to check how your page looks at different screen sizes:

- **Desktop** -- Full-width browser view
- **Mobile** -- Narrow phone-sized view

Click **Preview** to open a live version of the page in a new browser tab, exactly as visitors will see it.

## Undoing Changes

The editor tracks your editing history automatically. Use the toolbar buttons or keyboard shortcuts to navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Revert your last action
- **Redo** (Ctrl+Y / Cmd+Y) -- Re-apply an undone action

You can also restore the page to an earlier snapshot. Click **History** in the toolbar to see a list of saved snapshots with descriptions, and click any entry to restore to that point.

:::warning
Restoring a snapshot replaces your current page content with the snapshot version. This cannot be undone with the standard undo button. Save a snapshot of your current state before restoring an old one if you want to keep the option to return.
:::

## Saving Your Work

Changes are saved automatically as you work. A status indicator in the toolbar shows whether your changes have been saved. You can also click **Save** at any time to force a save.

## Related Articles

- [Managing Pages](managing-pages) -- Create pages, set URLs, and manage site navigation
- [Appearance](appearance) -- Set site-wide colors, fonts, and branding
- [Files](files) -- Upload images and documents to use in the editor
- [Creating Forms](../forms/creating-forms) -- Build forms you can embed on pages

---