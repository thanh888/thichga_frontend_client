import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {},
  },
  output: "export",
};

export default nextConfig;
