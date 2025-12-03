import ProductCard from "./product-card";
import { integralCF } from "@/lib/fonts";

export default function ProductList({ title, products, limit }: { title?: string; products: any; limit?: number }) {
  const limitedProducts = products ? products.slice(0, limit) : products;

  return <>
    <h2 className={`${integralCF.className} text-center  font-bold text-[32px] flex-col flex gap-[32px] lg:gap-[55px] lg:text-[48px]`}>{title}</h2 >

    <ul className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {limitedProducts.length > 0 ?
        limitedProducts.map((product: any) => <ProductCard key={product.name} product={product} />)
        : <>No Products Found</>
      }
    </ul>
  </>
}
