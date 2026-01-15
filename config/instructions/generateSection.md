# Section Generation

Generate COMPLETE, PRODUCTION-READY content for a SINGLE section. Respond with ONLY valid JSON.

**CRITICAL REQUIREMENTS**:
1. Respond with ONLY valid JSON - no markdown, no explanation
2. Create FULL, RICH CONTENT - each section needs MULTIPLE elements (heading + content + optional CTA)
3. Follow the section outline's suggestedElements list - create ALL suggested elements
4. Transform keyPoints into actual content (cards, FAQs, list items, etc.)
5. Use the church's name and theme colors from context
6. **ROWS MUST HAVE CONTENT**: A row with columns:"4,4,4" MUST have exactly 3 child elements

## Section Outline

{sectionOutline}

## Church Context

{churchContext}

## Available Elements

{availableElementTypes}

## Page Context

{pageContext}

## Output Structure

```json
{
  "zone": "main",
  "background": "hex color or 'none'",
  "textColor": "light | dark",
  "headingColor": "hex (optional)",
  "sort": 0,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [/* MULTIPLE elements here - not just one! */]
}
```

## Element Reference

**text** - Rich text content
```json
{"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>Section Heading</h2><p>Supporting paragraph with details.</p>\",\"textAlignment\":\"center\"}"}
```

**textWithPhoto** - Text with image (photoPosition: "left" or "right")
```json
{"elementType":"textWithPhoto","sort":0,"answersJSON":"{\"text\":\"<h2>Our Mission</h2><p>We exist to connect people with God and each other through authentic community and biblical teaching.</p>\",\"photo\":\"https://picsum.photos/800/600?random=1\",\"photoAlt\":\"Church community\",\"photoPosition\":\"left\"}"}
```

**row** - Multi-column layout. Child count MUST match column count.
```json
{"elementType":"row","sort":1,"answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
  {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=1\",\"photoAlt\":\"Youth\",\"title\":\"Youth Ministry\",\"titleAlignment\":\"center\",\"text\":\"<p>Weekly activities for teens.</p>\",\"textAlignment\":\"center\"}"},
  {"elementType":"card","sort":1,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=2\",\"photoAlt\":\"Worship\",\"title\":\"Worship Team\",\"titleAlignment\":\"center\",\"text\":\"<p>Lead our congregation in praise.</p>\",\"textAlignment\":\"center\"}"},
  {"elementType":"card","sort":2,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=3\",\"photoAlt\":\"Outreach\",\"title\":\"Outreach\",\"titleAlignment\":\"center\",\"text\":\"<p>Serve our neighbors.</p>\",\"textAlignment\":\"center\"}"}
]}
```

**faq** - Expandable FAQ item (create ONE faq element per question)
```json
{"elementType":"faq","sort":1,"answersJSON":"{\"title\":\"What should I wear?\",\"description\":\"<p>Come as you are! We have no dress code. You'll see everything from jeans to suits.</p>\",\"headingType\":\"h6\"}"}
```

**buttonLink** - Styled button
```json
{"elementType":"buttonLink","sort":2,"answersJSON":"{\"buttonLinkText\":\"Plan Your Visit\",\"buttonLinkUrl\":\"/visit\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"primary\"}"}
```

**map**: `{"mapAddress":"123 Main St, City, State","mapLabel":"Church Location","mapZoom":15}`

**whiteSpace**: `{"height":"25"}`

**Simple elements**: sermons, donation, donateLink, calendar, groupList, stream, form, logo

## Styling by Section Index

- Index 0 (hero): padding 120px
- Index 1-3 (content): padding 80px
- Last section (CTA): padding 60px

---

## EXAMPLES - Follow These Patterns

### Example 1: FAQ Section

Input outline:
```json
{
  "id": "section-3",
  "purpose": "Address common visitor questions",
  "suggestedElements": ["text (heading)", "faq", "faq", "faq"],
  "contentHints": {
    "headline": "Frequently Asked Questions",
    "keyPoints": ["Where do I park?", "What about my kids?", "What should I wear?"]
  }
}
```

Output (note: ONE faq element PER question):
```json
{
  "zone": "main",
  "background": "#f5f5f5",
  "textColor": "dark",
  "sort": 3,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>Frequently Asked Questions</h2>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"20\"}"},
    {"elementType":"faq","sort":2,"answersJSON":"{\"title\":\"Where do I park?\",\"description\":\"<p>We have a large parking lot behind the building with plenty of free spaces. Greeters will help direct you to available spots.</p>\",\"headingType\":\"h6\"}"},
    {"elementType":"faq","sort":3,"answersJSON":"{\"title\":\"What about my kids?\",\"description\":\"<p>We offer age-appropriate programs for children from nursery through 5th grade. Check in at our Kids Welcome Center in the main lobby.</p>\",\"headingType\":\"h6\"}"},
    {"elementType":"faq","sort":4,"answersJSON":"{\"title\":\"What should I wear?\",\"description\":\"<p>Come as you are! You'll see everything from jeans and t-shirts to business casual. We care about you, not your clothes.</p>\",\"headingType\":\"h6\"}"}
  ]
}
```

### Example 2: Features Section with Cards

Input outline:
```json
{
  "id": "section-1",
  "purpose": "Highlight what to expect",
  "suggestedElements": ["text (heading)", "row with 3 cards"],
  "contentHints": {
    "headline": "What to Expect",
    "keyPoints": ["Casual dress", "75-minute service", "Children's programs"]
  }
}
```

Output:
```json
{
  "zone": "main",
  "background": "#F8F9FA",
  "textColor": "dark",
  "sort": 1,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>What to Expect</h2><p>Your first visit will be comfortable and welcoming.</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"30\"}"},
    {"elementType":"row","sort":2,"answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
      {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=10\",\"photoAlt\":\"Casual atmosphere\",\"title\":\"Come As You Are\",\"titleAlignment\":\"center\",\"text\":\"<p>There's no dress code here. Whether you prefer jeans or a suit, you'll fit right in.</p>\",\"textAlignment\":\"center\"}"},
      {"elementType":"card","sort":1,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=11\",\"photoAlt\":\"Worship service\",\"title\":\"About 75 Minutes\",\"titleAlignment\":\"center\",\"text\":\"<p>Our services include worship music, a relevant message from Scripture, and time for prayer.</p>\",\"textAlignment\":\"center\"}"},
      {"elementType":"card","sort":2,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=12\",\"photoAlt\":\"Children's ministry\",\"title\":\"Kids Are Welcome\",\"titleAlignment\":\"center\",\"text\":\"<p>We offer safe, fun programs for infants through 5th grade during all services.</p>\",\"textAlignment\":\"center\"}"}
    ]}
  ]
}
```

### Example 3: Hero Section

Input outline:
```json
{
  "id": "section-0",
  "purpose": "Welcome visitors with warm hero",
  "suggestedElements": ["text (h1)", "text (tagline)", "buttonLink"],
  "contentHints": {
    "headline": "Welcome to Grace Church",
    "subheadline": "A place where everyone belongs",
    "ctaText": "Plan Your Visit"
  }
}
```

Output:
```json
{
  "zone": "main",
  "background": "#2c5aa0",
  "textColor": "light",
  "headingColor": "#ffffff",
  "sort": 0,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"120px\",\"padding-bottom\":\"120px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h1>Welcome to Grace Church</h1>\",\"textAlignment\":\"center\"}"},
    {"elementType":"text","sort":1,"answersJSON":"{\"text\":\"<p>A place where everyone belongs. Join us this Sunday as we worship together, grow in faith, and build meaningful relationships.</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":2,"answersJSON":"{\"height\":\"20\"}"},
    {"elementType":"buttonLink","sort":3,"answersJSON":"{\"buttonLinkText\":\"Plan Your Visit\",\"buttonLinkUrl\":\"/visit\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"secondary\"}"}
  ]
}
```

### Example 4: CTA Section

Input outline:
```json
{
  "id": "section-4",
  "purpose": "Drive engagement",
  "suggestedElements": ["text (heading)", "buttonLink"],
  "contentHints": {
    "headline": "Ready to Join Us?",
    "subheadline": "We'd love to meet you this Sunday",
    "ctaText": "Get Directions"
  }
}
```

Output:
```json
{
  "zone": "main",
  "background": "#1a1a1a",
  "textColor": "light",
  "sort": 4,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"60px\",\"padding-bottom\":\"60px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>Ready to Join Us?</h2><p>We'd love to meet you this Sunday. Services are at 9am and 11am.</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"20\"}"},
    {"elementType":"buttonLink","sort":2,"answersJSON":"{\"buttonLinkText\":\"Get Directions\",\"buttonLinkUrl\":\"/location\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"primary\"}"}
  ]
}
```

---

## Key Rules

1. **Multiple elements per section** - Never just a heading alone. Always heading + content.
2. **One faq element per question** - If keyPoints has 3 questions, create 3 faq elements.
3. **Expand keyPoints** - Each keyPoint becomes a card, faq, or content block with full text.
4. **Use church name** from context, never "Our Church".
5. **Increment image numbers** - random=1, random=2, etc. for unique images.

## Output

Your response must be ONLY valid JSON. Start with { and end with }. No exceptions.
