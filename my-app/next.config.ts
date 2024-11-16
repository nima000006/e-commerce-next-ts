import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.perfumerh.com"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
};

export default nextConfig;
