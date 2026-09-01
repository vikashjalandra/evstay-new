import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16.3+ with Vercel's adapter ENOENTs on missing .next/next-server.js.nft.json
  // when standalone is on. Keep standalone for Docker/Cloud Run only.
  output: process.env.VERCEL ? undefined : "standalone",
  allowedDevOrigins: ["10.250.118.182"],
};

export default nextConfig;
