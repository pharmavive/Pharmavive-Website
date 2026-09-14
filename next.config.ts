// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'geist'],
  },
  async redirects() {
    return [
      {
        source: '/products/category/stable-isotopes',
        destination: '/products/category/reagents',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
