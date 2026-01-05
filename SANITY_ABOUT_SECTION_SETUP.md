# Sanity Schema Setup for About Section (Om KNAPVÆRK)

## Step 1: Create the About Section Schema

Create a new file in your Sanity schema directory:

**File:** `sanity/schemas/aboutSection.js` (or `.ts` if using TypeScript)

```javascript
export default {
  name: 'aboutSection',
  title: 'Om KNAPVÆRK Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the About section',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10,
      description: 'Main content text. Use double line breaks for paragraphs.',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'About Image',
      type: 'image',
      description: 'Featured image for the About section',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
```

## Step 2: Register the Schema

Add the schema to your Sanity configuration file:

**File:** `sanity/schema.js` (or `sanity.config.js` depending on your setup)

```javascript
import aboutSection from './schemas/aboutSection'

export const schema = {
  types: [
    // ... your existing schemas
    aboutSection,
  ],
}
```

## Step 3: Create Content in Sanity Studio

1. Start your Sanity Studio:
   ```bash
   cd sanity
   npm run dev
   ```

2. Navigate to "Om KNAPVÆRK Section" in the studio

3. Click "Create new"

4. Fill in the fields:
   - **Title:** "Om KNAPVÆRK"
   - **Content:** Your about text with double line breaks between paragraphs
   - **Image:** Upload an image that represents your brand
   - **Alt text:** Describe the image for accessibility

5. Click "Publish"

## Step 4: Update Sanity Data Fetching

Update your Sanity data fetching functions:

**File:** `lib/sanity.js`

Add this function:

```javascript
export async function getAboutSection() {
  const query = `*[_type == "aboutSection"][0] {
    title,
    content,
    "image": image.asset->url,
    "imageAlt": image.alt
  }`

  return await client.fetch(query)
}
```

## Step 5: Connect Data to Component

Update your page to fetch and pass the data:

**File:** `app/page.jsx`

```javascript
import { getGallerySections, getSiteSettings, getAboutSection } from '../lib/sanity'

export default async function Home() {
  const gallerySections = await getGallerySections().catch(() => [])
  const siteSettings = await getSiteSettings().catch(() => null)
  const aboutData = await getAboutSection().catch(() => null)

  // ... rest of code

  return (
    <>
      {/* ... other sections ... */}

      <AboutSection data={aboutData} />

      {/* ... */}
    </>
  )
}
```

## Optional: Single Instance Document

If you want only ONE About section (singleton), update the schema:

```javascript
export default {
  name: 'aboutSection',
  title: 'Om KNAPVÆRK',
  type: 'document',
  __experimental_singleton: true, // Only one document
  fields: [
    // ... same fields as above
  ]
}
```

Then update the query:

```javascript
export async function getAboutSection() {
  const query = `*[_type == "aboutSection"] | order(_updatedAt desc)[0] {
    title,
    content,
    "image": image.asset->url,
    "imageAlt": image.alt
  }`

  return await client.fetch(query)
}
```

## Default Content Structure

The component currently uses this fallback content structure:

```javascript
{
  title: 'Om KNAPVÆRK',
  content: 'KNAPVÆRK er et eksklusivt modebrand...\n\nHver knap, hvert stykke...\n\nVores værker er til dem...',
  image: null // Will show placeholder until image is added
}
```

## Image Optimization

When using Sanity images with Next.js Image component, use the `urlFor` helper:

```javascript
import { urlFor } from '../lib/sanity'

// In component:
{data?.image && (
  <Image
    src={urlFor(data.image).width(800).url()}
    alt={data.imageAlt || data.title}
    width={800}
    height={1000}
    // ...
  />
)}
```

## Notes

- The About section uses the same pattern as your Gallery sections
- Content supports line breaks - use `\n\n` for paragraph separation
- Image aspect ratio is set to 4:5 in the CSS for consistent display
- Mobile layout automatically stacks content vertically
- If no image is provided, a placeholder is shown with elegant gradient background
