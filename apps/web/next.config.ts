import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Recommendations for production
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow external images for now (e.g. from generated content)
      },
    ],
  },
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
};

export default nextConfig;
