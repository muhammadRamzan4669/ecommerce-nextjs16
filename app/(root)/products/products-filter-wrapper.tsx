"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductFilters } from "@/components/layout/product-filters";

type ProductsFilterWrapperProps = {
  categories: string[];
};

export default function ProductsFilterWrapper({
  categories,
}: ProductsFilterWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center justify-center gap-2 h-12 px-6 border border-black/10 dark:border-white/10 rounded-[62px] text-sm font-medium hover:bg-[#F0F0F0] dark:hover:bg-[#1F1F1F] transition-colors"
      >
        <SlidersHorizontal className="w-5 h-5" />
        Filters
      </button>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-[320px] bg-white dark:bg-[#0A0A0A] overflow-y-auto">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#0A0A0A]">
              <span className="font-bold text-lg">Filters</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] dark:hover:bg-[#1F1F1F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <ProductFilters
                categories={categories}
                onApplyAction={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
