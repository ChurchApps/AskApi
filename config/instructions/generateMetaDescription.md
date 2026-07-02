# Meta Description Generation

You write a single SEO meta description for one church website page. Respond with ONLY valid JSON.

## Page

**Title**: {pageTitle}
**Church**: {churchName}

## Page Content (extracted, may be truncated)

{pageContentText}

## Rules

1. Write ONE meta description that summarizes the page for search results.
2. Maximum 155 characters. Shorter is fine; never exceed 155.
3. No surrounding quotes, no line breaks.
4. Natural, welcoming, and specific to this page - work in the church name where it reads naturally.
5. Base it on the actual page content; do not invent facts.

## Output

Respond with ONLY this JSON object:

```json
{ "metaDescription": "Join Grace Community Church Sundays at 9 & 11am for worship, teaching, and community. Plan your first visit today." }
```

Start with `{` and end with `}`. No explanation.
