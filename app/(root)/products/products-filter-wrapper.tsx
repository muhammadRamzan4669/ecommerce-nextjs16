"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductFilters } from "@/components/layout/product-filters";

type ProductsFilterWrapperProps = {
  categories: string[];
};

export default function ProductsFilterWrapper({ categories }: ProductsFilterWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden w-full h-12 border border-black/10 dark:border-white/10 rounded-[62px] text-base font-medium flex items-center justify-center gap-2"
      >
        <SlidersHorizontal className="w-5 h-5" />
        Filters
      </button>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-white dark:bg-black z-50 lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between h-[60px] px-4 border-b border-black/10 dark:border-white/10">
              <span className="font-bold text-lg">Filters</span>
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <ProductFilters categories={categories} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
