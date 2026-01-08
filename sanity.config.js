import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'gwj5ogbs'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-02'

export default defineConfig({
  // Remove basePath for standalone Sanity Studio hosting
  // basePath: '/studio', // Only needed when embedded in Next.js app
  projectId,
  dataset,
  schema: {
    types: [
      {
        name: 'gallerySection',
        title: 'Gallery Section',
        type: 'document',
        fields: [
          {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
          {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}, validation: (Rule) => Rule.required()},
          {name: 'subtitle', title: 'Subtitle', type: 'string'},
          {name: 'metaText', title: 'Meta Text', type: 'text', rows: 3},
          {name: 'order', title: 'Display Order', type: 'number', validation: (Rule) => Rule.required().min(0)},
          {name: 'images', title: 'Images', type: 'array', of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Alternative Text'}, {name: 'caption', type: 'string', title: 'Caption'}]}]},
        ],
      },
      {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
          {name: 'name', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required()},
          {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name', maxLength: 96}, validation: (Rule) => Rule.required()},
          {name: 'description', title: 'Description', type: 'text', rows: 4},
          {name: 'images', title: 'Product Images', type: 'array', of: [{type: 'image', options: {hotspot: true}}], validation: (Rule) => Rule.required().min(1)},
          {name: 'material', title: 'Material', type: 'string'},
          {name: 'dimensions', title: 'Dimensions', type: 'string'},
          {name: 'price', title: 'Price', type: 'number', validation: (Rule) => Rule.min(0)},
          {name: 'available', title: 'Available', type: 'boolean', initialValue: true},
          {name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false},
        ],
      },
      {
        name: 'siteSettings',
        title: 'Site Settings',
        type: 'document',
        fields: [
          {name: 'title', title: 'Site Title', type: 'string', validation: (Rule) => Rule.required()},
          {name: 'description', title: 'Site Description', type: 'text', rows: 3},
          {name: 'logo', title: 'Site Logo', type: 'image', options: {hotspot: true}},
          {name: 'contactEmail', title: 'Contact Email', type: 'string', validation: (Rule) => Rule.email()},
          {name: 'footerText', title: 'Footer Text', type: 'text', rows: 2},
          {name: 'cvrNumber', title: 'CVR Number', type: 'string'},
          {name: 'address', title: 'Address', type: 'text', rows: 3},
        ],
      },
      {
        name: 'pageContent',
        title: 'Page Content',
        type: 'document',
        fields: [
          {name: 'pageTitle', title: 'Page Title', type: 'string', validation: (Rule) => Rule.required()},
          {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'pageTitle', maxLength: 96}, validation: (Rule) => Rule.required()},
          {name: 'heading', title: 'Heading', type: 'string'},
          {name: 'subheading', title: 'Subheading', type: 'string'},
          {name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]},
          {name: 'image', title: 'Featured Image', type: 'image', options: {hotspot: true}},
        ],
      },
    ],
  },
  plugins: [
    structureTool(),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
