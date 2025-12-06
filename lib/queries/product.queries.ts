import prisma, { prismaBase } from "../prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { cacheLife, cacheTag } from "next/cache";

export type ProductFilterParams = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price-asc" | "price-desc" | "rating" | "popular";
  page?: number;
  limit?: number;
};

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

// Get filtered products with pagination
export async function getFilteredProducts(params: ProductFilterParams = {}) {
  "use cache";
  cacheTag("products", "filtered-products");
  cacheLife("hours");

  const {
    q,
    category,
    minPrice,
    maxPrice,
    sortBy = "newest",
    page = 1,
    limit = 9,
  } = params;

  try {
    // Build where clause
    const where: {
      OR?: Array<{ name?: { contains: string; mode: "insensitive" }; description?: { contains: string; mode: "insensitive" } }>;
      category?: { equals: string; mode: "insensitive" };
      price?: { gte?: number; lte?: number };
    } = {};

    // Search query
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Category filter
    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // Build orderBy clause
    type OrderByClause = { createdAt?: "asc" | "desc"; price?: "asc" | "desc"; rating?: "asc" | "desc"; numReviews?: "asc" | "desc" };
    let orderBy: OrderByClause = {};
    switch (sortBy) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "rating":
        orderBy = { rating: "desc" };
        break;
      case "popular":
        orderBy = { numReviews: "desc" };
        break;
      case "newest":
      default:
        orderBy = { createdAt: "desc" };
    }

    // Get total count for pagination
    const totalCount = await prisma.product.count({ where });

    // Get products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      products: JSON.parse(JSON.stringify(products)),
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return {
      products: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

// Get all unique categories
export async function getAllCategories() {
  "use cache";
  cacheTag("products", "categories");
  cacheLife("hours");

  try {
    const products = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return products.map((p) => p.category);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Search products by query string
export async function searchProducts(query: string) {
  "use cache";
  cacheTag("products", "search");
  cacheLife("hours");

  if (!query || query.length < 2) {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
      orderBy: { name: "asc" },
    });

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

// Get product reviews
export async function getProductReviews(productId: string) {
  "use cache";
  cacheTag("reviews", `reviews-${productId}`);
  cacheLife("hours");

  try {
    const reviews = await prismaBase.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}
