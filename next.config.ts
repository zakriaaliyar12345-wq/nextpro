import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "calculating-emu-161.eu-west-1.convex.cloud",
        protocol: "https",
        port: "",
      },
      {
        hostname: "first-bear-408.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;