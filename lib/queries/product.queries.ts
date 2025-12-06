import prisma from "../prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { cacheLife, cacheTag } from "next/cache";

// Cache the latest products fetch with Next.js 16 stable API
export async function getLatestProducts() {
  "use cache";
  cacheTag("products");
  cacheLife("hours"); // Revalidate every hour

  try {
    const data = await prisma.product.findMany({
      take: LATEST_PRODUCTS_LIMIT,
      orderBy: { createdAt: "desc" },
    });

    // Convert Prisma objects to plain objects for React 19 serialization
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching latest products:", error);
    return [];
  }
}

// Cache individual product fetches
export async function getProductBySlug(slug: string) {
  "use cache";
  cacheTag("products", `product-${slug}`);
  cacheLife("hours"); // Revalidate every hour

  try {
    const product = await prisma.product.findFirst({
      where: { slug },
    });
    
    // Convert Prisma object to plain object for React 19 serialization
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

// Get all product slugs for static generation
export async function getAllProductSlugs() {
  "use cache";
  cacheTag("products", "product-slugs");
  cacheLife("hours");

  try {
    const products = await prisma.product.findMany({
      select: { slug: true },
    });
    return products.map((p) => p.slug);
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
}
