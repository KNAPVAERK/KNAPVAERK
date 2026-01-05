/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (Sanity Studio is separate)
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // For custom domain deployment (www.knapvaerk.com)
}

module.exports = nextConfig