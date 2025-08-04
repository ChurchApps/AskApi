# Elements Table Structure Documentation

## Overview
The `elements` table stores various UI components that can be used to build pages in the ContentApi. Each element has a specific type and associated configuration data stored in JSON fields.

## Element Model Structure

### Database Fields (stored in table)
- **id**: Unique identifier for the element (string, optional)
- **churchId**: Church identifier that owns this element (string, optional)
- **sectionId**: Section this element belongs to (string, optional)
- **blockId**: Optional block identifier (string, optional)
- **elementType**: The type of element (string, optional - see Element Types below)
- **sort**: Numeric value for ordering elements (number, optional - supports decimals for fine-grained control)
- **parentId**: Optional parent element ID for nested structures (string, optional)
- **answersJSON**: JSON string containing element-specific configuration (string, optional)
- **stylesJSON**: JSON string containing CSS styles (string, optional)
- **animationsJSON**: JSON string containing animation settings (string, optional)

### Runtime Properties (populated from JSON fields)
- **answers**: Parsed object from answersJSON containing element configuration (any, optional)
- **styles**: Parsed object from stylesJSON containing CSS properties (any, optional)
- **animations**: Parsed object from animationsJSON containing animation settings (any, optional)
- **elements**: Array of child elements for hierarchical structures (Element[], optional)

## Element Types and Configuration

### 1. **text**
Simple text content with formatting options.

**answersJSON fields:**
- `text`: The text content (supports markdown)
- `textAlignment`: Alignment option (`left`, `center`, `right`)

Example:
```json
{
  "text": "## Welcome to Our Church",
  "textAlignment": "center"
}
```

### 2. **rawHTML**
Raw HTML content for custom layouts.

**answersJSON fields:**
- `rawHTML`: HTML content string
- `javascript`: Optional JavaScript code

Example:
```json
{
  "rawHTML": "<div class='custom'>Custom HTML</div>",
  "javascript": "console.log('loaded');"
}
```

### 3. **image**
Display images with optional links.

**answersJSON fields:**
- `photo`: Image URL
- `photoAlt`: Alt text for accessibility
- `url`: Optional link URL
- `external`: Boolean for external links
- `noResize`: Boolean to prevent resizing

Example:
```json
{
  "photo": "https://content.churchapps.org/example.jpg",
  "photoAlt": "Church building",
  "url": "/about-us",
  "external": false
}
```

### 4. **textWithPhoto**
Combined text and image layouts.

**answersJSON fields:**
- `text`: Text content (supports markdown)
- `textAlignment`: Text alignment
- `photo`: Image URL
- `photoAlt`: Alt text
- `photoPosition`: Position (`top`, `bottom`, `left`, `right`)

Example:
```json
{
  "text": "### Welcome Message",
  "textAlignment": "center",
  "photo": "https://example.com/photo.jpg",
  "photoAlt": "Pastor",
  "photoPosition": "left"
}
```

### 5. **column**
Column layout for responsive grids.

**answersJSON fields:**
- `size`: Column width (1-12 grid system)
- `mobileSize`: Optional mobile column width
- `mobileOrder`: Optional mobile display order

Example:
```json
{
  "size": 6,
  "mobileSize": 12,
  "mobileOrder": 2
}
```

### 6. **row**
Row container for columns.

**answersJSON fields:**
- `columns`: Comma-separated column sizes
- `mobileSizes`: Optional mobile column sizes

Example:
```json
{
  "columns": "4,4,4",
  "mobileSizes": "12,12,12"
}
```

### 7. **carousel**
Image/content slider.

**answersJSON fields:**
- `slides`: Number of slides
- `slide`: Current slide index
- `autoplay`: Boolean for auto-advance
- `height`: Carousel height
- `animationOptions`: Animation type (e.g., "fade")

Example:
```json
{
  "slides": "5",
  "autoplay": "true",
  "height": "400",
  "slide": 0
}
```

### 8. **video**
Embedded video content.

**answersJSON fields:**
- `videoId`: Video ID or URL

Example:
```json
{
  "videoId": "watch?v=sKzd9ysxiW4"
}
```

### 9. **form**
Embedded forms.

**answersJSON fields:**
- `formId`: Form identifier

Example:
```json
{
  "formId": "cc1ZhwGzuVa"
}
```

### 10. **donation**
Donation widget (typically no configuration needed).

**answersJSON fields:** Usually empty or NULL

### 11. **stream**
Live stream embed.

**answersJSON fields:**
- `offlineContent`: What to show when offline (`hide` or custom message)
- `mode`: Stream mode (e.g., "video")

Example:
```json
{
  "offlineContent": "hide",
  "mode": "video"
}
```

### 12. **map**
Embedded maps.

**answersJSON fields:**
- `mapAddress`: Address to display
- `mapLabel`: Optional label
- `mapZoom`: Zoom level (1-20)

Example:
```json
{
  "mapAddress": "123 Church St, City, State 12345",
  "mapLabel": "Main Campus",
  "mapZoom": 16
}
```

### 13. **iframe**
Embedded external content.

**answersJSON fields:**
- `iframeSrc`: Source URL
- `iframeHeight`: Height in pixels

Example:
```json
{
  "iframeSrc": "https://calendar.google.com/calendar/embed",
  "iframeHeight": "600"
}
```

### 14. **card**
Card-style content blocks.

**answersJSON fields:**
- `title`: Card title
- `text`: Card content
- `titleAlignment`: Title alignment
- `textAlignment`: Text alignment
- `photo`: Optional image URL
- `photoAlt`: Image alt text
- `url`: Optional link URL

Example:
```json
{
  "title": "Youth Ministry",
  "text": "Join us every Friday at 7pm",
  "titleAlignment": "center",
  "textAlignment": "center",
  "photo": "https://example.com/youth.jpg",
  "url": "/youth"
}
```

### 15. **box**
Container element with styling.

**answersJSON fields:**
- `background`: Background color/style
- `textColor`: Text color
- `headingColor`: Heading color
- `linkColor`: Link color
- `rounded`: Boolean for rounded corners
- `translucent`: Boolean for transparency

Example:
```json
{
  "background": "var(--primary)",
  "textColor": "var(--light)",
  "rounded": "true"
}
```

### 16. **whiteSpace**
Spacing element.

**answersJSON fields:**
- `height`: Height in pixels

Example:
```json
{
  "height": "50"
}
```

### 17. **faq**
FAQ accordion item.

**answersJSON fields:**
- `headingType`: Heading level (h1-h6)
- `title`: Question/title
- `description`: Answer/content

Example:
```json
{
  "headingType": "h4",
  "title": "What time is service?",
  "description": "Our services are at 9am and 11am on Sundays."
}
```

### 18. **logo**
Logo display (typically uses site settings, no configuration needed).

**answersJSON fields:** Usually NULL

### 19. **sermons**
Sermon listing widget.

**answersJSON fields:** Usually NULL (pulls from sermon data)

### 20. **calendar**
Calendar display.

**answersJSON fields:**
- `calendarType`: Type of calendar (e.g., "curated")
- `calendarId`: Calendar identifier

Example:
```json
{
  "calendarType": "curated",
  "calendarId": "GYsh2mhWgZL"
}
```

### 21. **block**
Reference to another block.

**answersJSON fields:**
- `targetBlockId`: ID of the block to include

Example:
```json
{
  "targetBlockId": "VLlTtD7jLYp"
}
```

## Styling

The `stylesJSON` field can contain CSS properties for any element:

```json
{
  "all": {
    "color": "#FFFFFF",
    "font-size": "18px",
    "margin-top": "20px"
  },
  "desktop": {
    "font-size": "24px"
  },
  "mobile": {
    "font-size": "16px"
  }
}
```

## Animations

The `animationsJSON` field can define entrance animations:

```json
{
  "onShow": "slideUp",
  "onShowSpeed": "normal"
}
```

Available animations:
- `grow`
- `slideUp`
- `slideDown`
- `fadeIn`

Speed options:
- `slow`
- `normal`
- `fast`

## Element Hierarchy

Elements can form hierarchical structures using the `parentId` field and the runtime `elements` array:

- **Parent elements** contain child elements in their `elements` array
- **Child elements** reference their parent via `parentId`
- Common hierarchical patterns:
  - **row** → **column** → content elements
  - **carousel** → slide elements
  - **box** → contained elements

## Working with the Element Model

### Creating Elements
```typescript
const element = new Element();
element.churchId = 'your-church-id';
element.sectionId = 'your-section-id';
element.elementType = 'text';
element.sort = 1.0;
element.answersJSON = JSON.stringify({
  text: "Welcome to our church",
  textAlignment: "center"
});
```

### Parsing JSON Fields
The runtime properties are typically populated by parsing the JSON strings:
```typescript
element.answers = JSON.parse(element.answersJSON || '{}');
element.styles = JSON.parse(element.stylesJSON || '{}');
element.animations = JSON.parse(element.animationsJSON || '{}');
```

### Building Element Trees
Child elements are loaded and attached to build the complete element tree:
```typescript
// Parent element with children
const rowElement = new Element();
rowElement.elementType = 'row';
rowElement.elements = [columnElement1, columnElement2];

// Child elements reference parent
columnElement1.parentId = rowElement.id;
columnElement2.parentId = rowElement.id;
```

## Best Practices

1. Use appropriate element types rather than rawHTML when possible
2. Always provide alt text for images
3. Use the grid system (rows/columns) for responsive layouts
4. Keep carousel slide counts reasonable (3-10 slides)
5. Use meaningful IDs for forms and blocks
6. Apply styles through stylesJSON rather than inline styles in text content
7. Test mobile layouts using mobileSize and mobileOrder properties
8. Always validate JSON before storing in JSON fields
9. Use the `elements` array for hierarchical relationships rather than manual queries
10. Maintain proper parent-child relationships with `parentId` references