import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug)

  if (!product)
    notFound();

  return <>{product.name}</>
}
