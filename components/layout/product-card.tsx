import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = 20; // Could be dynamic from product
  const originalPrice = Math.round(Number(product.price) * (100 / (100 - discountPercentage)));
  
  return (
    <article className="flex flex-col">
      <Link href={`/product/${product.slug}`} className="block group">
        {/* Product Image */}
        <figure className="relative aspect-square bg-[#F0EEED] dark:bg-[#1F1F1F] rounded-[20px] overflow-hidden mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </figure>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Product Name */}
          <h3 className="font-bold text-base lg:text-xl line-clamp-1 group-hover:underline">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div 
              className="flex items-center gap-[5px]"
              aria-label={`Rating: ${product.rating} out of 5 stars`}
              role="img"
            >
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  width="15" 
                  height="15" 
                  viewBox="0 0 19 19" 
                  fill="none" 
                  className="lg:w-[19px] lg:h-[19px]"
                  aria-hidden="true"
                >
                  <path 
                    d="M9.5 1.5L11.5 7.5L18 7.5L13 11.5L15 17.5L9.5 13.5L4 17.5L6 11.5L1 7.5L7.5 7.5L9.5 1.5Z"
                    fill={i < Math.floor(Number(product.rating)) ? "#FFC633" : "#E5E7EB"} 
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm lg:text-base text-black/60 dark:text-white/60">
              {product.rating}/<span className="text-black/40 dark:text-white/40">5</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            {product.stock > 0 ? (
              <>
                <data value={Number(product.price)} className="font-bold text-xl lg:text-2xl">
                  ${product.price}
                </data>
                {discountPercentage > 0 && (
                  <>
                    <span className="font-bold text-xl lg:text-2xl text-black/30 dark:text-white/30 line-through">
                      ${originalPrice}
                    </span>
                    <span className="px-3.5 py-1.5 bg-[#FF3333]/10 rounded-[62px] text-xs lg:text-sm font-medium text-[#FF3333]">
                      -{discountPercentage}%
                    </span>
                  </>
                )}
              </>
            ) : (
              <span className="font-medium text-destructive">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
