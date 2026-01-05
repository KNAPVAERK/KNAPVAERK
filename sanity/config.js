// This file will be used to connect to your Sanity project
// You'll get these values when you create your Sanity project

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you need real-time data
}

// For development, create a .env.local file with:
// NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
// NEXT_PUBLIC_SANITY_DATASET=production