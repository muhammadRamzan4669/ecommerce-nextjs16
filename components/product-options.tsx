"use client";

import { useState, useTransition } from "react";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

type ProductOptionsProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    images: string[];
    stock: number;
  };
  colors?: string[];
  sizes?: string[];
};

const defaultColors = [
  { name: "Brown", value: "#4F4631" },
  { name: "Green", value: "#314F4A" },
  { name: "Blue", value: "#31344F" },
];

const defaultSizes = ["Small", "Medium", "Large", "X-Large"];

export default function ProductOptions({ product, colors, sizes }: ProductOptionsProps) {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2); // Default to "Large"

  const colorOptions = colors?.length
    ? colors.map((c, i) => ({ name: `Color ${i + 1}`, value: c }))
    : defaultColors;
  const sizeOptions = sizes?.length ? sizes : defaultSizes;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newValue = prev + delta;
      if (newValue < 1) return 1;
      if (newValue > product.stock) return product.stock;
      return newValue;
    });
  };

  const handleAddToCart = () => {
    startTransition(async () => {
      const selectedColorValue = colorOptions[selectedColor]?.name || undefined;
      const selectedSizeValue = sizeOptions[selectedSize] || undefined;
      
      const item: CartItem = {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        qty: quantity,
        image: product.images[0],
        price: product.price,
        color: selectedColorValue,
        size: selectedSizeValue,
      };

      const result = await addItemToCart(item);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Divider */}
      <div className="w-full h-px bg-black/10 dark:bg-white/10" />

      {/* Select Colors */}
      <div>
        <p className="text-sm lg:text-base text-black/60 dark:text-white/60 mb-4">Select Colors</p>
        <div className="flex items-center gap-4">
          {colorOptions.map((color, index) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(index)}
              className={`w-[37px] h-[37px] rounded-full flex items-center justify-center transition-all ${
                selectedColor === index
                  ? "ring-2 ring-black dark:ring-white ring-offset-2"
                  : "hover:ring-2 hover:ring-black/20 dark:hover:ring-white/20 hover:ring-offset-2"
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
            >
              {selectedColor === index && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black/10 dark:bg-white/10" />

      {/* Choose Size */}
      <div>
        <p className="text-sm lg:text-base text-black/60 dark:text-white/60 mb-4">Choose Size</p>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          {sizeOptions.map((size, index) => (
            <button
              key={size}
              onClick={() => setSelectedSize(index)}
              className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-[62px] text-sm lg:text-base transition-colors ${
                selectedSize === index
                  ? "bg-black dark:bg-white text-white dark:text-black font-medium"
                  : "bg-[#F0F0F0] dark:bg-[#2A2A2A] text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-black/10 dark:bg-white/10" />

      {/* Add to Cart Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between w-full sm:w-[170px] h-[52px] px-5 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-[62px]">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-6 h-6 flex items-center justify-center disabled:opacity-40 transition-opacity"
            aria-label="Decrease quantity"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-base font-medium">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className="w-6 h-6 flex items-center justify-center disabled:opacity-40 transition-opacity"
            aria-label="Increase quantity"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isPending || product.stock === 0}
          className="flex-1 h-[52px] bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-base font-medium hover:bg-black/90 dark:hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader className="animate-spin h-5 w-5" />
              Adding...
            </>
          ) : product.stock === 0 ? (
            "Out of Stock"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>

      {/* Stock info */}
      {product.stock > 0 && product.stock <= 5 && (
        <p className="text-sm text-[#FF3333]">
          Only {product.stock} left in stock!
        </p>
      )}
    </div>
  );
}
