import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
