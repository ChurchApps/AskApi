# Pages Table Documentation

This document outlines how to create and manage Page records in the ContentApi system.

## Page Model Structure

The Page class contains the following properties:

- **id** (string, optional): Unique identifier for the page (e.g., '_1OjWEX4e8K')
- **churchId** (string, optional): Unique identifier for the church/organization (e.g., 'fM0I5GEMmds')
- **url** (string, optional): The URL path for the page (e.g., '/aboutus', '/', '/member/page-name')
- **title** (string, optional): Display title of the page (e.g., 'About Us', 'Home')
- **layout** (string, optional): Layout template to use for rendering the page
- **sections** (Section[], optional): Array of Section objects that define the page content structure

## Layout Types

Based on the sample data, there are three main layout types:

### 1. headerFooter
- Most common layout type
- Includes standard header and footer navigation
- Used for public-facing pages like home, about, sermons, contact
- Examples: Home pages, About Us, Sermons, Contact forms

### 2. embed
- Used for embedded content or iframe-style pages
- Typically used for member-only content or specialized displays
- Common for pages under `/member/` paths
- Examples: Live streams, member directories, forms

### 3. cleanCentered
- Minimal layout with centered content
- No header/footer navigation
- Used for focused content like forms, registration pages
- Examples: Event registration, donation forms

## URL Patterns

### Public Pages
- **Root pages**: `/` (Home)
- **Standard pages**: `/aboutus`, `/sermons`, `/contact`, `/ministries`
- **Functional pages**: `/donate`, `/prayer-request`, `/calendar`

### Member Pages
- **Member area**: `/member/page-name`, `/member/home`, `/member/directory`
- **Streaming**: `/stream/page-name`, `/stream/live`
- **Forms**: `/forms/form-id`

### Special URLs
- **External links**: Full URLs starting with `https://`
- **Multi-language**: `/inicio` (Spanish), `/quem-somos` (Portuguese)

## Common Page Titles

### Navigation Pages
- **Home**: 'Home', 'HOME', 'Inicio'
- **About**: 'About Us', 'About [Church Name]', 'Who We Are'
- **Sermons**: 'View Sermons', 'Sermons', 'Pregações'
- **Contact**: 'Contact', 'Contact Us', 'Get In Touch'

### Ministry Pages
- **Ministries**: 'Ministries', 'Ministry Team'
- **Youth**: 'Youth', 'Youth Ministry'
- **Kids**: 'Kids', 'Children', 'BCC Kids'
- **Groups**: 'Groups', 'Small Groups'

### Functional Pages
- **Giving**: 'Give', 'Donate', 'Online Giving', 'Support [Church Name]'
- **Events**: 'Events', 'Calendar', 'Church Calendar'
- **Prayer**: 'Prayer Request', 'Request Prayer'
- **Visit**: 'Visit', 'Plan Your Visit', 'I\'m New Here'

## Creating a New Page Record

To create a new page, you can provide any or all of the following optional properties:

1. **Generate unique ID**: Create a unique identifier (typically alphanumeric) - optional, may be auto-generated
2. **Set churchId**: Associate with the appropriate church/organization
3. **Define URL path**: Choose appropriate URL following the patterns above
4. **Set title**: Descriptive title for navigation and SEO
5. **Choose layout**: Select appropriate layout based on page purpose
6. **Add sections**: Include Section objects to define the page content structure (optional)

### Example Page Creation

```typescript
// Basic page without sections
const basicPage = new Page();
basicPage.id = 'newPageId123';
basicPage.churchId = 'yourChurchId';
basicPage.url = '/new-page';
basicPage.title = 'New Page Title';
basicPage.layout = 'headerFooter';

// Page with sections for content structure
const pageWithSections = new Page();
pageWithSections.id = 'pageWithContent123';
pageWithSections.churchId = 'yourChurchId';
pageWithSections.url = '/about-us';
pageWithSections.title = 'About Us';
pageWithSections.layout = 'headerFooter';
pageWithSections.sections = []; // Array of Section objects
```

## Best Practices

### URL Naming
- Use lowercase, hyphen-separated words
- Keep URLs short and descriptive
- Use consistent patterns across similar page types
- Avoid special characters except hyphens

### Title Guidelines
- Use clear, descriptive titles
- Include church name for key pages when appropriate
- Keep titles concise but informative
- Consider SEO implications

### Layout Selection
- **headerFooter**: Default for most public pages
- **embed**: For specialized content, member areas, or embedded displays
- **cleanCentered**: For forms, registration, or focused single-purpose pages

### Multi-language Support
- Create separate page records for different languages
- Use appropriate language-specific URLs and titles
- Maintain consistent navigation structure across languages

## Content Structure with Sections

Pages can contain structured content through the `sections` property, which is an array of Section objects. This allows for:

- **Modular content**: Break page content into manageable sections
- **Dynamic layouts**: Arrange sections in different configurations
- **Reusable components**: Share sections across multiple pages
- **Content management**: Edit individual sections without affecting the entire page

## TypeScript Usage

```typescript
import { Page } from './models/Page';
import { Section } from './models/Section';

// Create a new page instance
const page = new Page();
page.churchId = 'myChurchId';
page.url = '/welcome';
page.title = 'Welcome to Our Church';
page.layout = 'headerFooter';

// Optionally add sections for content structure
page.sections = [
  // Section objects would be added here
];
```

## Notes

- **Optional properties**: All Page properties are optional, providing flexibility in page creation
- **Member pages**: URLs starting with `/member/` typically use the 'embed' layout
- **Stream pages**: Commonly used for live broadcasts and video content
- **External URLs**: Should include the full protocol (https://)
- **Content structure**: Use the `sections` array to organize page content into manageable components
- **A/B testing**: Some pages may have duplicate titles but different URLs for testing purposes
- **URL flexibility**: The system supports both root-level pages (`/`) and nested pages (`/category/page`)
- **Auto-generation**: The `id` field may be auto-generated if not provided during creation