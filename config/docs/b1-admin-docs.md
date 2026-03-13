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
- [Tracking Attendance](tracking-attendance.md) -- view trends and filter reports
- [Check-In](check-in.md) -- set up self check-in for services

:::tip
If you are setting up attendance for the first time, start with the [Attendance Setup](setup.md) guide to define your campuses and service times. Once that is in place, you can begin tracking and reviewing attendance data right away.
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

:::tip
If a group meets outside of a regular service -- like a midweek small group that tracks its own attendance -- you can leave it as an unscheduled group. It will still appear on the Groups tab for attendance reporting.
:::

## Editing Your Setup

You can update your setup at any time. Select a campus, service time, or group and click **Edit** to change its details, or **Delete** to remove it.

:::info
Removing a service time does not delete past attendance records. Your historical data is preserved even if you change your schedule.
:::

## What's Next

Once your campuses, service times, and groups are in place, you are ready to start [tracking attendance](tracking-attendance.md) or set up [self check-in](check-in.md) for your services.

---

## attendance/tracking-attendance.md

# Tracking Attendance



Once your campuses, service times, and groups are configured, B1 Admin makes it easy to review attendance data and spot trends. The Attendance page provides two reporting views -- the **Attendance** tab for church-wide trends and the **Groups** tab for group-level detail. Use these tools to understand growth patterns, identify declining engagement, and make data-driven decisions for your church.




#### Before You Begin

- Your attendance structure must be set up with at least one campus and service time. See [Attendance Setup](setup.md) if you haven't done this yet.
- Attendance data needs to be recorded before reports will show results. Data can come from manual entry or [self check-in](check-in.md).



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

---

## calendars/creating-calendars.md

# Creating Calendars



Creating a calendar in B1 Admin gives you a central place to manage events for a ministry, department, or your entire church. Each calendar can pull in events from one or more groups, making it easy to keep everything organized.




#### Before You Begin

- Set up the [groups](../groups/creating-groups.md) whose events you want to include in your calendar
- You need administrative access to the Calendars section in B1 Admin



## Creating a New Calendar

1. Navigate to the **Calendars** section in B1 Admin.
2. Click **Add Calendar**.
3. Enter a **name** for your calendar (for example, "Youth Ministry Events" or "Main Church Calendar").
4. Add an optional **description** to help your team understand what this calendar is for.
5. Click **Create** to save your new calendar.

## The Calendar Detail Page

After creating a calendar, click on it to open the detail page. This page has two main areas:

- **Left column** -- The calendar and events editor. Here you can view, add, and manage events on your calendar.
- **Right column** -- The associated groups list. This shows which groups have events included in this calendar.

## Adding Events

1. On the calendar detail page, use the calendar editor on the left to add new events.
2. Set the event name, date, time, and any other details.
3. Events you add will appear on the calendar and can be published to your website.

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



The Calendars section in B1 Admin lets you create and manage event calendars for your church. You can set up calendars for different ministries, aggregate events from multiple groups, and publish calendars on your B1.church website for your congregation to see.



## Viewing Your Calendars

1. In the B1 Admin, navigate to the **Calendars** section.
2. The Calendars page lists all your calendars with their name and status.
3. Each calendar also shows the groups associated with it.

## What You Can Do

- **Add a new calendar** -- Click the add button to create a calendar for a specific ministry, event type, or purpose. See [Creating Calendars](creating-calendars) for step-by-step instructions.
- **Edit a calendar** -- Click on any calendar to open it and manage its events and associated groups.
- **Publish calendars** -- Calendars can be displayed on your B1.church website so visitors can see upcoming events at your church.
- **Create curated calendars** -- Pull events from multiple groups into a single calendar view for a comprehensive look at everything happening at your church. See [Curated Calendar](curated-calendar) for details.

:::info
Calendars work closely with [Groups](../groups/creating-groups.md). When groups have events scheduled, those events can be pulled into your calendars. See the [Creating Calendars](creating-calendars) page to learn how to connect groups to calendars.
:::

## Next Steps

- [Creating Calendars](creating-calendars) -- Set up a new calendar and add events
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



Creating a group in B1 Admin is straightforward. You will set up a category, name your group, and then configure its settings. Groups help you organize your church into meaningful units like small groups, ministry teams, committees, and classes.




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

## groups/group-members.md

# Group Members



Once you have created a group, the next step is adding members. From a group's detail page you can search for people, add them to the group, assign leaders, send messages, and export the member list. Managing group membership is essential for coordinating ministries, small groups, and teams.




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



The **Groups** section lets you organize your church members into teams, ministries, small groups, Bible studies, committees, and more. Groups are the backbone of community life at your church, and this section gives you the tools to create, manage, and communicate with every group in one place.



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
If you are just getting started, begin by creating a few categories that match your church structure (for example, "Ministries," "Small Groups," "Teams"). Then add individual groups within each category. See [Creating Groups](./creating-groups.md) for a step-by-step walkthrough.
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

:::tip
Enable auto-import and new videos you upload to YouTube/Vimeo will appear in B1 automatically — no manual work needed.
:::

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

- **[People](./people/)** - Manage your church directory, add members, track households
- **[Groups](./groups/)** - Create and organize church groups, teams, and ministries
- **[Attendance](./attendance/)** - Set up campuses, service times, and track attendance
- **[Donations](./donations/)** - Record giving, manage funds, generate statements
- **[Serving](./serving/)** - Coordinate volunteers, create service plans, manage tasks
- **[Forms](./forms/)** - Build custom forms for registrations and data collection
- **[Reports](./reports/)** - View birthday, attendance, and donation reports
- **[Website](./website/)** - Build and manage your church website
- **[Sermons](./sermons/)** - Manage your sermon library and live streaming
- **[Calendars](./calendars/)** - Create and publish event calendars
- **[Settings](./settings/)** - Configure church info, roles, and permissions

:::info
Click the question mark icon in the top-right corner of any page for quick access to help and documentation.
:::

For support, email [support@churchapps.org](mailto:support@churchapps.org).

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
- [Reports Overview](./index) -- See all available reports

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
2. Choose from pre-designed tabs (**Chat** or **Prayer**) or add a custom tab with an external URL.
3. For pre-designed tabs, just give it a name in the **Tab Text** box and the setup is complete.
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

To give team members host capabilities (chat moderation, prayer request responses):

1. Go to **Settings** in the left sidebar and click **Roles**.
2. Click the plus button and select **Add Custom Role**.
3. Name the role "Streaming Host" and click **Save**.
4. Click the new role, then click **Add** in the Members section to add people.
5. Scroll down to **Edit Permissions**, expand the **Content** section, and check **Host Chat**.

When hosts log into the live stream page, they will have special capabilities including chat moderation and prayer request management.

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

:::tip
If you are an admin, toggle **Show All** to view all ministries at once. This is helpful when you need to check assignments across multiple teams.
:::

## Sub-Sections

The Serving section includes three key areas:

- **[Plans](./plans.md)** -- Create service plans for specific dates and assign volunteers to teams. Plans help you organize who is serving when, so everyone knows their role ahead of time.
- **[Songs](./songs.md)** -- Manage your worship song library with lyrics, arrangements, and external links. Your worship team can use this to prepare for upcoming services.
- **[Tasks](./tasks.md)** -- Assign and track tasks for your team members. Set up [Automations](./automations.md) to create recurring tasks automatically, so nothing falls through the cracks.

## Getting Started

1. Navigate to **Serving** from the main menu in B1 Admin.
2. Select a **ministry tab** to view its plan types and teams.
3. Choose a plan type to start [creating service plans](./plans.md), or explore the [Songs](./songs.md) and [Tasks](./tasks.md) sub-sections.

:::info
Before you can create plans, you will need to set up your ministries and teams in the Settings area. See the Settings documentation for details on configuring your serving structure.
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
Volunteers must have the B1 Mobile app installed and notifications enabled to receive the push notification. See the [Notifications guide](/docs/b1-mobile/community/notifications) for how volunteers can enable this on their device.
:::

## Related Articles

- [Service Plans](./plans.md)
- [Automations](./automations.md)
- [B1 Mobile Notifications](/docs/b1-mobile/community/notifications)

---

## serving/plans.md

# Service Plans



Service plans organize who is serving and when. Each plan is tied to a specific date and ministry, making it easy to coordinate your volunteer teams week by week and ensure every service is fully staffed.




#### Before You Begin

- Set up your ministries and teams in the Settings area
- Make sure volunteers have been added to your [people directory](../people/adding-people.md) and assigned to teams



## Accessing Plans

1. Navigate to **Serving** from the main menu.
2. Select a **ministry tab** at the top of the page.
3. Click on a **plan type** to see the list of plans for that type.
4. Click on a specific plan to open it.

## Creating a Plan

1. From the plan type view, click **Add Plan**.
2. Select the **date** for the service.
3. Save the plan. You can now begin assigning team members and building out the [service order](./service-order.md).

## The Plan Detail Page

When you open a plan, you will see two tabs:

- **Assignments** -- Manage which team members are assigned to this plan. You can add people from your existing teams and see who has confirmed or is still pending.
- **[Service Order](./service-order.md)** -- Build the order of service with elements like worship songs, prayers, announcements, and the sermon.

## Assigning Team Members

1. Open a plan and go to the **Assignments** tab.
2. Click on a **team** to expand it.
3. Add members from your team roster by clicking **Add**.
4. Assigned members will appear under their team with their assignment status.

:::tip
Set up your teams in the ministry settings before creating plans. This way, you will have a ready pool of volunteers to assign from.
:::

## Printing Plans

You can print a plan for distribution to your team. Open the plan and use the **Print** option to generate a printable version that includes assignments and the service order. This is useful for handing out at rehearsals or posting in a common area.

:::info
Plans are organized by ministry. Make sure you are on the correct ministry tab before creating or viewing plans.
:::

## Next Steps

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
2. Select your ministry tab and click **Add Plan** — the **Schedule Lesson** form opens
3. Select the **date** for the lesson (defaults to the upcoming Sunday)
4. Click **Select Lesson** — a content browser dialog opens
5. At the top of the dialog, confirm **Lessons.church** is selected as the provider
6. Browse through the content:
   - Select a **Program** (e.g., "Bible Stories for Kids")
   - Select a **Study** within that program (e.g., "Creation and Early Stories")
   - Select the specific **Lesson**
   - Select the **Venue** — this is the age-group version of the lesson (e.g., "Preschool", "Elementary")
7. Click **Associate Lesson** to confirm
8. Choose your **copy option** for volunteers:
   - **Nothing** — fresh plan, no volunteers carried over
   - **Positions Only** — copies volunteer roles from the previous plan but not who is assigned
   - **Positions and Assignments** — copies both roles and assigned volunteers *(most common)*
9. Click **Save**

The plan is created and named automatically (e.g., "Feb 23 - Elementary"). Volunteers can open the plan to see their assignments and review the lesson content before Sunday.

:::warning
Make sure to select the correct **Venue** for your classroom's age group. Choosing the wrong venue (e.g., Preschool content for an Elementary class) means your volunteers will see content designed for a different age level.
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

ChurchApps does not currently support GDPR compliance due to the significant technical and financial requirements involved. GDPR would require us to host data on EU-based servers and build a separate infrastructure to route and store data regionally, effectively doubling our hosting and development costs. As a nonprofit offering free tools to churches, we do not have the resources to support this at this time.

:::warning
If your church has members in the European Union, be aware that ChurchApps does not currently meet GDPR requirements. Consult with your legal advisor about compliance obligations before storing EU member data.
:::

---

## settings/index.md

# Settings



The Settings section is where you configure your church's account, branding, and administrative options in B1 Admin. From here you can manage everything from your church name and subdomain to user permissions and mobile app configuration.



## What You Will Find Here

The Settings area is organized into four sub-sections accessible from the sidebar:

1. **Settings** -- Configure your church's basic information, branding, and subdomain. See [Church Settings](./church-settings.md) for details.
2. **Mobile Apps** -- Set up and customize the navigation tabs that appear in the B1 Mobile app for your members. See [Mobile App Settings](./mobile-app.md) for details.
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
- [Mobile App Settings](./mobile-app.md) -- Customize your B1 Mobile app tabs
- [Data Security](./data-security.md) -- Learn how your data is protected

---

## settings/mobile-app.md

# Mobile App Settings



The Mobile App Settings page lets you configure the navigation tabs that appear in the B1 Mobile app for your church members. You control which tabs are visible, what they link to, and how they are displayed.




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

The tabs you configure here are displayed in the **B1 Mobile app** (B1.church app) that your church members download from the App Store or Google Play. Changes you make on this page are reflected in the app the next time a member opens it.

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
For detailed instructions on working with pages, navigation, and page types, see [Managing Pages](managing-pages).
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
3. Click **Edit** next to any page to open the page builder, where you can add sections, text, images, and other elements.
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

## Next Steps

- [Initial Setup](initial-setup) -- First-time setup instructions
- [Appearance](appearance) -- Customize your site's visual theme
- [Files](files) -- Upload and manage media assets for your pages

---