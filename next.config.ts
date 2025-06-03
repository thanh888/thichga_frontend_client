import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Optional: Add custom rewrites if needed
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/[slug]",
      },
    ];
  },
};

export default nextConfig;
