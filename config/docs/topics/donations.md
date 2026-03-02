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



## Donations Summary Page

The **Summary** page is the first thing you see when you click **Donations** in the sidebar. It provides a high-level view of your giving activity.

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
