import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mada.akarmusic.com",
      },
    ],
  },
};

export default nextConfig;