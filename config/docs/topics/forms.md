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
