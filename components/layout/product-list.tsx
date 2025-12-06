import type { Product } from "@/types";
import ProductCard from "./product-card";

type ProductListProps = {
  title?: string;
  products: Product[];
  limit?: number;
};

export default function ProductList({
  products,
  limit,
}: ProductListProps) {
  const limitedProducts = limit ? products.slice(0, limit) : products;

  return (
    <ul className="grid gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {limitedProducts.length > 0 ? (
        limitedProducts.map((product: Product) => (
          <li key={product.slug}>
            <ProductCard product={product} />
          </li>
        ))
      ) : (
        <li className="col-span-full text-center py-12 text-muted-foreground">
          No Products Found
        </li>
      )}
    </ul>
  );
}
