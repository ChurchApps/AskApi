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
