# Section Generation

Generate COMPLETE, PRODUCTION-READY content for a SINGLE section. Respond with ONLY valid JSON.

**CRITICAL REQUIREMENTS**:
1. Respond with ONLY valid JSON - no markdown, no explanation
2. Create FULL, RICH CONTENT with complete text and professional layouts
3. Follow the section outline's purpose and suggested elements
4. Use the church's name and theme colors from context
5. Generate complete content (no placeholders like "Lorem ipsum")
6. **ROWS MUST HAVE CONTENT**: A row with columns:"4,4,4" MUST have exactly 3 child elements with full content

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
  "elements": [...]
}
```

## Element Reference

**text** - Rich text content
```json
{"elementType":"text","answersJSON":"{\"text\":\"<h1>Welcome to Grace Church</h1><p>Join us for worship every Sunday at 9am and 11am.</p>\",\"textAlignment\":\"center\"}"}
```

**textWithPhoto** - Text with image (photoPosition: "left" or "right")
```json
{"elementType":"textWithPhoto","answersJSON":"{\"text\":\"<h2>Our Mission</h2><p>We exist to connect people with God and each other through authentic community and biblical teaching.</p>\",\"photo\":\"https://picsum.photos/800/600?random=1\",\"photoAlt\":\"Church community\",\"photoPosition\":\"left\"}"}
```

**row** - Multi-column layout. MUST have child elements matching column count.
```json
{"elementType":"row","answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
  {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=1\",\"photoAlt\":\"Youth ministry\",\"title\":\"Youth Ministry\",\"titleAlignment\":\"center\",\"text\":\"<p>Weekly activities and Bible study for teens grades 6-12.</p>\",\"textAlignment\":\"center\"}"},
  {"elementType":"card","sort":1,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=2\",\"photoAlt\":\"Worship team\",\"title\":\"Worship Team\",\"titleAlignment\":\"center\",\"text\":\"<p>Use your musical gifts to lead our congregation in praise.</p>\",\"textAlignment\":\"center\"}"},
  {"elementType":"card","sort":2,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=3\",\"photoAlt\":\"Community outreach\",\"title\":\"Outreach\",\"titleAlignment\":\"center\",\"text\":\"<p>Serve our neighbors through food drives and local partnerships.</p>\",\"textAlignment\":\"center\"}"}
]}
```
Column options: "6,6" (2 cols), "4,4,4" (3 cols), "3,3,3,3" (4 cols)

**card** - Card with image, title, text
```json
{"elementType":"card","answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=1\",\"photoAlt\":\"Alt text\",\"title\":\"Card Title\",\"titleAlignment\":\"center\",\"text\":\"<p>Descriptive content goes here.</p>\",\"textAlignment\":\"center\",\"url\":\"/learn-more\"}"}
```

**faq** - Expandable FAQ item
```json
{"elementType":"faq","answersJSON":"{\"title\":\"What should I wear?\",\"description\":\"<p>Come as you are! We have no dress code. You'll see everything from jeans to suits.</p>\",\"headingType\":\"h6\"}"}
```

**buttonLink** - Styled button
```json
{"elementType":"buttonLink","answersJSON":"{\"buttonLinkText\":\"Plan Your Visit\",\"buttonLinkUrl\":\"/visit\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"primary\"}"}
```

**table** - Data table
```json
{"elementType":"table","answersJSON":"{\"contents\":[[\"Day\",\"Time\",\"Service\"],[\"Sunday\",\"9:00 AM\",\"Traditional\"],[\"Sunday\",\"11:00 AM\",\"Contemporary\"]],\"head\":true}"}
```

**image**: `{"photo":"https://picsum.photos/1200/600?random=1","photoAlt":"Description","imageAlign":"center"}`

**video**: `{"videoType":"youtube","videoId":"VIDEO_ID"}`

**map**: `{"mapAddress":"123 Main St, City, State 12345","mapLabel":"Church Location","mapZoom":15}`

**whiteSpace**: `{"height":"25"}`

**Simple elements** (minimal config): sermons, donation, donateLink, calendar, groupList, stream, form, logo

## Styling by Section Index

- Index 0 (hero): padding 120px top/bottom
- Index 1-3 (content): padding 80px top/bottom
- Last section (CTA): padding 60px top/bottom

## Content Guidelines

1. **Use church name** from context - never "Our Church"
2. **Transform contentHints**: headline→h1/h2, keyPoints→cards or FAQs, ctaText→button text
3. **Write engaging copy**: Complete sentences, specific details, welcoming tone
4. **Unique images**: Increment picsum random number for each image

## Example: Transforming Content Hints

Input hints:
```json
{"headline":"What to Expect","keyPoints":["Casual dress","75-minute service","Children's programs"]}
```

Output (row with 3 cards):
```json
{
  "zone": "main",
  "background": "#F8F9FA",
  "textColor": "dark",
  "sort": 1,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>What to Expect</h2>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"20\"}"},
    {"elementType":"row","sort":2,"answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
      {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=10\",\"photoAlt\":\"Casual atmosphere\",\"title\":\"Come As You Are\",\"titleAlignment\":\"center\",\"text\":\"<p>There's no dress code here. Whether you prefer jeans or a suit, you'll fit right in.</p>\",\"textAlignment\":\"center\"}"},
      {"elementType":"card","sort":1,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=11\",\"photoAlt\":\"Worship service\",\"title\":\"About 75 Minutes\",\"titleAlignment\":\"center\",\"text\":\"<p>Our services include worship music, a relevant message, and time for prayer.</p>\",\"textAlignment\":\"center\"}"},
      {"elementType":"card","sort":2,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=12\",\"photoAlt\":\"Children's ministry\",\"title\":\"Kids Are Welcome\",\"titleAlignment\":\"center\",\"text\":\"<p>We offer age-appropriate programs for infants through 5th grade.</p>\",\"textAlignment\":\"center\"}"}
    ]}
  ]
}
```

## Output

Your response must be ONLY valid JSON. Start with { and end with }. No exceptions.
