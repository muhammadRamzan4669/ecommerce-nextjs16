import { getProductBySlug, getAllProductSlugs } from "@/lib/actions/product.actions";
import { integralCF } from "@/lib/fonts";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import AddToCart from "@/components/add-to-cart";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for product pages
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  
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

  return (
    <div className="wrapper py-6">
      {/* Main Product Section - Column on mobile, Row on desktop */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

        {/* LEFT SIDE: Image Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-3.5 lg:gap-[14px]">
          {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
          <div className="flex flex-row lg:flex-col gap-3.5 lg:gap-[14px]">
            <div className="w-[111px] h-[106px] lg:w-[152px] lg:h-[167px] rounded-[20px] overflow-hidden bg-[#F0EEED]">
              <Image 
                src={product.images[0]} 
                alt={`${product.name} view 1`} 
                width={152} 
                height={167} 
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 111px, 152px"
              />
            </div>
            <div className="w-[111px] h-[106px] lg:w-[152px] lg:h-[167px] rounded-[20px] overflow-hidden bg-[#F0EEED]">
              <Image 
                src={product.images[1]} 
                alt={`${product.name} view 2`} 
                width={152} 
                height={167} 
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 111px, 152px"
              />
            </div>
            <div className="w-[111px] h-[106px] lg:w-[152px] lg:h-[168px] rounded-[20px] overflow-hidden bg-[#F0EEED]">
              <Image 
                src={product.images[2] || product.images[0]} 
                alt={`${product.name} view 3`} 
                width={152} 
                height={168} 
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 111px, 152px"
              />
            </div>
          </div>

          {/* Main Image */}
          <div className="w-full lg:w-[444px] h-[290px] lg:h-[530px] rounded-[20px] overflow-hidden bg-[#F0EEED]">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              width={444} 
              height={530} 
              className="w-full h-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 444px"
            />
          </div>
        </div>

        {/* RIGHT SIDE: Product Info */}
        <div className="flex-1 flex flex-col">
          {/* Product Title */}
          <h1 className={`${integralCF.className} font-bold text-2xl lg:text-[40px] lg:leading-[48px] mb-3.5`}>
            {product.name}
          </h1>

          {/* Star Rating */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="flex items-center gap-1.5" aria-label={`Rating: ${product.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="19" height="19" viewBox="0 0 19 19" fill="none" className="lg:w-[25px] lg:h-[25px]" aria-hidden="true">
                  <path d="M9.5 1.5L11.5 7.5L18 7.5L13 11.5L15 17.5L9.5 13.5L4 17.5L6 11.5L1 7.5L7.5 7.5L9.5 1.5Z"
                    fill={i < Math.floor(Number(product.rating)) ? "#FFC633" : "#E5E7EB"} />
                </svg>
              ))}
            </div>
            <span className="text-sm lg:text-base font-normal">{product.rating}/5</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2.5 lg:gap-3 mb-5">
            <span className="font-bold text-2xl lg:text-[32px] lg:leading-[43px]">${product.price}</span>
            <span className="font-bold text-2xl lg:text-[32px] lg:leading-[43px] text-black/30 dark:text-white/30 line-through">${Math.round(Number(product.price) * 1.67)}</span>
            <div className="px-3.5 py-1.5 bg-[#FF3333]/10 rounded-[62px]">
              <span className="text-xs lg:text-sm font-medium text-[#FF3333]">-40%</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-black/60 dark:text-white/60 leading-5 lg:leading-[22px] mb-6">
            {product.description}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-6" />

          {/* Select Colors */}
          <div className="mb-6">
            <p className="text-sm lg:text-base text-black/60 dark:text-white/60 mb-4">Select Colors</p>
            <div className="flex items-center gap-4">
              <button className="w-[37px] h-[37px] rounded-full bg-[#4F4631] flex items-center justify-center" aria-label="Select brown color">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="w-[37px] h-[37px] rounded-full bg-[#314F4A]" aria-label="Select green color" />
              <button className="w-[37px] h-[37px] rounded-full bg-[#31344F]" aria-label="Select blue color" />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-6" />

          {/* Choose Size */}
          <div className="mb-6">
            <p className="text-sm lg:text-base text-black/60 dark:text-white/60 mb-4">Choose Size</p>
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <button className="px-5 lg:px-6 py-2.5 lg:py-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-[62px] text-sm lg:text-base text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                Small
              </button>
              <button className="px-5 lg:px-6 py-2.5 lg:py-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-[62px] text-sm lg:text-base text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                Medium
              </button>
              <button className="px-5 lg:px-6 py-2.5 lg:py-3 bg-black dark:bg-white rounded-[62px] text-sm lg:text-base font-medium text-white dark:text-black">
                Large
              </button>
              <button className="px-5 lg:px-6 py-2.5 lg:py-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-[62px] text-sm lg:text-base text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                X-Large
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-6" />

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex items-center justify-between w-full lg:w-[170px] h-[44px] lg:h-[52px] px-5 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-[62px]">
              <button className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center" aria-label="Decrease quantity">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <span className="text-sm lg:text-base font-medium">1</span>
              <button className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center" aria-label="Increase quantity">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <AddToCart 
              item={{
                productId: product.id,
                name: product.name,
                slug: product.slug,
                qty: 1,
                image: product.images[0],
                price: product.price,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
