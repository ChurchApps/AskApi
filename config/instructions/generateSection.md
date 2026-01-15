# Section Generation

Generate COMPLETE, PRODUCTION-READY content for a SINGLE section. Respond with ONLY valid JSON.

**CRITICAL**: Rows MUST have child elements matching column count. "4,4,4" = 3 children. NEVER create empty rows.

## Input

**Section Outline:** {sectionOutline}

**Church Context:** {churchContext}

**Available Elements:** {availableElementTypes}

**Page Context:** {pageContext}

## Output Structure

```json
{
  "zone": "main",
  "background": "hex or 'none'",
  "textColor": "light|dark",
  "headingColor": "hex (optional)",
  "sort": 0,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [{ "elementType": "text", "sort": 0, "answersJSON": "{...}" }]
}
```

## Element Reference

**text**: `{"text":"<h1>Heading</h1><p>Content</p>","textAlignment":"center"}`

**textWithPhoto**: `{"text":"<h2>Title</h2><p>Desc</p>","photo":"https://picsum.photos/800/600?random=1","photoAlt":"Alt","photoPosition":"left|right"}`

**row** (columns: "6,6", "4,4,4", "3,3,3,3"):
```json
{"elementType":"row","answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
  {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=1\",\"title\":\"Title\",\"text\":\"<p>Content</p>\"}"},
  {"elementType":"card","sort":1,"answersJSON":"{...}"},
  {"elementType":"card","sort":2,"answersJSON":"{...}"}
]}
```

**card**: `{"photo":"https://picsum.photos/600/400?random=1","photoAlt":"Alt","title":"Title","titleAlignment":"center","text":"<p>Content</p>","textAlignment":"center"}`

**faq**: `{"title":"Question?","description":"<p>Answer</p>","headingType":"h6"}`

**table**: `{"contents":[["H1","H2"],["R1C1","R1C2"]],"head":true}`

**image**: `{"photo":"https://picsum.photos/1200/600?random=1","photoAlt":"Alt","imageAlign":"center"}`

**video**: `{"videoType":"youtube","videoId":"ID"}`

**map**: `{"mapAddress":"123 Main St","mapLabel":"Location","mapZoom":15}`

**buttonLink**: `{"buttonLinkText":"Click","buttonLinkUrl":"/path","buttonLinkVariant":"contained","buttonLinkColor":"primary"}`

**whiteSpace**: `{"height":"25"}`

**Simple elements** (no config needed): `sermons`, `donation`, `donateLink`, `calendar`, `groupList`, `stream`, `form`, `logo`

## Styling by Index

- Index 0 (hero): padding 120px
- Index 1-3: padding 80px
- Last section: padding 60px

## Rules

1. Use church name from context, not "Our Church"
2. Use theme colors (primaryColor, secondaryColor) from context
3. Transform contentHints: headline→h1/h2, keyPoints→cards/FAQs, ctaText→button
4. Picsum URLs: increment random number for each image
5. All answersJSON must be escaped JSON strings
6. Response is ONLY the JSON object - no markdown, no explanation
