export const schema = {
  types: [
    {
      name: 'gallerySection',
      title: 'Gallery Section',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        },
        {
          name: 'metaText',
          title: 'Meta Text',
          type: 'text',
          rows: 3,
        },
        // English translations
        {
          name: 'title_en',
          title: 'Title (English)',
          type: 'string',
        },
        {
          name: 'subtitle_en',
          title: 'Subtitle (English)',
          type: 'string',
        },
        {
          name: 'metaText_en',
          title: 'Meta Text (English)',
          type: 'text',
          rows: 3,
        },
        {
          name: 'order',
          title: 'Display Order',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(0),
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
                  type: 'string',
                  title: 'Alternative Text',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'product',
      title: 'Product',
      type: 'document',
      fields: [
        {
          name: 'name',
          title: 'Product Name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'name_en',
          title: 'Product Name (English)',
          type: 'string',
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'name',
            maxLength: 96,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        },
        {
          name: 'description_en',
          title: 'Description (English)',
          type: 'text',
          rows: 4,
        },
        {
          name: 'images',
          title: 'Product Images',
          type: 'array',
          of: [{type: 'image', options: {hotspot: true}}],
          validation: (Rule: any) => Rule.required().min(1),
        },
        {
          name: 'material',
          title: 'Material',
          type: 'string',
        },
        {
          name: 'material_en',
          title: 'Material (English)',
          type: 'string',
        },
        {
          name: 'dimensions',
          title: 'Dimensions',
          type: 'string',
        },
        {
          name: 'dimensions_en',
          title: 'Dimensions (English)',
          type: 'string',
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule: any) => Rule.min(0),
        },
        {
          name: 'available',
          title: 'Available',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'featured',
          title: 'Featured Product',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'siteSettings',
      title: 'Site Settings',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Site Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          title: 'Site Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'description_en',
          title: 'Site Description (English)',
          type: 'text',
          rows: 3,
        },
        {
          name: 'logo',
          title: 'Site Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'contactEmail',
          title: 'Contact Email',
          type: 'string',
          validation: (Rule: any) => Rule.email(),
        },
        {
          name: 'footerText',
          title: 'Footer Text',
          type: 'text',
          rows: 2,
        },
        {
          name: 'footerText_en',
          title: 'Footer Text (English)',
          type: 'text',
          rows: 2,
        },
        {
          name: 'cvrNumber',
          title: 'CVR Number',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
      ],
    },
    {
      name: 'pageContent',
      title: 'Page Content',
      type: 'document',
      fields: [
        {
          name: 'pageTitle',
          title: 'Page Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'pageTitle',
            maxLength: 96,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'heading_en',
          title: 'Heading (English)',
          type: 'string',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
        },
        {
          name: 'subheading_en',
          title: 'Subheading (English)',
          type: 'string',
        },
        {
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        },
        {
          name: 'body_en',
          title: 'Body (English)',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        },
        {
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'contactSection',
      title: 'Contact Section',
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Titel',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
          initialValue: 'Kontakt',
        },
        {
          name: 'title_en',
          title: 'Titel (English)',
          type: 'string',
        },
        {
          name: 'subtitle',
          title: 'Undertekst',
          type: 'text',
          rows: 2,
          description: 'Teksten der vises under titlen',
          initialValue: 'For samarbejder, prislister eller personlig rådgivning — skriv til os.',
        },
        {
          name: 'subtitle_en',
          title: 'Undertekst (English)',
          type: 'text',
          rows: 2,
        },
        {
          name: 'successTitle',
          title: 'Success Titel',
          type: 'string',
          description: 'Titel der vises efter formularen er sendt',
          initialValue: 'Tak for din besked',
        },
        {
          name: 'successTitle_en',
          title: 'Success Titel (English)',
          type: 'string',
        },
        {
          name: 'successMessage',
          title: 'Success Besked',
          type: 'text',
          rows: 2,
          description: 'Besked der vises efter formularen er sendt',
          initialValue: 'Jeg læser alt, hvad I skriver. Du hører fra mig inden længe.',
        },
        {
          name: 'successMessage_en',
          title: 'Success Besked (English)',
          type: 'text',
          rows: 2,
        },
        {
          name: 'emailFallbackText',
          title: 'Email Fallback Tekst',
          type: 'string',
          description: 'Tekst med direkte email link',
          initialValue: 'Foretrækkes direkte email? Skriv til',
        },
        {
          name: 'emailFallbackText_en',
          title: 'Email Fallback Tekst (English)',
          type: 'string',
        },
        {
          name: 'contactEmail',
          title: 'Kontakt Email',
          type: 'string',
          validation: (Rule: any) => Rule.email(),
          initialValue: 'info@knapvaerk.com',
        },
        {
          name: 'buttonText',
          title: 'Knap Tekst',
          type: 'string',
          initialValue: 'Send forespørgsel',
        },
        {
          name: 'buttonText_en',
          title: 'Knap Tekst (English)',
          type: 'string',
        },
      ],
    },
  ],
}
