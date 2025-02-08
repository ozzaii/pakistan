/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  basePath: process.env.NODE_ENV === 'production' ? '/pakistan' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pakistan/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 