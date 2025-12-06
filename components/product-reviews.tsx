"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Star, Check } from "lucide-react";

type ProductReviewsProps = {
  reviews: Review[];
  productDescription: string;
  productId: string;
};

export default function ProductReviews({
  reviews,
  productDescription,
}: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("details");

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="border-t border-black/10 dark:border-white/10 py-8 lg:py-12">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-4 lg:gap-8 mb-8">
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-3 border-b-2 text-base lg:text-xl transition-colors ${
            activeTab === "details"
              ? "border-black dark:border-white font-medium"
              : "border-transparent text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 border-b-2 text-base lg:text-xl transition-colors flex items-center gap-2 ${
            activeTab === "reviews"
              ? "border-black dark:border-white font-medium"
              : "border-transparent text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          }`}
        >
          Rating & Reviews
          <span className="px-2 py-0.5 bg-black/10 dark:bg-white/10 rounded-full text-sm">
            {reviews.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`pb-3 border-b-2 text-base lg:text-xl transition-colors ${
            activeTab === "faqs"
              ? "border-black dark:border-white font-medium"
              : "border-transparent text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-black/60 dark:text-white/60">{productDescription}</p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-6">
          {/* Rating Summary */}
          <div className="flex items-center gap-4 p-6 bg-[#F0F0F0] dark:bg-[#1F1F1F] rounded-[20px]">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold">{averageRating}</div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(Number(averageRating))
                        ? "fill-[#FFC633] text-[#FFC633]"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                {reviews.length} reviews
              </p>
            </div>
          </div>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="grid gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 border border-black/10 dark:border-white/10 rounded-[20px]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{review.user?.name || "Anonymous"}</span>
                        {review.isVerified && (
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-[#FFC633] text-[#FFC633]"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-black/60 dark:text-white/60">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2">{review.title}</h4>
                  <p className="text-black/70 dark:text-white/70">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-black/60 dark:text-white/60">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="space-y-4">
          <div className="p-6 border border-black/10 dark:border-white/10 rounded-[20px]">
            <h4 className="font-semibold mb-2">What are the shipping options?</h4>
            <p className="text-black/70 dark:text-white/70">
              We offer free standard shipping on orders over $100. Express shipping is available at checkout.
            </p>
          </div>
          <div className="p-6 border border-black/10 dark:border-white/10 rounded-[20px]">
            <h4 className="font-semibold mb-2">What is the return policy?</h4>
            <p className="text-black/70 dark:text-white/70">
              We accept returns within 30 days of delivery. Items must be unused and in original packaging.
            </p>
          </div>
          <div className="p-6 border border-black/10 dark:border-white/10 rounded-[20px]">
            <h4 className="font-semibold mb-2">How do I track my order?</h4>
            <p className="text-black/70 dark:text-white/70">
              Once your order ships, you&apos;ll receive an email with tracking information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
