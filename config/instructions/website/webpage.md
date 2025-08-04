# Complete Webpage Creation Guide

This document provides comprehensive instructions for creating a complete webpage (page) consisting of sections and elements in the ContentApi system. It combines the structure from Pages, Sections, and Elements into a unified JSON page object.

## Complete Page Structure

A complete webpage consists of three hierarchical levels:
1. **Page** - The top-level container with URL, title, and layout
2. **Section(s)** - Content zones within the page with styling and positioning
3. **Element(s)** - Individual UI components within sections

## ID Requirements

**IMPORTANT**: All `id` fields must follow these strict requirements:
- **Length**: Exactly 11 characters (char(11))
- **Characters**: Only A-Z, a-z, 0-9, and hyphen (-) are allowed
- **Uniqueness**: Each ID must be unique across the entire page structure
- **Parent References**: Child elements must reference their parent's exact ID in `parentId`, `pageId`, or `sectionId` fields

**Examples of valid IDs:**
- `A1b2C3d4E5f`
- `Kx9Qm7Zp2Vw`
- `3nR8wL5tY9s`
- `B6jH4fN1qWe`

**IMPORTANT**: Do NOT use predictable patterns like "hero-sect01" or "page-001234". Always generate truly random combinations of characters to ensure uniqueness across all pages and elements.

## Full JSON Page Object Structure

```json
{
  "id": "string (required - exactly 11 chars, A-Za-z0-9-)",
  "churchId": "string (optional)",
  "url": "string (optional)",
  "title": "string (optional)",
  "layout": "string (optional)",
  "sections": [
    {
      "id": "string (required - exactly 11 chars, A-Za-z0-9-)",
      "churchId": "string (optional)",
      "pageId": "string (required - must match parent page id)",
      "blockId": "string (optional)",
      "zone": "string (optional)",
      "background": "string (optional)",
      "textColor": "string (optional)",
      "headingColor": "string (optional)",
      "linkColor": "string (optional)",
      "sort": "number (optional)",
      "targetBlockId": "string (optional)",
      "answersJSON": "string (optional)",
      "stylesJSON": "string (optional)",
      "animationsJSON": "string (optional)",
      "elements": [
        {
          "id": "string (required - exactly 11 chars, A-Za-z0-9-)",
          "churchId": "string (optional)",
          "sectionId": "string (required - must match parent section id)",
          "blockId": "string (optional)",
          "elementType": "string (optional)",
          "sort": "number (optional)",
          "parentId": "string (optional - must match parent element id if nested)",
          "answersJSON": "string (optional)",
          "stylesJSON": "string (optional)",
          "animationsJSON": "string (optional)",
          "elements": "Element[] (optional - for nested elements)"
        }
      ]
    }
  ]
}
```

## Page-Level Configuration

### Required Fields
All fields are optional, but typically you'll want to provide:
- `churchId` - Associate with your church/organization
- `url` - The page's URL path
- `title` - Display title for navigation
- `layout` - Layout template to use

### Layout Types
| Layout | Description | Use Case |
|--------|-------------|----------|
| `headerFooter` | Standard layout with header/footer navigation | Most public pages (home, about, sermons) |
| `embed` | Embedded content or iframe-style pages | Member areas, specialized displays |
| `cleanCentered` | Minimal centered content, no navigation | Forms, registration pages |

### URL Patterns
| Pattern | Examples | Description |
|---------|----------|-------------|
| Root pages | `/`, `/aboutus`, `/sermons` | Public-facing content |
| Member pages | `/member/home`, `/member/directory` | Member-only areas |
| Stream pages | `/stream/live`, `/stream/service` | Video content |
| Forms | `/forms/{form-id}` | Form displays |

## Section-Level Configuration

### Required Fields
- `churchId` - Must match the page's churchId
- `zone` - Where the section appears on the page
- `textColor` - Base text color for the section

### Zone Types
| Zone | Description |
|------|-------------|
| `main` | Primary content area (most common) |
| `footer` | Footer area |
| `block` | Block-specific sections |

### Color Formats
| Format | Examples |
|--------|----------|
| CSS Variables | `var(--light)`, `var(--dark)`, `var(--accent)` |
| Hex Colors | `#FFFFFF`, `#012B5D`, `#888888` |
| Named Colors | `light`, `dark` |

### Background Types
| Type | Format | Example |
|------|--------|---------|
| Content Images | `https://content.churchapps.org/{churchId}/gallery/{folder}/{file}.jpg` | Gallery images |
| Stock Photos | `https://content.churchapps.org/stockPhotos/{category}/{name}.png` | Template images |
| YouTube Videos | `youtube:{videoId}` | `youtube:3iXYciBTQ0c` |
| Template Images | `/tempLibrary/backgrounds/{name}.jpg` | Preset backgrounds |
| Colors | Any valid color format | `#FFFFFF`, `var(--primary)` |

## Element Types and Configuration

### Text Elements

#### 1. text
Simple text content with formatting.
```json
{
  "elementType": "text",
  "answersJSON": "{\"text\":\"## Welcome to Our Church\",\"textAlignment\":\"center\"}"
}
```
**Properties:**
- `text` - Content (supports markdown)
- `textAlignment` - `left`, `center`, `right`

#### 2. rawHTML
Custom HTML content.
```json
{
  "elementType": "rawHTML",
  "answersJSON": "{\"rawHTML\":\"<div class='custom'>Custom HTML</div>\",\"javascript\":\"console.log('loaded');\"}"
}
```
**Properties:**
- `rawHTML` - HTML content string
- `javascript` - Optional JavaScript code

### Media Elements

#### 3. image
Display images with optional links.
```json
{
  "elementType": "image",
  "answersJSON": "{\"photo\":\"https://content.churchapps.org/example.jpg\",\"photoAlt\":\"Church building\",\"url\":\"/about-us\",\"external\":false,\"noResize\":false}"
}
```
**Properties:**
- `photo` - Image URL (required)
- `photoAlt` - Alt text for accessibility
- `url` - Optional link URL
- `external` - Boolean for external links
- `noResize` - Boolean to prevent resizing

#### 4. textWithPhoto
Combined text and image layouts.
```json
{
  "elementType": "textWithPhoto",
  "answersJSON": "{\"text\":\"### Welcome Message\",\"textAlignment\":\"center\",\"photo\":\"https://example.com/photo.jpg\",\"photoAlt\":\"Pastor\",\"photoPosition\":\"left\"}"
}
```
**Properties:**
- `text` - Text content (supports markdown)
- `textAlignment` - `left`, `center`, `right`
- `photo` - Image URL
- `photoAlt` - Alt text
- `photoPosition` - `top`, `bottom`, `left`, `right`

#### 5. video
Embedded video content.
```json
{
  "elementType": "video",
  "answersJSON": "{\"videoId\":\"watch?v=sKzd9ysxiW4\"}"
}
```
**Properties:**
- `videoId` - Video ID or URL

#### 6. carousel
Image/content slider.
```json
{
  "elementType": "carousel",
  "answersJSON": "{\"slides\":\"5\",\"autoplay\":\"true\",\"height\":\"400\",\"slide\":0,\"animationOptions\":\"fade\"}"
}
```
**Properties:**
- `slides` - Number of slides
- `slide` - Current slide index
- `autoplay` - Boolean for auto-advance
- `height` - Carousel height
- `animationOptions` - Animation type (`fade`, etc.)

### Layout Elements

#### 7. row
Row container for columns.
```json
{
  "elementType": "row",
  "answersJSON": "{\"columns\":\"4,4,4\",\"mobileSizes\":\"12,12,12\"}"
}
```
**Properties:**
- `columns` - Comma-separated column sizes (1-12 grid)
- `mobileSizes` - Optional mobile column sizes

#### 8. column
Column layout for responsive grids.
```json
{
  "elementType": "column",
  "answersJSON": "{\"size\":6,\"mobileSize\":12,\"mobileOrder\":2}"
}
```
**Properties:**
- `size` - Column width (1-12 grid system)
- `mobileSize` - Optional mobile column width
- `mobileOrder` - Optional mobile display order

#### 9. box
Container element with styling.
```json
{
  "elementType": "box",
  "answersJSON": "{\"background\":\"var(--primary)\",\"textColor\":\"var(--light)\",\"headingColor\":\"var(--accent)\",\"linkColor\":\"var(--lightAccent)\",\"rounded\":\"true\",\"translucent\":\"false\"}"
}
```
**Properties:**
- `background` - Background color/style
- `textColor` - Text color
- `headingColor` - Heading color
- `linkColor` - Link color
- `rounded` - Boolean for rounded corners
- `translucent` - Boolean for transparency

#### 10. whiteSpace
Spacing element.
```json
{
  "elementType": "whiteSpace",
  "answersJSON": "{\"height\":\"50\"}"
}
```
**Properties:**
- `height` - Height in pixels

### Interactive Elements

#### 11. card
Card-style content blocks.
```json
{
  "elementType": "card",
  "answersJSON": "{\"title\":\"Youth Ministry\",\"text\":\"Join us every Friday at 7pm\",\"titleAlignment\":\"center\",\"textAlignment\":\"center\",\"photo\":\"https://example.com/youth.jpg\",\"photoAlt\":\"Youth group\",\"url\":\"/youth\"}"
}
```
**Properties:**
- `title` - Card title
- `text` - Card content
- `titleAlignment` - Title alignment
- `textAlignment` - Text alignment
- `photo` - Optional image URL
- `photoAlt` - Image alt text
- `url` - Optional link URL

#### 12. form
Embedded forms.
```json
{
  "elementType": "form",
  "answersJSON": "{\"formId\":\"cc1ZhwGzuVa\"}"
}
```
**Properties:**
- `formId` - Form identifier

#### 13. donation
Donation widget.
```json
{
  "elementType": "donation",
  "answersJSON": "{}"
}
```
**Properties:** Usually empty

### Specialized Elements

#### 14. stream
Live stream embed.
```json
{
  "elementType": "stream",
  "answersJSON": "{\"offlineContent\":\"hide\",\"mode\":\"video\"}"
}
```
**Properties:**
- `offlineContent` - What to show when offline (`hide` or custom message)
- `mode` - Stream mode (`video`, etc.)

#### 15. map
Embedded maps.
```json
{
  "elementType": "map",
  "answersJSON": "{\"mapAddress\":\"123 Church St, City, State 12345\",\"mapLabel\":\"Main Campus\",\"mapZoom\":16}"
}
```
**Properties:**
- `mapAddress` - Address to display
- `mapLabel` - Optional label
- `mapZoom` - Zoom level (1-20)

#### 16. iframe
Embedded external content.
```json
{
  "elementType": "iframe",
  "answersJSON": "{\"iframeSrc\":\"https://calendar.google.com/calendar/embed\",\"iframeHeight\":\"600\"}"
}
```
**Properties:**
- `iframeSrc` - Source URL
- `iframeHeight` - Height in pixels

#### 17. faq
FAQ accordion item.
```json
{
  "elementType": "faq",
  "answersJSON": "{\"headingType\":\"h4\",\"title\":\"What time is service?\",\"description\":\"Our services are at 9am and 11am on Sundays.\"}"
}
```
**Properties:**
- `headingType` - Heading level (`h1`-`h6`)
- `title` - Question/title
- `description` - Answer/content

#### 18. calendar
Calendar display.
```json
{
  "elementType": "calendar",
  "answersJSON": "{\"calendarType\":\"curated\",\"calendarId\":\"GYsh2mhWgZL\"}"
}
```
**Properties:**
- `calendarType` - Type of calendar (`curated`, etc.)
- `calendarId` - Calendar identifier

#### 19. block
Reference to another block.
```json
{
  "elementType": "block",
  "answersJSON": "{\"targetBlockId\":\"VLlTtD7jLYp\"}"
}
```
**Properties:**
- `targetBlockId` - ID of the block to include

#### 20. logo
Logo display.
```json
{
  "elementType": "logo",
  "answersJSON": "{}"
}
```
**Properties:** Usually empty (uses site settings)

#### 21. sermons
Sermon listing widget.
```json
{
  "elementType": "sermons",
  "answersJSON": "{}"
}
```
**Properties:** Usually empty (pulls from sermon data)

## Styling and Animation

### stylesJSON Format
Apply CSS styles with viewport-specific rules:
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

### animationsJSON Format
Define entrance animations:
```json
{
  "onShow": "slideUp",
  "onShowSpeed": "normal"
}
```

**Available Animations:**
- `grow`
- `slideUp`
- `slideDown`
- `fadeIn`

**Speed Options:**
- `slow`
- `normal`
- `fast`

## Complete Example: About Us Page

```json
{
  "id": "Kx9Qm7Zp2Vw",
  "churchId": "church-123",
  "url": "/about-us",
  "title": "About Us",
  "layout": "headerFooter",
  "sections": [
    {
      "id": "A1b2C3d4E5f",
      "churchId": "church-123",
      "pageId": "Kx9Qm7Zp2Vw",
      "zone": "main",
      "background": "https://content.churchapps.org/church-123/gallery/main/hero.jpg",
      "textColor": "#FFFFFF",
      "headingColor": "#FFFFFF",
      "linkColor": "#FFD700",
      "sort": 1,
      "answersJSON": "{\"backgroundOpacity\":\"0.7\"}",
      "stylesJSON": "{\"all\":{\"padding-top\":\"100px\",\"padding-bottom\":\"100px\"}}",
      "elements": [
        {
          "id": "3nR8wL5tY9s",
          "churchId": "church-123",
          "sectionId": "A1b2C3d4E5f",
          "elementType": "text",
          "sort": 1,
          "answersJSON": "{\"text\":\"# Welcome to Our Church\\n\\nWe are a community of believers dedicated to serving God and our neighbors.\",\"textAlignment\":\"center\"}"
        }
      ]
    },
    {
      "id": "B6jH4fN1qWe",
      "churchId": "church-123",
      "pageId": "Kx9Qm7Zp2Vw",
      "zone": "main",
      "background": "#FFFFFF",
      "textColor": "#333333",
      "headingColor": "#012B5D",
      "linkColor": "#007BFF",
      "sort": 2,
      "stylesJSON": "{\"all\":{\"padding\":\"60px 0\"}}",
      "elements": [
        {
          "id": "M8vT2rQ4sLp",
          "churchId": "church-123",
          "sectionId": "B6jH4fN1qWe",
          "elementType": "row",
          "sort": 1,
          "answersJSON": "{\"columns\":\"6,6\",\"mobileSizes\":\"12,12\"}",
          "elements": [
            {
              "id": "F9xN6bG3zHu",
              "churchId": "church-123",
              "sectionId": "B6jH4fN1qWe",
              "parentId": "M8vT2rQ4sLp",
              "elementType": "column",
              "sort": 1,
              "answersJSON": "{\"size\":6,\"mobileSize\":12}",
              "elements": [
                {
                  "id": "P7kD1mJ9wCv",
                  "churchId": "church-123",
                  "sectionId": "B6jH4fN1qWe",
                  "parentId": "F9xN6bG3zHu",
                  "elementType": "textWithPhoto",
                  "sort": 1,
                  "answersJSON": "{\"text\":\"## Meet Our Pastor\\n\\nPastor John has been serving our community for over 15 years.\",\"textAlignment\":\"left\",\"photo\":\"https://content.churchapps.org/church-123/gallery/staff/pastor.jpg\",\"photoAlt\":\"Pastor John\",\"photoPosition\":\"top\"}"
                }
              ]
            },
            {
              "id": "R5qY8nK2tBx",
              "churchId": "church-123",
              "sectionId": "B6jH4fN1qWe",
              "parentId": "M8vT2rQ4sLp",
              "elementType": "column",
              "sort": 2,
              "answersJSON": "{\"size\":6,\"mobileSize\":12}",
              "elements": [
                {
                  "id": "L4uZ7cS6hFg",
                  "churchId": "church-123",
                  "sectionId": "B6jH4fN1qWe",
                  "parentId": "R5qY8nK2tBx",
                  "elementType": "text",
                  "sort": 1,
                  "answersJSON": "{\"text\":\"## Our Mission\\n\\nTo love God, love people, and serve our community with the heart of Christ.\",\"textAlignment\":\"left\"}"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Best Practices

### Page Structure
1. Use descriptive, SEO-friendly URLs
2. Choose appropriate layouts for content type
3. Keep titles concise but informative
4. Always associate with correct churchId

### Section Organization
1. Use `main` zone for primary content
2. Order sections with meaningful sort values
3. Choose backgrounds that complement content
4. Ensure sufficient color contrast for accessibility

### Element Hierarchy
1. Use row/column layout for responsive design
2. Provide alt text for all images
3. Keep carousel slide counts reasonable (3-10)
4. Use semantic heading levels in text content
5. Validate all JSON before storing

### Performance Considerations
1. Optimize image sizes and formats
2. Use appropriate video hosting services
3. Minimize inline styles in favor of stylesJSON
4. Test mobile layouts thoroughly
5. Use animations sparingly for better performance

### Accessibility
1. Always provide alt text for images
2. Use proper heading hierarchy
3. Ensure sufficient color contrast
4. Test with screen readers
5. Use semantic HTML in rawHTML elements

This comprehensive guide provides all the necessary information to create complete webpages with proper structure, styling, and functionality in the ContentApi system.