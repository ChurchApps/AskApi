# Sections Table Structure Documentation

## TypeScript Model Definition

```typescript
export class Section {
  public id?: string;
  public churchId?: string;
  public pageId?: string;
  public blockId?: string;
  public zone?: string;
  public background?: string;
  public textColor?: string;
  public headingColor?: string;
  public linkColor?: string;
  public sort?: number;
  public targetBlockId?: string;
  public answersJSON?: string;
  public stylesJSON?: string;
  public animationsJSON?: string;

  // Runtime properties (not stored in database)
  public answers?: any;
  public styles?: any;
  public animations?: any;
  public elements?: Element[];
  public sections?: Section[];
}
```

## Table Schema

The `sections` table contains the following columns:

| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR | Primary key - alphanumeric string (various formats) |
| churchId | VARCHAR | Foreign key to church - alphanumeric string |
| pageId | VARCHAR | Foreign key to page - alphanumeric string (nullable) |
| blockId | VARCHAR | Foreign key to block - alphanumeric string (nullable) |
| zone | VARCHAR | Section zone placement |
| background | VARCHAR | Background color, image path, or video reference |
| textColor | VARCHAR | Text color value |
| headingColor | VARCHAR | Heading color value (nullable) |
| linkColor | VARCHAR | Link color value (nullable) |
| sort | VARCHAR | Sort order as string (stored as string, used as number in model) |
| targetBlockId | VARCHAR | Target block reference - alphanumeric string (nullable) |
| answersJSON | TEXT | JSON data for answers (nullable) |
| stylesJSON | TEXT | JSON data for styles (nullable) |
| animationsJSON | TEXT | JSON data for animations (nullable) |

## ID Format Patterns

Based on the data, IDs follow different patterns:
- **Legacy Format**: 'SEC' + 8 digits (e.g., 'SEC00000001')
- **Alphanumeric Format**: Random 11-character strings (e.g., '__6z6Rk21p7', '_-pbzTadQuA')
- **Church IDs**: Both 'CHU' + 8 digits and alphanumeric formats
- **Page IDs**: Both 'PAG' + 8 digits and alphanumeric formats
- **Block IDs**: Alphanumeric format

## Zone Types

Sections can be placed in different zones:
- **main**: Primary content area (most common)
- **footer**: Footer area
- **block**: Block-specific sections

## Color Value Formats

Colors can be specified in multiple formats:
- **CSS Variables**: `var(--light)`, `var(--dark)`, `var(--accent)`, `var(--darkAccent)`, `var(--lightAccent)`
- **Hex Colors**: `#FFFFFF`, `#f8f9fa`, `#012B5D`, `#888888`, `#000000`, `#CCCCCC`, etc.
- **Named Colors**: `light`, `dark`

## Background Types

Backgrounds support multiple formats:
- **Content Images**: `https://content.churchapps.org/{churchId}/gallery/{folder}/{filename}.jpg`
- **Stock Photos**: `https://content.churchapps.org/stockPhotos/{category}/{name}.png`
- **YouTube Videos**: `youtube:{videoId}` (e.g., `youtube:3iXYciBTQ0c`)
- **Template Images**: `/tempLibrary/backgrounds/{name}.jpg`
- **Colors**: Any valid color format mentioned above

## Important Type Conversions

Note the following type differences between database and model:
- **sort**: Stored as VARCHAR in database but used as number in TypeScript model
- **JSON fields**: Stored as JSON strings but parsed into objects at runtime:
  - `answersJSON` → `answers`
  - `stylesJSON` → `styles`
  - `animationsJSON` → `animations`
- **Runtime properties**: `elements` and `sections` arrays are populated at runtime, not stored in database

## Creating New Sections

When creating a new section:
1. Generate a unique ID (alphanumeric 11-character string recommended for new entries)
2. Associate with a church (churchId) - required
3. Optionally associate with a page (pageId) OR block (blockId)
4. Set the zone ('main', 'footer', or 'block')
5. Define the background (color, image URL, or video reference)
6. Set textColor (required)
7. Optionally set headingColor and linkColor
8. Assign a sort order (number, but stored as string in database)
9. Optional fields can remain undefined

## JSON Field Usage

### answersJSON
Stores configuration data such as:
- `sectionId`: Section identifier references
- `backgroundOpacity`: Transparency settings (e.g., "0" for transparent)

### stylesJSON
Stores CSS overrides for different viewports:
```json
{
  "all": {"padding-top": "300px"},
  "mobile": {"height": "500px", "width": "360px"}
}
```

### animationsJSON
Currently unused in the provided data samples (always NULL)

## Example Section Creation

```sql
INSERT INTO sections (
    id, churchId, pageId, blockId, zone, 
    background, textColor, headingColor, linkColor, 
    sort, targetBlockId, answersJSON, stylesJSON, animationsJSON
) VALUES (
    'SEC00000008', 
    'CHU00000001', 
    'PAG00000001', 
    NULL, 
    'main',
    'var(--light)', 
    'var(--dark)', 
    'var(--accent)', 
    'var(--darkAccent)',
    '8', 
    NULL, 
    NULL, 
    NULL, 
    NULL
);
```

## Notes

- Sections can exist without a pageId (when associated with blocks or as defaults)
- Zone types include 'main', 'footer', and 'block'
- Sort values determine display order within a zone (string format, often single digits)
- Some sections reference targetBlockId for navigation/linking purposes
- Background images often include an opacity setting in answersJSON
- The stylesJSON field supports responsive design with viewport-specific rules
- Legacy IDs use 'SEC'/'CHU'/'PAG' prefixes, newer entries use alphanumeric strings