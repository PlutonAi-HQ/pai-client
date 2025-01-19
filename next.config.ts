import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
    ],
  },
};

export default nextConfig;
