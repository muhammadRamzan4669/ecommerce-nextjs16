import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Enable "use cache" directive (Next.js 16 stable caching API)
  cacheComponents: true,
  
  // Enable experimental features
  experimental: {
    // Enable optimized package imports for better performance
    optimizePackageImports: ["lucide-react"],
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
