// Re-export queries for backward compatibility
// Note: These are cached queries, not server actions
// Server actions that mutate data should be added here with 'use server'
export { 
  getLatestProducts, 
  getProductBySlug, 
  getAllProductSlugs,
  getFilteredProducts,
  getAllCategories,
  searchProducts,
} from '../queries/product.queries';

export type { ProductFilterParams } from '../queries/product.queries';
