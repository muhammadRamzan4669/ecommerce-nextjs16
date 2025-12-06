"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react";

type FilterSidebarProps = {
  categories: string[];
  className?: string;
};

const colors = [
  { name: "Green", value: "#00C12B" },
  { name: "Red", value: "#F50606" },
  { name: "Yellow", value: "#F5DD06" },
  { name: "Orange", value: "#F57906" },
  { name: "Cyan", value: "#06CAF5" },
  { name: "Blue", value: "#063AF5" },
  { name: "Purple", value: "#7D06F5" },
  { name: "Pink", value: "#F506A4" },
  { name: "White", value: "#FFFFFF" },
  { name: "Black", value: "#000000" },
];

const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large"];

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export function ProductFilters({ categories, className }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: false,
    sizes: false,
  });

  // Local state for price range
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.get("minPrice")) || 0,
    max: Number(searchParams.get("maxPrice")) || 500,
  });

  const currentCategory = searchParams.get("category") || "";

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      // Reset to page 1 when filters change
      if (!params.hasOwnProperty("page")) {
        newParams.delete("page");
      }

      return newParams.toString();
    },
    [searchParams]
  );

  const applyFilter = (params: Record<string, string | null>) => {
    startTransition(() => {
      const queryString = createQueryString(params);
      router.push(`/products${queryString ? `?${queryString}` : ""}`);
    });
  };

  const clearAllFilters = () => {
    startTransition(() => {
      router.push("/products");
    });
  };

  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <aside className={className}>
      <div className="border border-black/10 dark:border-white/10 rounded-[20px] p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl">Filters</h2>
          <SlidersHorizontal className="w-5 h-5 text-black/40 dark:text-white/40" />
        </div>

        {/* Loading indicator */}
        {isPending && (
          <div className="mb-4 text-sm text-black/60 dark:text-white/60">
            Updating...
          </div>
        )}

        <div className="border-t border-black/10 dark:border-white/10 pt-6 space-y-6">
          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection("categories")}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-bold text-base">Categories</h3>
              {openSections.categories ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openSections.categories && (
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => applyFilter({ category: null })}
                    className={`flex items-center justify-between w-full text-left transition-colors ${
                      !currentCategory
                        ? "text-black dark:text-white font-medium"
                        : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => applyFilter({ category: cat })}
                      className={`flex items-center justify-between w-full text-left transition-colors ${
                        currentCategory.toLowerCase() === cat.toLowerCase()
                          ? "text-black dark:text-white font-medium"
                          : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Range */}
          <div className="border-t border-black/10 dark:border-white/10 pt-6">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-bold text-base">Price</h3>
              {openSections.price ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openSections.price && (
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value),
                    }))
                  }
                  onMouseUp={() =>
                    applyFilter({
                      minPrice: priceRange.min > 0 ? String(priceRange.min) : null,
                      maxPrice: priceRange.max < 500 ? String(priceRange.max) : null,
                    })
                  }
                  onTouchEnd={() =>
                    applyFilter({
                      minPrice: priceRange.min > 0 ? String(priceRange.min) : null,
                      maxPrice: priceRange.max < 500 ? String(priceRange.max) : null,
                    })
                  }
                  className="w-full accent-black dark:accent-white cursor-pointer"
                />
                <div className="flex justify-between text-sm text-black/60 dark:text-white/60">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="border-t border-black/10 dark:border-white/10 pt-6">
            <button
              onClick={() => toggleSection("colors")}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-bold text-base">Colors</h3>
              {openSections.colors ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openSections.colors && (
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-[37px] h-[37px] rounded-full border transition-transform hover:scale-110 ${
                      color.value === "#FFFFFF"
                        ? "border-black/20"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={`Select ${color.name} color`}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sizes */}
          <div className="border-t border-black/10 dark:border-white/10 pt-6">
            <button
              onClick={() => toggleSection("sizes")}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-bold text-base">Size</h3>
              {openSections.sizes ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {openSections.sizes && (
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 rounded-[62px] text-sm transition-colors bg-[#F0F0F0] dark:bg-[#1F1F1F] text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="w-full h-12 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-[62px] text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSort = searchParams.get("sortBy") || "popular";

  const handleSortChange = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "popular") {
        params.delete("sortBy");
      } else {
        params.set("sortBy", value);
      }
      router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-black/60 dark:text-white/60">Sort by:</span>
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        disabled={isPending}
        className="bg-transparent font-medium text-sm outline-none cursor-pointer disabled:opacity-50"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
