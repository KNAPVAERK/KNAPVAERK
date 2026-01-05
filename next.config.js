/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (Sanity Studio is separate)
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // For custom domain deployment (www.knapvaerk.com)

  // Disable type checking during build (TypeScript errors won't block deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig