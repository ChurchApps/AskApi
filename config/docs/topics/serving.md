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
