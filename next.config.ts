import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 treats `qualities` as an allowlist and defaults it to [75].
    // The product photos are large, smooth-gradient renders — 75 bands them.
    qualities: [75, 90],
  },
};

export default nextConfig;
