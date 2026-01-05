/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel deployment with serverless functions
  images: {
    unoptimized: true, // Keep unoptimized for Sanity images
  },

  // Disable type checking during build (TypeScript errors won't block deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig