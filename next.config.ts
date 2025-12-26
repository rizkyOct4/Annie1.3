import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    proxyClientMaxBodySize: '200mb', // contoh 50MB
  },
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  cacheLife: {
    biweekly: {
      stale: 60 * 60 * 24 * 14, // 14 days
      revalidate: 60 * 60 * 24, // 1 day
      expire: 60 * 60 * 24 * 14, // 14 days
    },
    every5Min: {
      stale: 60 * 10, // 10 min
      revalidate: 60 * 5, // 5 min
      expire: 60 * 60, // 1 hour
    },
  },
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
