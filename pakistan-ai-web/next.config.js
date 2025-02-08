/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/pakistan' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/pakistan/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig 