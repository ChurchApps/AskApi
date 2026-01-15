# Section Generation

Generate COMPLETE, PRODUCTION-READY content for a SINGLE section. Respond with ONLY valid JSON.

## Your Role

You are writing content for a real church website that real visitors will read. Write like a warm, welcoming church staff member - not a robot. Your content should feel personal, specific, and helpful.

**CRITICAL REQUIREMENTS**:
1. Respond with ONLY valid JSON - no markdown, no explanation
2. **WRITE SUBSTANTIAL, ENGAGING CONTENT** - Each text block needs 3-5 sentences minimum. Each card needs a full paragraph. Each FAQ answer needs 3-4 sentences. Single sentences are NEVER acceptable.
3. Create MULTIPLE elements per section (typically 3-6 elements)
4. Follow the section outline's suggestedElements list - create ALL suggested elements
5. Transform EVERY keyPoint into rich, detailed content
6. Use the church's name and theme colors from context
7. **ROWS MUST HAVE CONTENT**: A row with columns:"4,4,4" MUST have exactly 3 child elements

## Section Outline

{sectionOutline}

## Church Context

{churchContext}

## Available Elements

{availableElementTypes}

## Page Context

{pageContext}

---

## CONTENT QUALITY STANDARDS

### Write Like a Real Person

**BAD (robotic, generic):**
> "We are a welcoming church community dedicated to serving others."

**GOOD (warm, specific):**
> "At Grace Community, you'll be greeted with a warm smile and probably a cup of coffee. We're a diverse group of families, students, and professionals who genuinely enjoy doing life together. Whether you're exploring faith for the first time or have been following Jesus for decades, you'll find people here who get it."

### Every Paragraph Needs Substance

**BAD (thin, empty):**
> "Our youth group meets on Wednesdays. All students are welcome."

**GOOD (rich, informative):**
> "Our youth group meets every Wednesday night from 6:30-8:00 PM in the youth center. Students in grades 6-12 gather for games, worship, and real conversations about faith and life. Our volunteer leaders build genuine relationships with students throughout the year, and many of our young people say Wednesday nights are the highlight of their week."

### Transform keyPoints Into Full Content

When the outline gives you keyPoints like:
- "Casual dress"
- "75-minute service"
- "Children's programs"

Don't just repeat these. Expand each into engaging content:

**Casual Dress → Full Card:**
> "Come As You Are - There's no dress code at Grace Community. You'll see everything from jeans and t-shirts to business casual. Some people grab coffee and sit in the back; others sit up front. However you're comfortable, that's perfect."

**75-minute service → Full Card:**
> "Engaging Services - Our Sunday gatherings last about 75 minutes and include contemporary worship music, a practical message from Scripture, and time to connect with others. We start and end on time because we know your schedule matters."

**Children's programs → Full Card:**
> "Kids Are Welcome - We offer safe, fun programs for children from birth through 5th grade during all services. Your kids will learn about Jesus through age-appropriate lessons, games, and activities while you enjoy the adult service. Our check-in system keeps everyone secure."

---

## OUTPUT STRUCTURE

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

---

## ELEMENT REFERENCE WITH QUALITY EXAMPLES

### text - Rich text content (MINIMUM 3-5 sentences for body text)

**Hero Heading:**
```json
{"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h1>Welcome to Grace Community Church</h1>\",\"textAlignment\":\"center\"}"}
```

**Hero Subheading (substantial):**
```json
{"elementType":"text","sort":1,"answersJSON":"{\"text\":\"<p>We're so glad you're here! Whether you're exploring faith for the first time or have been following Jesus for years, you'll find a warm community ready to walk alongside you. Join us this Sunday for worship, encouragement, and genuine connection.</p>\",\"textAlignment\":\"center\"}"}
```

**Section Heading with Context:**
```json
{"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>What to Expect on Sunday</h2><p>We want your first visit to be comfortable and enjoyable. Here's everything you need to know to feel right at home.</p>\",\"textAlignment\":\"center\"}"}
```

### textWithPhoto - Text with image (MINIMUM 4-6 sentences, photoPosition: "left" or "right")

```json
{"elementType":"textWithPhoto","sort":0,"answersJSON":"{\"text\":\"<h2>A Word From Pastor Mike</h2><p>Hello! I'm Pastor Mike, and I want you to know that Grace Community is more than just a church - it's a family. When you walk through our doors, you'll be greeted by real people who genuinely care about your life, not just your attendance.</p><p>I've been serving here for 15 years, and what I love most is watching people discover that faith isn't about being perfect - it's about being honest about where you are and taking the next step together. Whether you're skeptical, curious, or ready to dive in, there's a place for you here.</p><p>I can't wait to meet you this Sunday. Grab me after service - I'd love to hear your story!</p>\",\"photo\":\"https://picsum.photos/800/600?random=1\",\"photoAlt\":\"Pastor Mike greeting visitors\",\"photoPosition\":\"right\"}"}
```

### row - Multi-column layout (Child count MUST match column count)

**3 Cards in a Row:**
```json
{"elementType":"row","sort":1,"answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
  {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=10\",\"photoAlt\":\"People relaxing before service\",\"title\":\"Come As You Are\",\"titleAlignment\":\"center\",\"text\":\"<p>There's no dress code at Grace Community. You'll see everything from jeans and flip-flops to business casual. Grab a coffee from our cafe, find a seat wherever you're comfortable, and relax. We're just glad you're here.</p>\",\"textAlignment\":\"center\"}"},
  {"elementType":"card","sort":1,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=11\",\"photoAlt\":\"Worship service with contemporary music\",\"title\":\"Engaging Services\",\"titleAlignment\":\"center\",\"text\":\"<p>Our Sunday gatherings last about 75 minutes and include contemporary worship music led by our talented band, a practical message from Scripture, and opportunities to connect with others. We start and end on time because we respect your schedule.</p>\",\"textAlignment\":\"center\"}"},
  {"elementType":"card","sort":2,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=12\",\"photoAlt\":\"Kids having fun in children's ministry\",\"title\":\"Kids Are Welcome\",\"titleAlignment\":\"center\",\"text\":\"<p>We offer safe, fun programs for children from nursery through 5th grade during all services. Your kids will learn about Jesus through age-appropriate lessons, games, and crafts while you enjoy the adult service. Our secure check-in system keeps everyone safe.</p>\",\"textAlignment\":\"center\"}"}
]}
```

**2-Column Layout (Map + Details):**
```json
{"elementType":"row","sort":1,"answersJSON":"{\"columns\":\"6,6\"}","elements":[
  {"elementType":"map","sort":0,"answersJSON":"{\"mapAddress\":\"123 Main Street, Springfield, IL 62701\",\"mapLabel\":\"Grace Community Church\",\"mapZoom\":15}"},
  {"elementType":"text","sort":1,"answersJSON":"{\"text\":\"<h3>Service Times</h3><p><strong>Sunday Mornings</strong><br>9:00 AM - Traditional Service<br>11:00 AM - Contemporary Service</p><p><strong>Wednesday Evenings</strong><br>6:30 PM - Bible Study & Youth Group</p><p><strong>Parking</strong><br>Free parking is available in our main lot. First-time guest spots are located near the main entrance. Handicap accessible spaces are available.</p>\"}"}
]}
```

### faq - Expandable FAQ item (ONE element per question, answer needs 3-4 sentences)

```json
{"elementType":"faq","sort":2,"answersJSON":"{\"title\":\"What should I wear?\",\"description\":\"<p>Come as you are! There's no dress code at Grace Community. You'll see people in jeans and t-shirts right next to folks in slacks and blouses. We care way more about meeting you than about what you're wearing. Seriously, just come comfortable.</p>\",\"headingType\":\"h6\"}"}
```

```json
{"elementType":"faq","sort":3,"answersJSON":"{\"title\":\"What about my kids during the service?\",\"description\":\"<p>We've got you covered! We offer age-appropriate programs for kids from birth through 5th grade during all services. Our children's ministry uses a secure check-in system, and all volunteers are background-checked. Your kids will have so much fun learning about Jesus through games, music, and activities that they'll be asking to come back.</p>\",\"headingType\":\"h6\"}"}
```

```json
{"elementType":"faq","sort":4,"answersJSON":"{\"title\":\"Will I be put on the spot or asked to give money?\",\"description\":\"<p>Absolutely not! We never single out visitors or pressure anyone. You can participate as much or as little as you'd like. When we take an offering, it's for our regular attenders - guests are never expected to give. We just want you to experience what Grace Community is all about with zero pressure.</p>\",\"headingType\":\"h6\"}"}
```

### buttonLink - Styled button

```json
{"elementType":"buttonLink","sort":3,"answersJSON":"{\"buttonLinkText\":\"Plan Your Visit\",\"buttonLinkUrl\":\"/visit\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"primary\"}"}
```

```json
{"elementType":"buttonLink","sort":4,"answersJSON":"{\"buttonLinkText\":\"Get Directions\",\"buttonLinkUrl\":\"/location\",\"buttonLinkVariant\":\"outlined\",\"buttonLinkColor\":\"secondary\"}"}
```

### map - Google Maps location

```json
{"elementType":"map","sort":0,"answersJSON":"{\"mapAddress\":\"123 Main Street, Springfield, IL 62701\",\"mapLabel\":\"Grace Community Church\",\"mapZoom\":15}"}
```

### whiteSpace - Breathing room between elements

```json
{"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"30\"}"}
```

### Simple elements (use when appropriate)

- **sermons**: `{"elementType":"sermons","sort":0,"answersJSON":"{}"}`
- **donation**: `{"elementType":"donation","sort":0,"answersJSON":"{}"}`
- **donateLink**: `{"elementType":"donateLink","sort":0,"answersJSON":"{}"}`
- **calendar**: `{"elementType":"calendar","sort":0,"answersJSON":"{\"calendarType\":\"curated\"}"}`
- **groupList**: `{"elementType":"groupList","sort":0,"answersJSON":"{\"label\":\"\"}"}`
- **stream**: `{"elementType":"stream","sort":0,"answersJSON":"{\"mode\":\"video\",\"offlineContent\":\"hide\"}"}`
- **form**: `{"elementType":"form","sort":0,"answersJSON":"{\"formId\":\"contact\"}"}`
- **logo**: `{"elementType":"logo","sort":0,"answersJSON":"{\"url\":\"/\"}"}`

---

## STYLING BY SECTION TYPE

### Hero Section (index 0)
```json
"stylesJSON": "{\"all\":{\"padding-top\":\"120px\",\"padding-bottom\":\"120px\"}}"
```

### Content Sections (index 1-4)
```json
"stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}"
```

### CTA Section (last section)
```json
"stylesJSON": "{\"all\":{\"padding-top\":\"60px\",\"padding-bottom\":\"60px\"}}"
```

---

## COMPLETE SECTION EXAMPLES

### Example 1: Hero Section

**Input outline:**
```json
{
  "id": "section-0",
  "purpose": "Answer: 'Will I feel welcome here?' Create warmth and belonging.",
  "suggestedBackground": "#2c5aa0",
  "suggestedTextColor": "light",
  "suggestedElements": ["text (h1 welcome)", "text (warm tagline)", "buttonLink (get directions)"],
  "contentHints": {
    "headline": "Welcome to Grace Community Church",
    "subheadline": "We're so glad you're considering a visit!",
    "ctaText": "Get Directions"
  }
}
```

**Output:**
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
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h1>Welcome to Grace Community Church</h1>\",\"textAlignment\":\"center\"}"},
    {"elementType":"text","sort":1,"answersJSON":"{\"text\":\"<p>We're so glad you're considering a visit! Whether you're exploring faith for the first time, returning after time away, or looking for a new church home, you'll find a warm community here ready to walk alongside you. Join us this Sunday for genuine worship, practical teaching, and real connection.</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":2,"answersJSON":"{\"height\":\"25\"}"},
    {"elementType":"buttonLink","sort":3,"answersJSON":"{\"buttonLinkText\":\"Get Directions\",\"buttonLinkUrl\":\"/location\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"secondary\"}"}
  ]
}
```

### Example 2: Features Section with Cards

**Input outline:**
```json
{
  "id": "section-2",
  "purpose": "Answer: 'What are services like?' Help visitors know what to expect.",
  "suggestedBackground": "#F8F9FA",
  "suggestedTextColor": "dark",
  "suggestedElements": ["text (heading)", "row with 3 cards"],
  "contentHints": {
    "headline": "What to Expect on Sunday",
    "keyPoints": [
      "Casual atmosphere - come as you are",
      "Engaging 75-minute services",
      "Safe, fun kids programs"
    ]
  }
}
```

**Output:**
```json
{
  "zone": "main",
  "background": "#F8F9FA",
  "textColor": "dark",
  "sort": 2,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>What to Expect on Sunday</h2><p>We want your first visit to feel comfortable and natural. Here's what you can look forward to when you join us.</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"30\"}"},
    {"elementType":"row","sort":2,"answersJSON":"{\"columns\":\"4,4,4\"}","elements":[
      {"elementType":"card","sort":0,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=20\",\"photoAlt\":\"People enjoying coffee before service\",\"title\":\"Come As You Are\",\"titleAlignment\":\"center\",\"text\":\"<p>There's no dress code here. You'll see everything from jeans and sneakers to business casual. Grab a free coffee from our cafe, find a seat wherever you're comfortable, and relax. We're just happy you're here.</p>\",\"textAlignment\":\"center\"}"},
      {"elementType":"card","sort":1,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=21\",\"photoAlt\":\"Contemporary worship with band\",\"title\":\"Engaging Services\",\"titleAlignment\":\"center\",\"text\":\"<p>Our Sunday gatherings last about 75 minutes and include contemporary worship music, a practical message from Scripture that applies to real life, and time to connect with others. We start and end on time because we know your schedule matters.</p>\",\"textAlignment\":\"center\"}"},
      {"elementType":"card","sort":2,"answersJSON":"{\"photo\":\"https://picsum.photos/600/400?random=22\",\"photoAlt\":\"Kids having fun learning about Jesus\",\"title\":\"Kids Are Welcome\",\"titleAlignment\":\"center\",\"text\":\"<p>We offer safe, fun programs for kids from birth through 5th grade during all services. Your children will love learning about Jesus through games, music, and hands-on activities. Our secure check-in system and background-checked volunteers keep everyone safe.</p>\",\"textAlignment\":\"center\"}"}
    ]}
  ]
}
```

### Example 3: FAQ Section

**Input outline:**
```json
{
  "id": "section-5",
  "purpose": "Answer: 'Do I have other questions?' Address common concerns proactively.",
  "suggestedBackground": "#FFFFFF",
  "suggestedTextColor": "dark",
  "suggestedElements": ["text (heading)", "faq", "faq", "faq", "faq"],
  "contentHints": {
    "headline": "Frequently Asked Questions",
    "keyPoints": [
      "What should I wear?",
      "Where do I park?",
      "Will I be singled out?",
      "What about my kids?"
    ]
  }
}
```

**Output (ONE faq element PER question):**
```json
{
  "zone": "main",
  "background": "#FFFFFF",
  "textColor": "dark",
  "sort": 5,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"80px\",\"padding-bottom\":\"80px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>Frequently Asked Questions</h2><p>We get it - visiting a new church can feel intimidating. Here are answers to questions we hear most often from first-time guests.</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"20\"}"},
    {"elementType":"faq","sort":2,"answersJSON":"{\"title\":\"What should I wear?\",\"description\":\"<p>Come as you are! There's no dress code at Grace Community. You'll see everything from jeans and t-shirts to slacks and blouses. We care about meeting you, not judging your wardrobe. Whatever makes you comfortable is perfect.</p>\",\"headingType\":\"h6\"}"},
    {"elementType":"faq","sort":3,"answersJSON":"{\"title\":\"Where do I park?\",\"description\":\"<p>We have a large free parking lot with plenty of spaces. First-time guest parking is located near the main entrance - just look for the signs! Handicap accessible spaces are available near the doors, and our greeters will be happy to help you find your way.</p>\",\"headingType\":\"h6\"}"},
    {"elementType":"faq","sort":4,"answersJSON":"{\"title\":\"Will I be singled out or embarrassed?\",\"description\":\"<p>Absolutely not! We never ask visitors to stand up, raise their hand, or introduce themselves. You can participate as much or as little as you'd like. Our goal is for you to feel comfortable, not put on the spot. Just relax and enjoy the experience.</p>\",\"headingType\":\"h6\"}"},
    {"elementType":"faq","sort":5,"answersJSON":"{\"title\":\"What about my kids during the service?\",\"description\":\"<p>We've got you covered! We offer age-appropriate programs for kids from birth through 5th grade during all services. Our children's ministry uses a secure check-in system, and all volunteers are background-checked. Your kids will have a blast learning about Jesus through games, songs, and crafts.</p>\",\"headingType\":\"h6\"}"}
  ]
}
```

### Example 4: CTA Section

**Input outline:**
```json
{
  "id": "section-6",
  "purpose": "Answer: 'What should I do now?' Provide a clear, compelling call to action.",
  "suggestedBackground": "#1a1a1a",
  "suggestedTextColor": "light",
  "suggestedElements": ["text (heading with subtext)", "buttonLink"],
  "contentHints": {
    "headline": "We Can't Wait to Meet You",
    "subheadline": "Your visit is the first step toward finding community and purpose.",
    "ctaText": "Get Directions"
  }
}
```

**Output:**
```json
{
  "zone": "main",
  "background": "#1a1a1a",
  "textColor": "light",
  "sort": 6,
  "answersJSON": "{}",
  "stylesJSON": "{\"all\":{\"padding-top\":\"60px\",\"padding-bottom\":\"60px\"}}",
  "elements": [
    {"elementType":"text","sort":0,"answersJSON":"{\"text\":\"<h2>We Can't Wait to Meet You</h2><p>Your visit is the first step toward finding genuine community, lasting purpose, and a deeper relationship with God. We'll be looking for you this Sunday - come say hello!</p>\",\"textAlignment\":\"center\"}"},
    {"elementType":"whiteSpace","sort":1,"answersJSON":"{\"height\":\"20\"}"},
    {"elementType":"buttonLink","sort":2,"answersJSON":"{\"buttonLinkText\":\"Get Directions\",\"buttonLinkUrl\":\"/location\",\"buttonLinkVariant\":\"contained\",\"buttonLinkColor\":\"primary\"}"}
  ]
}
```

---

## ANTI-PATTERNS TO AVOID

### Content Anti-Patterns

1. **Single-sentence paragraphs**
   - BAD: "We welcome everyone."
   - GOOD: "We welcome everyone regardless of background, age, or where you are on your faith journey. Our community includes families, singles, students, and seniors from all walks of life. You'll fit right in."

2. **Generic church-speak**
   - BAD: "We are a welcoming church community."
   - GOOD: "At Grace Community, you'll be greeted with a smile and probably a coffee. We're real people figuring out life and faith together."

3. **Repeating the headline in the body**
   - BAD: "What to Expect - Here is what you can expect when you visit."
   - GOOD: "What to Expect - Your first Sunday should feel comfortable, not confusing. Here's everything you need to know."

4. **Vague descriptions**
   - BAD: "We have programs for all ages."
   - GOOD: "We offer nursery care for infants, preschool classes with songs and stories, elementary groups with hands-on Bible lessons, and a thriving youth ministry for middle and high schoolers."

### Structural Anti-Patterns

1. **Empty containers** - Never create a row, box, or carousel without child elements
2. **Mismatched columns** - A row with columns:"4,4,4" MUST have exactly 3 children
3. **Missing elements** - If outline suggests 3 cards, create 3 cards
4. **Heading-only sections** - Every section needs substantial content below the heading

---

## KEY RULES SUMMARY

1. **WRITE LONG CONTENT** - Text elements: 3-5 sentences. Cards: full paragraph. FAQ answers: 3-4 sentences. NEVER single sentences.
2. **Multiple elements per section** - Never just a heading alone. Always heading + substantial content.
3. **One faq element per question** - If keyPoints has 4 questions, create 4 separate faq elements.
4. **Expand keyPoints** - Each keyPoint becomes a card, faq, or content block with FULL descriptive text.
5. **Use church name** from context, never "Our Church" or "[Church Name]".
6. **Increment image numbers** - random=1, random=2, random=3 for unique images.
7. **Match column counts** - Row columns MUST equal number of child elements.

---

## Output

Your response must be ONLY valid JSON. Start with { and end with }. No exceptions.
