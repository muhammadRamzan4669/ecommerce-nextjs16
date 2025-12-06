import type { Product } from "@/types";
import ProductCard from "./product-card";
import { integralCF } from "@/lib/fonts";

type ProductListProps = {
  title?: string;
  products: Product[];
  limit?: number;
};

export default function ProductList({
  title,
  products,
  limit,
}: ProductListProps) {
  const limitedProducts = limit ? products.slice(0, limit) : products;

  return (
    <>
      {title && (
        <h2
          className={`${integralCF.className} text-center font-bold text-[32px] flex-col flex gap-8 lg:gap-[55px] lg:text-[48px]`}
        >
          {title}
        </h2>
      )}

      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {limitedProducts.length > 0 ? (
          limitedProducts.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))
        ) : (
          <li className="col-span-full text-center text-muted-foreground">
            No Products Found
          </li>
        )}
      </ul>
    </>
  );
}
