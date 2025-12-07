"use client";

import Link from "next/link";
import { integralCF } from "@/lib/fonts";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1
          className={`${integralCF.className} text-[120px] md:text-[180px] font-bold leading-none text-black/10 dark:text-white/10`}
        >
          404
        </h1>

        {/* Title */}
        <h2
          className={`${integralCF.className} text-2xl md:text-4xl font-bold -mt-8 md:-mt-12 mb-4`}
        >
          PAGE NOT FOUND
        </h2>

        {/* Description */}
        <p className="text-black/60 dark:text-white/60 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-[52px] px-8 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 h-[52px] px-8 border border-black/10 dark:border-white/10 rounded-[62px] text-base font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
          <p className="text-sm text-black/60 dark:text-white/60 mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/products"
              className="text-black dark:text-white hover:underline"
            >
              All Products
            </Link>
            <span className="text-black/20 dark:text-white/20">•</span>
            <Link
              href="/new-arrivals"
              className="text-black dark:text-white hover:underline"
            >
              New Arrivals
            </Link>
            <span className="text-black/20 dark:text-white/20">•</span>
            <Link
              href="/sale"
              className="text-black dark:text-white hover:underline"
            >
              Sale
            </Link>
            <span className="text-black/20 dark:text-white/20">•</span>
            <Link
              href="/brands"
              className="text-black dark:text-white hover:underline"
            >
              Brands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
