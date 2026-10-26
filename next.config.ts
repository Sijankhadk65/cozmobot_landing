import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 treats `qualities` as an allowlist and defaults it to [75].
    // The product photos are large, smooth-gradient renders: 75 bands them.
    qualities: [75, 90],
  },
  async redirects() {
    return [
      // The Weld OS page is gone; old links and search results land on the
      // platform brief instead of a 404.
      { source: "/omnicron", destination: "/platform", permanent: true },
    ];
  },
};

export default nextConfig;
