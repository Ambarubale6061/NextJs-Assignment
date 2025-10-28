export default function Product({ product }) {
  if (!product)
    return (
      <div className="container">
        <h2>Product not found</h2>
      </div>
    );

  return (
    <div className="container">
      <h1>{product.name} (ISR)</h1>
      <p>{product.description}</p>
      <div>Price: ₹{(product.price / 100).toFixed(2)}</div>
      <div>Inventory: {product.inventory}</div>
    </div>
  );
}

export async function getStaticPaths() {
  // ✅ Import only on the server side
  const { readProducts } = await import("../../lib/data");
  const products = readProducts();
  const paths = products.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  // ✅ Import only inside server functions
  const { readProducts } = await import("../../lib/data");
  const products = readProducts();
  const product = products.find((p) => p.slug === params.slug) || null;

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 60, // ISR: re-generate at most once per 60 seconds
  };
}
