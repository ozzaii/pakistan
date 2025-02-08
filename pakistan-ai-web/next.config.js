/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/pakistan' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pakistan/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Skip type checking and linting in build
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig 