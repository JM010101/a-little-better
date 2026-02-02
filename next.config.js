/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  // Disable image optimization to avoid Vercel image service issues
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
