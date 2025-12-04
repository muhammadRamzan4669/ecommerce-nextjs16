export default async function ProductDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  return <>Product Details Page</>
}
