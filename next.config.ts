import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: '**', protocol: 'https' }],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile/me',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
