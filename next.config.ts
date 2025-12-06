import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Enable "use cache" directive (Next.js 16 stable caching API)
  cacheComponents: true,
  
  // Exclude better-auth from server bundling (Turbopack compatibility)
  // This prevents the "Failed to load chunk" error with better-auth's dialect module
  serverExternalPackages: ["better-auth"],
  
  // Enable experimental features
  experimental: {
    // Enable optimized package imports for better performance
    optimizePackageImports: ["lucide-react"],
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
