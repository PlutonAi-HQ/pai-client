import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "platsbucketdev.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
