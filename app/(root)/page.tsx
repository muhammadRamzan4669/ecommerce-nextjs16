import ProductList from "@/components/layout/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { integralCF } from "@/lib/fonts";
import Image from "next/image";
import NewsletterForm from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Home",
  description: "Find clothes that match your style",
};

// Hero Section Component
function HeroSection() {
  return (
    <section className="bg-[#F2F0F1] dark:bg-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 px-4 pt-10 pb-6 md:px-8 lg:px-[100px] lg:pt-[103px] lg:pb-[116px]">
            <h1 className={`${integralCF.className} text-[36px] leading-[38px] md:text-[48px] md:leading-[48px] lg:text-[64px] lg:leading-[64px] font-bold mb-5 lg:mb-8`}>
              FIND CLOTHES<br />
              THAT MATCHES<br />
              YOUR STYLE
            </h1>
            <p className="text-sm md:text-base text-black/60 dark:text-white/60 mb-6 lg:mb-8 max-w-[545px]">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link 
              href="/products" 
              className="inline-flex items-center justify-center w-full md:w-[210px] h-[52px] bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
            >
              Shop Now
            </Link>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 mt-6 lg:mt-12">
              <div className="flex-1 min-w-[100px] text-center md:text-left pr-4 md:pr-8 border-r border-black/10 dark:border-white/10">
                <p className={`${integralCF.className} text-2xl md:text-[40px] font-bold`}>200+</p>
                <p className="text-xs md:text-base text-black/60 dark:text-white/60">International Brands</p>
              </div>
              <div className="flex-1 min-w-[100px] text-center md:text-left px-4 md:px-8 border-r border-black/10 dark:border-white/10">
                <p className={`${integralCF.className} text-2xl md:text-[40px] font-bold`}>2,000+</p>
                <p className="text-xs md:text-base text-black/60 dark:text-white/60">High-Quality Products</p>
              </div>
              <div className="flex-1 min-w-[100px] text-center md:text-left md:pl-8">
                <p className={`${integralCF.className} text-2xl md:text-[40px] font-bold`}>30,000+</p>
                <p className="text-xs md:text-base text-black/60 dark:text-white/60">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex-1 min-h-[448px] lg:min-h-[663px] overflow-hidden">
            <Image
              src="/images/banner-1.jpg"
              alt="Hero fashion models"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Decorative stars */}
            <div className="absolute top-10 right-10 lg:top-20 lg:right-20">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="w-10 h-10 lg:w-14 lg:h-14">
                <path d="M28 0L34.3 21.7L56 28L34.3 34.3L28 56L21.7 34.3L0 28L21.7 21.7L28 0Z" fill="black" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-10 lg:bottom-40 lg:left-20">
              <svg width="104" height="104" viewBox="0 0 104 104" fill="none" className="w-16 h-16 lg:w-[104px] lg:h-[104px]">
                <path d="M52 0L63.8 40.2L104 52L63.8 63.8L52 104L40.2 63.8L0 52L40.2 40.2L52 0Z" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <div className="bg-black dark:bg-white">
        <div className="max-w-[1440px] mx-auto px-4 py-6 lg:px-[100px] lg:py-11">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:justify-between">
            <BrandLogo name="VERSACE" />
            <BrandLogo name="ZARA" />
            <BrandLogo name="GUCCI" />
            <BrandLogo name="PRADA" />
            <BrandLogo name="Calvin Klein" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ name }: { name: string }) {
  return (
    <span className={`${integralCF.className} text-white dark:text-black text-xl md:text-2xl lg:text-[32px] font-bold tracking-wider`}>
      {name}
    </span>
  );
}

// New Arrivals Section
async function NewArrivalsSection() {
  const products = await getLatestProducts();
  return (
    <section className="py-12 lg:py-[72px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <h2 className={`${integralCF.className} text-center text-[32px] lg:text-[48px] font-bold mb-[32px] lg:mb-[55px]`}>
          NEW ARRIVALS
        </h2>
        <ProductList products={products} limit={4} />
        <div className="flex justify-center mt-8 lg:mt-9">
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center w-[218px] h-[52px] border border-black/10 dark:border-white/10 rounded-[62px] text-base font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

// Top Selling Section
async function TopSellingSection() {
  const products = await getLatestProducts();
  return (
    <section className="py-12 lg:py-[72px] border-t border-black/10 dark:border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <h2 className={`${integralCF.className} text-center text-[32px] lg:text-[48px] font-bold mb-[32px] lg:mb-[55px]`}>
          TOP SELLING
        </h2>
        <ProductList products={products} limit={4} />
        <div className="flex justify-center mt-8 lg:mt-9">
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center w-[218px] h-[52px] border border-black/10 dark:border-white/10 rounded-[62px] text-base font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

// Browse by Style Section
function BrowseByStyleSection() {
  return (
    <section className="py-12 lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="bg-[#F0F0F0] dark:bg-[#1a1a1a] rounded-[40px] p-[24px] lg:px-[64px] lg:py-[70px]">
          <h2 className={`${integralCF.className} text-center text-[32px] lg:text-[48px] font-bold mb-8 lg:mb-16`}>
            BROWSE BY DRESS STYLE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {/* Casual - Large */}
            <StyleCard 
              title="Casual" 
              image="/images/promo.jpg"
              className="lg:col-span-1 h-[190px] lg:h-[289px]"
            />
            {/* Formal - Large */}
            <StyleCard 
              title="Formal" 
              image="/images/banner-2.jpg"
              className="lg:col-span-2 h-[190px] lg:h-[289px]"
            />
            {/* Party - Large */}
            <StyleCard 
              title="Party" 
              image="/images/banner-1.jpg"
              className="lg:col-span-2 h-[190px] lg:h-[289px]"
            />
            {/* Gym - Small */}
            <StyleCard 
              title="Gym" 
              image="/images/promo.jpg"
              className="lg:col-span-1 h-[190px] lg:h-[289px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StyleCard({ title, image, className }: { title: string; image: string; className?: string }) {
  return (
    <Link 
      href={`/category/${title.toLowerCase()}`}
      className={`relative overflow-hidden rounded-[20px] group ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <h3 className={`${integralCF.className} absolute top-[25px] left-[36px] text-2xl lg:text-[36px] font-bold text-black`}>
        {title}
      </h3>
    </Link>
  );
}

// Happy Customers Section
function HappyCustomersSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      verified: true,
    },
    {
      name: "Alex K.",
      rating: 5,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      verified: true,
    },
    {
      name: "James L.",
      rating: 5,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      verified: true,
    },
  ];

  return (
    <section className="py-12 lg:py-[80px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <h2 className={`${integralCF.className} text-[32px] lg:text-[48px] font-bold`}>
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex gap-4">
            <button className="w-[46px] h-[46px] rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="w-[46px] h-[46px] rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, rating, text, verified }: { name: string; rating: number; text: string; verified: boolean }) {
  return (
    <div className="flex-shrink-0 w-[400px] p-[28px] lg:p-[32px] border border-black/10 dark:border-white/10 rounded-[20px] snap-start">
      {/* Stars */}
      <div className="flex gap-1.5 mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} width="23" height="21" viewBox="0 0 22 20" fill="#FFC633">
            <path d="M11 0L13.4903 6.80041L20.8779 7.02786L14.9673 11.2696L16.9511 18.0721L11 14.14L5.04894 18.0721L7.03272 11.2696L1.12215 7.02786L8.50974 6.80041L11 0Z" />
          </svg>
        ))}
      </div>
      
      {/* Name with verified badge */}
      <div className="flex items-center gap-1 mb-3">
        <span className="font-bold text-base lg:text-xl">{name}</span>
        {verified && (
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <circle cx="9.5" cy="9.5" r="9.5" fill="#01AB31" />
            <path d="M5 9.5L8 12.5L14 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      
      {/* Text */}
      <p className="text-sm lg:text-base text-black/60 dark:text-white/60 leading-relaxed">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

// Newsletter Section
function NewsletterSection() {
  return (
    <section className="py-9 lg:py-0">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="bg-black dark:bg-white rounded-[20px] px-6 py-9 lg:px-16 lg:py-9 -mb-[88px] relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            <h2 className={`${integralCF.className} text-white dark:text-black text-[32px] lg:text-[40px] font-bold max-w-[551px]`}>
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// Loading components
function SectionLoading() {
  return (
    <div className="py-12 lg:py-[72px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="h-12 w-64 bg-muted animate-pulse rounded mx-auto mb-8 lg:mb-[55px]" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-muted animate-pulse rounded-[20px]" />
              <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      <Suspense fallback={<SectionLoading />}>
        <NewArrivalsSection />
      </Suspense>

      <Suspense fallback={<SectionLoading />}>
        <TopSellingSection />
      </Suspense>

      <BrowseByStyleSection />
      
      <HappyCustomersSection />

      <NewsletterSection />
    </div>
  );
}
