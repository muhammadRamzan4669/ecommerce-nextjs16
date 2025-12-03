import ProductList from "@/components/layout/product-list";
import sampleData from '@/db/sample-data'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Home() {
  await delay(2000);

  return <div><ProductList products={sampleData.products} title={'Products'} limit={4} /></div>
}
