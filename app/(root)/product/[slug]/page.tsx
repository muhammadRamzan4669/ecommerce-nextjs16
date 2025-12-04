import { getProductBySlug } from "@/lib/actions/product.actions";

export default async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug)

  return <>{product.name}</>
}
