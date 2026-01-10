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

// Fetch functions for your content

export async function getGallerySections() {
  const query = `*[_type == "gallerySection"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    metaText,
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

export async function getGallerySectionBySlug(slug) {
  const query = `*[_type == "gallerySection" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    metaText,
    images[] {
      asset->,
      alt,
      caption
    }
  }`
  
  return await client.fetch(query, { slug })
}

export async function getProducts() {
  const query = `*[_type == "product"] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    description,
    images[] {
      asset->
    },
    material,
    dimensions,
    price,
    available,
    featured
  }`
  
  return await client.fetch(query)
}

export async function getFeaturedProducts() {
  const query = `*[_type == "product" && featured == true] {
    _id,
    name,
    slug,
    description,
    images[] {
      asset->
    },
    material,
    price,
    available
  }`
  
  return await client.fetch(query)
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo {
      asset->
    },
    contactEmail,
    footerText,
    cvrNumber,
    address
  }`
  
  return await client.fetch(query)
}

export async function getPageContent(slug) {
  const query = `*[_type == "pageContent" && slug.current == $slug][0] {
    _id,
    pageTitle,
    heading,
    subheading,
    body,
    image {
      asset->
    }
  }`
  
  return await client.fetch(query, { slug })
}