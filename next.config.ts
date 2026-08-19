import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "calculating-emu-161.eu-west-1.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "first-bear-408.convex.cloud",
      },
    ],
  },
};

export default nextConfig;