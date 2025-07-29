import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify-specific optimizations
  serverExternalPackages: ['storyblok-js-client'],
  
  // Image optimization for Netlify
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable compression
  compress: true,

  // Optimize for production builds
  productionBrowserSourceMaps: false,

  // Output configuration for Netlify
  output: 'standalone',

  // Trailing slash configuration
  trailingSlash: false,

  // SWC minification is enabled by default in Next.js 15

  // Headers for better performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ];
  },

  // Environment variables validation

};

export default nextConfig;
