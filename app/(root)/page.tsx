import ProductList from "@/components/layout/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { getSession } from "@/lib/actions/user.actions";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "Browse our latest products and exclusive deals",
};

function CallbackBanner() {
  return (
    <div className="wrapper">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-2">
          🔒 Try the Callback URL Feature
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the link below to access your profile. Since you&apos;re not
          signed in, you&apos;ll be redirected to the sign-in page with a
          callback URL. After signing in, you&apos;ll be automatically redirected
          back to your profile!
        </p>
        <Link
          href="/user/profile"
          className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          View Profile (Protected Route)
        </Link>
      </div>
    </div>
  );
}

async function ProductSection() {
  const latestProducts = await getLatestProducts();
  return <ProductList products={latestProducts} title="Products" limit={4} />;
}

function ProductsLoading() {
  return (
    <div className="wrapper">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mx-auto mb-8" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const session = await getSession();

  return (
    <div>
      {/* Callback URL Demo Banner */}
      {!session && <CallbackBanner />}

      {/* Stream products with Suspense boundary */}
      <Suspense fallback={<ProductsLoading />}>
        <ProductSection />
      </Suspense>
    </div>
  );
}
