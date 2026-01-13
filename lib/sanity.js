import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from '../sanity/config'

// Create Sanity client
export const client = createClient(sanityConfig)

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper to build localized field queries
function localizedField(field, locale) {
  return locale === 'en' ? `coalesce(${field}_en, ${field})` : field
}

// Fetch functions for your content

export async function getGallerySections(locale = 'da') {
  const query = `*[_type == "gallerySection"] | order(order asc) {
    _id,
    "title": ${localizedField('title', locale)},
    slug,
    "subtitle": ${localizedField('subtitle', locale)},
    "metaText": ${localizedField('metaText', locale)},
    images[] {
      asset->,
      alt,
      caption,
      hotspot,
      crop
    }
  }`

  return await client.fetch(query)
}

export async function getGallerySectionBySlug(slug, locale = 'da') {
  const query = `*[_type == "gallerySection" && slug.current == $slug][0] {
    _id,
    "title": ${localizedField('title', locale)},
    "subtitle": ${localizedField('subtitle', locale)},
    "metaText": ${localizedField('metaText', locale)},
    images[] {
      asset->,
      alt,
      caption
    }
  }`

  return await client.fetch(query, { slug })
}

export async function getProducts(locale = 'da') {
  const query = `*[_type == "product"] | order(featured desc, name asc) {
    _id,
    "name": ${localizedField('name', locale)},
    slug,
    "description": ${localizedField('description', locale)},
    images[] {
      asset->
    },
    "material": ${localizedField('material', locale)},
    "dimensions": ${localizedField('dimensions', locale)},
    price,
    available,
    featured
  }`

  return await client.fetch(query)
}

export async function getFeaturedProducts(locale = 'da') {
  const query = `*[_type == "product" && featured == true] {
    _id,
    "name": ${localizedField('name', locale)},
    slug,
    "description": ${localizedField('description', locale)},
    images[] {
      asset->
    },
    "material": ${localizedField('material', locale)},
    price,
    available
  }`

  return await client.fetch(query)
}

export async function getSiteSettings(locale = 'da') {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    title,
    "description": ${localizedField('description', locale)},
    logo {
      asset->
    },
    contactEmail,
    "footerText": ${localizedField('footerText', locale)},
    cvrNumber,
    address
  }`

  return await client.fetch(query)
}

export async function getPageContent(slug, locale = 'da') {
  const query = `*[_type == "pageContent" && slug.current == $slug][0] {
    _id,
    pageTitle,
    "heading": ${localizedField('heading', locale)},
    "subheading": ${localizedField('subheading', locale)},
    "body": ${locale === 'en' ? 'coalesce(body_en, body)' : 'body'},
    image {
      asset->,
      hotspot,
      crop
    }
  }`

  return await client.fetch(query, { slug })
}

export async function getContactSection(locale = 'da') {
  const query = `*[_type == "contactSection"][0] {
    _id,
    "title": ${localizedField('title', locale)},
    "subtitle": ${localizedField('subtitle', locale)},
    "successTitle": ${localizedField('successTitle', locale)},
    "successMessage": ${localizedField('successMessage', locale)},
    "emailFallbackText": ${localizedField('emailFallbackText', locale)},
    contactEmail,
    "buttonText": ${localizedField('buttonText', locale)}
  }`

  return await client.fetch(query)
}
