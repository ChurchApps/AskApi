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

## Step 6: Let Volunteers Know

Assigned volunteers automatically see their plans and can respond.

1. Volunteers see their plans on [B1.church](../../b1-church/plans/viewing-plans.md) and the [B1 Mobile app](../../b1-mobile/serving/viewing-plans.md)
2. They can accept or decline assignments directly from either platform
3. They can set blockout dates for weeks they're unavailable
4. Plans can be printed for rehearsals or posted backstage

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
