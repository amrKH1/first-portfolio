/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  // Enable static export for deployment
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig
