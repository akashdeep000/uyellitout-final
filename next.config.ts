// import createJiti from "jiti";
import type { NextConfig } from "next";
// import { fileURLToPath } from "node:url";

// const jiti = createJiti(fileURLToPath(import.meta.url));

// jiti("./src/env.ts");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.uyellitout.com",
      },
    ],
  },
};

export default nextConfig;
