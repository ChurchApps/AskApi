# Page Outline Generation

Create a STRUCTURAL OUTLINE for a webpage. Respond with ONLY valid JSON.

## Input

**User Request:** {prompt}

**Church Context:** {churchContext}

**Available Elements:** {availableElementTypes}

**Constraints:** {constraints}

## Output Structure

```json
{
  "title": "Page Title",
  "url": "/page-url",
  "layout": "headerFooter",
  "sections": [
    {
      "id": "section-0",
      "purpose": "2-3 sentence description",
      "suggestedBackground": "#hex or 'none'",
      "suggestedTextColor": "light|dark",
      "suggestedElements": ["text (h1)", "buttonLink (CTA)"],
      "contentHints": {
        "headline": "Main heading",
        "subheadline": "Supporting text",
        "keyPoints": ["point 1", "point 2"],
        "ctaText": "Button text"
      }
    }
  ]
}
```

## Section Pattern (4-6 sections)

1. **Hero (index 0)**: Primary color bg, light text. h1 + tagline + CTA button.
2. **Features (index 1)**: Light bg (#F8F9FA), dark text. Row of 3 cards OR textWithPhoto.
3. **Content (index 2-3)**: Alternate white/colored. textWithPhoto, FAQs, tables as needed.
4. **CTA (last)**: Dark bg (#1a1a1a) or primary color. Heading + button.

## Element Selection

- Sermons/worship → `sermons`
- Events → `calendar`
- Giving → `donation` or `donateLink`
- Contact → `form` + `map`
- Groups → `groupList`
- Multiple items → `row` with `card` elements
- Q&A → `faq` elements
- Streaming → `stream`

## Content Hint Rules

- Use church name in headlines, NOT "Our Church"
- keyPoints: specific info, not "Point 1, Point 2"
- ctaText: action verbs like "Plan Your Visit", "Get Involved"

## Output

Response is ONLY the JSON object - no markdown, no explanation.
