# Page Outline Generation

Create a STRUCTURAL OUTLINE for a webpage. Respond with ONLY valid JSON.

**CRITICAL REQUIREMENTS**:
1. Respond with ONLY valid JSON - no markdown, no explanation
2. Create 4-6 sections for a complete page
3. Include specific content hints to guide section generation
4. Use the church's name and theme colors when provided

## User Request

{prompt}

## Church Context

{churchContext}

## Available Elements

{availableElementTypes}

## Constraints

{constraints}

## Output Structure

```json
{
  "title": "Page Title",
  "url": "/page-url",
  "layout": "headerFooter",
  "sections": [
    {
      "id": "section-0",
      "purpose": "2-3 sentence description of what this section should accomplish",
      "suggestedBackground": "#hex or 'none'",
      "suggestedTextColor": "light | dark",
      "suggestedElements": ["element type (description)"],
      "contentHints": {
        "headline": "Main heading text",
        "subheadline": "Supporting text",
        "keyPoints": ["specific point 1", "specific point 2"],
        "ctaText": "Button text"
      }
    }
  ]
}
```

## Section Pattern (Follow This)

1. **Hero (index 0)** - Welcome visitors, establish identity
   - Background: Primary color or dark
   - Text: light
   - Elements: text (h1), text (tagline), buttonLink
   - Hints: Church name in headline, welcoming subheadline, CTA button text

2. **Features (index 1)** - Highlight key offerings
   - Background: #F8F9FA (light gray)
   - Text: dark
   - Elements: row with 3 cards OR textWithPhoto
   - Hints: 3-4 specific key points about offerings

3. **Content (index 2-3)** - Detailed information
   - Background: Alternate white and colored
   - Elements: textWithPhoto, FAQs, tables as needed
   - Hints: Specific to user's request

4. **CTA (last)** - Drive action
   - Background: #1a1a1a (dark) or primary color
   - Text: light
   - Elements: text (heading), buttonLink
   - Hints: Action-oriented headline, clear CTA text

## Content Hint Guidelines

**headline** - Use church name, be specific
- BAD: "Welcome to Our Church"
- GOOD: "Welcome to Grace Community Church"

**subheadline** - Expand on the headline
- BAD: "Join us"
- GOOD: "Join us Sundays at 9am and 11am for uplifting worship"

**keyPoints** - Specific, actionable items (NOT placeholders)
- BAD: ["Point 1", "Point 2", "Point 3"]
- GOOD: ["Sunday Worship at 9am & 11am", "Wednesday Bible Study at 7pm", "Youth Group Fridays"]

**ctaText** - Clear action verbs
- BAD: "Click Here"
- GOOD: "Plan Your Visit", "Get Involved", "Join Us Sunday"

## Element Selection Guide

- Sermons/worship → sermons element
- Events/calendar → calendar element
- Giving/donations → donation or donateLink
- Contact info → form + map elements
- Small groups → groupList element
- Multiple items → row with card elements
- Q&A content → faq elements
- Live streaming → stream element

## Example Output

For request: "Create a page for first-time visitors"

```json
{
  "title": "Plan Your Visit",
  "url": "/visit",
  "layout": "headerFooter",
  "sections": [
    {
      "id": "section-0",
      "purpose": "Welcome first-time visitors with a warm hero that sets expectations and encourages them to visit.",
      "suggestedBackground": "#2c5aa0",
      "suggestedTextColor": "light",
      "suggestedElements": ["text (h1 welcome)", "text (tagline)", "buttonLink (directions)"],
      "contentHints": {
        "headline": "Your First Visit to Grace Church",
        "subheadline": "We're excited to meet you! Here's everything you need to know.",
        "ctaText": "Get Directions"
      }
    },
    {
      "id": "section-1",
      "purpose": "Explain what to expect in an easy-to-scan card format.",
      "suggestedBackground": "#F8F9FA",
      "suggestedTextColor": "dark",
      "suggestedElements": ["text (heading)", "row with 3 cards"],
      "contentHints": {
        "headline": "What to Expect",
        "keyPoints": ["Casual dress - come as you are", "Service lasts about 75 minutes", "Children's programs for all ages"]
      }
    },
    {
      "id": "section-2",
      "purpose": "Provide service times and location with a map.",
      "suggestedBackground": "none",
      "suggestedTextColor": "dark",
      "suggestedElements": ["textWithPhoto", "map"],
      "contentHints": {
        "headline": "Service Times & Location",
        "keyPoints": ["Sunday: 9:00 AM & 11:00 AM", "Wednesday: 7:00 PM Bible Study"],
        "subheadline": "Located at 123 Main Street with plenty of free parking"
      }
    },
    {
      "id": "section-3",
      "purpose": "Address common visitor questions.",
      "suggestedBackground": "#f5f5f5",
      "suggestedTextColor": "dark",
      "suggestedElements": ["text (heading)", "faq", "faq", "faq"],
      "contentHints": {
        "headline": "Frequently Asked Questions",
        "keyPoints": ["Where do I park?", "What about my kids?", "What should I wear?"]
      }
    },
    {
      "id": "section-4",
      "purpose": "Encourage visitors to take the next step.",
      "suggestedBackground": "#1a1a1a",
      "suggestedTextColor": "light",
      "suggestedElements": ["text (heading)", "buttonLink"],
      "contentHints": {
        "headline": "We Can't Wait to Meet You",
        "subheadline": "Have questions? We'd love to help you plan your visit.",
        "ctaText": "Contact Us"
      }
    }
  ]
}
```

## Output

Your response must be ONLY valid JSON. Start with { and end with }. No exceptions.
