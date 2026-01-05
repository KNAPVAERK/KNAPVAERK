// Sanity Studio Schema
// This defines the content structure in your CMS

export const schemaTypes = [
  // Gallery Section (for Udvalgte Værker, Håndværk)
  {
    name: 'gallerySection',
    title: 'Gallery Section',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Section Title',
        type: 'string',
        description: 'E.g., "Udvalgte værker" or "Håndværk"'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        description: 'Used in URL, e.g., "works" or "craft"'
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'text',
        rows: 3
      },
      {
        name: 'metaText',
        title: 'Meta Text',
        type: 'string',
        description: 'Small text like "Håndlavet i Danmark"'
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: 'alt',
                title: 'Alternative Text',
                type: 'string',
                description: 'Important for SEO and accessibility'
              },
              {
                name: 'caption',
                title: 'Caption (optional)',
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        description: 'Lower numbers appear first'
      }
    ],
    orderings: [
      {
        title: 'Display Order',
        name: 'orderAsc',
        by: [
          {field: 'order', direction: 'asc'}
        ]
      }
    ]
  },

  // Product (for future e-commerce)
  {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 5
      },
      {
        name: 'images',
        title: 'Product Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true,
            }
          }
        ]
      },
      {
        name: 'material',
        title: 'Material',
        type: 'string',
        description: 'E.g., "Egetræ", "Horn", "Metal"'
      },
      {
        name: 'dimensions',
        title: 'Dimensions',
        type: 'string',
        description: 'E.g., "40mm diameter"'
      },
      {
        name: 'price',
        title: 'Price (DKK)',
        type: 'number'
      },
      {
        name: 'available',
        title: 'Available for Purchase',
        type: 'boolean',
        initialValue: true
      },
      {
        name: 'featured',
        title: 'Featured Product',
        type: 'boolean',
        initialValue: false
      }
    ]
  },

  // Site Settings (for hero, footer, etc.)
  {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Site Title',
        type: 'string',
        initialValue: 'KNAPVÆRK'
      },
      {
        name: 'description',
        title: 'Site Description',
        type: 'text',
        rows: 3
      },
      {
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
      {
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'string'
      },
      {
        name: 'footerText',
        title: 'Footer Text',
        type: 'text',
        rows: 2
      },
      {
        name: 'cvrNumber',
        title: 'CVR Number',
        type: 'string'
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string'
      }
    ]
  },

  // Page Content (for about/story sections)
  {
    name: 'pageContent',
    title: 'Page Content',
    type: 'document',
    fields: [
      {
        name: 'pageTitle',
        title: 'Page/Section Title',
        type: 'string',
        description: 'E.g., "About", "Our Story", "Process"'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'pageTitle',
        }
      },
      {
        name: 'heading',
        title: 'Heading',
        type: 'string'
      },
      {
        name: 'subheading',
        title: 'Subheading',
        type: 'string'
      },
      {
        name: 'body',
        title: 'Body Content',
        type: 'array',
        of: [
          {
            type: 'block'
          }
        ]
      },
      {
        name: 'image',
        title: 'Featured Image',
        type: 'image',
        options: {
          hotspot: true,
        }
      }
    ]
  }
]