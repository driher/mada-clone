import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  turbopack: {},

  allowedDevOrigins: ["localhost"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.komunikasi.uinsgd.ac.id",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://cms.komunikasi.uinsgd.ac.id/:path*",
      },
    ];
  },

  // REDIRECT VERCEL → DOMAIN UTAMA
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "mada-clone.vercel.app",
          },
        ],
        destination: "https://komunikasi.uinsgd.ac.id/:path*",
        permanent: true,
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,

  // NONAKTIFKAN PWA SAAT DEV
  disable: isDev,
})(nextConfig);