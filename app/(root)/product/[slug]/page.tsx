import { getProductBySlug, getAllProductSlugs, getProductReviews } from "@/lib/actions/product.actions";
import { integralCF } from "@/lib/fonts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import ProductOptions from "@/components/product-options";
import ImageGallery from "@/components/image-gallery";
import ProductReviews from "@/components/product-reviews";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  
  if (slugs.length === 0) {
    return [{ slug: "_placeholder" }];
  }
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch reviews
  const reviews = await getProductReviews(product.id);

  const discountPercentage = product.discount || 0;
  const originalPrice = discountPercentage > 0 
    ? Math.round(Number(product.price) * (100 / (100 - discountPercentage)))
    : null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 py-6">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/category/${product.category?.toLowerCase()}`} className="hover:text-black dark:hover:text-white transition-colors">
          {product.category || "Men"}
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pb-12 lg:pb-20">

        {/* LEFT SIDE: Image Gallery */}
        <ImageGallery images={product.images} productName={product.name} />

        {/* RIGHT SIDE: Product Info */}
        <div className="flex-1 flex flex-col">
          {/* Product Title */}
          <h1 className={`${integralCF.className} font-bold text-2xl lg:text-[40px] lg:leading-[48px] mb-3.5`}>
            {product.name.toUpperCase()}
          </h1>

          {/* Star Rating */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="flex items-center gap-1.5" aria-label={`Rating: ${product.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  width="19" 
                  height="19" 
                  viewBox="0 0 19 19" 
                  fill="none" 
                  className="lg:w-[24px] lg:h-[24px]" 
                  aria-hidden="true"
                >
                  <path 
                    d="M9.5 1.5L11.5 7.5L18 7.5L13 11.5L15 17.5L9.5 13.5L4 17.5L6 11.5L1 7.5L7.5 7.5L9.5 1.5Z"
                    fill={i < Math.floor(Number(product.rating)) ? "#FFC633" : "#E5E7EB"} 
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm lg:text-base font-normal">
              {product.rating}/<span className="text-black/60 dark:text-white/60">5</span>
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2.5 lg:gap-3 mb-5">
            <span className="font-bold text-2xl lg:text-[32px] lg:leading-[43px]">
              ${product.price}
            </span>
            {originalPrice && (
              <>
                <span className="font-bold text-2xl lg:text-[32px] lg:leading-[43px] text-black/30 dark:text-white/30 line-through">
                  ${originalPrice}
                </span>
                <div className="px-3.5 py-1.5 bg-[#FF3333]/10 rounded-[62px]">
                  <span className="text-xs lg:text-sm font-medium text-[#FF3333]">-{discountPercentage}%</span>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-black/60 dark:text-white/60 leading-5 lg:leading-[22px]">
            {product.description}
          </p>

          {/* Product Options (Color, Size, Quantity, Add to Cart) */}
          <ProductOptions 
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              images: product.images,
              stock: product.stock,
            }}
            colors={product.colors}
            sizes={product.sizes}
          />
        </div>
      </div>

      {/* Product Tabs Section */}
      <ProductReviews 
        reviews={reviews} 
        productDescription={product.description}
        productId={product.id}
      />
    </div>
  );
}
