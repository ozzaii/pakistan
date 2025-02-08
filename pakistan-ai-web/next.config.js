/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pakistan/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig 