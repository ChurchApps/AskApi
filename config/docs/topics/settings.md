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
