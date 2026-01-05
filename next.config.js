/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: 'output: export' is incompatible with Sanity Studio
  // Uncomment the line below only when building for static deployment (without studio)
  // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // If your GitHub Pages uses a subdirectory (e.g., username.github.io/knapvaerk)
  // uncomment and set basePath:
  // basePath: '/knapvaerk',

  // For custom domain or root deployment, leave basePath commented out
}

module.exports = nextConfig