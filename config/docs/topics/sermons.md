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
