import Link from "next/link";

export default function Home({ products }) {
  return (
    <div className="home-bg">
      <div className="navbar">
        <h2>🛒 NextShop</h2>
        <Link href="/admin" className="nav-btn">
          Admin
        </Link>
      </div>

      <div className="hero">
        <h1>Welcome to NextShop</h1>
        <p>Find the best deals on electronics, gadgets and more!</p>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-img">
              {/* जर image असेल तर दाखव, नाहीतर default */}
              <img src={p.image || "/default-product.png"} alt={p.name} />
            </div>

            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="desc">{p.description?.slice(0, 60)}...</p>
              <div className="price">₹{(p.price / 100).toFixed(2)}</div>
              <div className="stock">{p.inventory} in stock</div>
            </div>

            <div className="product-actions">
              <Link href={`/products/${p.slug}`} className="view-btn">
                View
              </Link>
              <button className="cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        © 2025 NextShop | Built with ❤️ in Next.js
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const { readProducts } = await import("../lib/data");
  const products = readProducts();
  return {
    props: { products },
    revalidate: 60,
  };
}
