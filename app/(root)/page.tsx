import ProductList from "@/components/layout/product-list";
import sampleData from '@/db/sample-data'
import { getLatestProducts } from "@/lib/actions/product.actions";
import { getSession } from "@/lib/actions/user.actions";
import Link from "next/link";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const session = await getSession();
  await delay(2000);

  return (
    <div>
      {/* Callback URL Demo Banner */}
      {!session && (
        <div className="wrapper">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2">
              🔒 Try the Callback URL Feature
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click the link below to access your profile. Since you&apos;re not signed in,
              you&apos;ll be redirected to the sign-in page with a callback URL.
              After signing in, you&apos;ll be automatically redirected back to your profile!
            </p>
            <Link
              href="/user/profile"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              View Profile (Protected Route)
            </Link>
          </div>
        </div>
      )}

      <ProductList products={latestProducts} title={'Products'} limit={4} />
    </div>
  )
}
