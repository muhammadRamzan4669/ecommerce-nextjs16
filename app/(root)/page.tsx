import ProductList from "@/components/layout/product-list";
import sampleData from '@/db/sample-data'
import { getLatestProducts } from "@/lib/actions/product.actions";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Home() {
  const latestProducts = await getLatestProducts();
  await delay(2000);

  return <div><ProductList products={latestProducts} title={'Products'} limit={4} /></div>
}
