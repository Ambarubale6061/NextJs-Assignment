import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    inventory: 0,
    image: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  async function createProduct(e) {
    e.preventDefault();
    setMsg("");
    const apiKey = prompt("Enter API_KEY (from .env.local)");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey || "",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setProducts((prev) => [...prev, data]);
      setMsg("✅ Product added: " + data.name);
      setForm({
        name: "",
        slug: "",
        description: "",
        price: 0,
        inventory: 0,
        image: "",
      });
    } else {
      setMsg("❌ Error: " + (data.error || JSON.stringify(data)));
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-nav">
        <h2>🛠️ Admin Panel</h2>
        <a href="/" className="nav-btn">
          Home
        </a>
      </div>

      <div className="admin-container">
        <h3>Add New Product</h3>
        <form onSubmit={createProduct} className="admin-form">
          <input
            className="admin-input"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="Slug (unique ID)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <textarea
            className="admin-input"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <div className="admin-row">
            <input
              className="admin-input"
              type="number"
              placeholder="Price (in paise)"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: parseInt(e.target.value || 0) })
              }
              required
            />
            <input
              className="admin-input"
              type="number"
              placeholder="Inventory"
              value={form.inventory}
              onChange={(e) =>
                setForm({ ...form, inventory: parseInt(e.target.value || 0) })
              }
              required
            />
          </div>
          <button type="submit" className="admin-btn">
            Add Product
          </button>
        </form>

        {msg && <div className="admin-msg">{msg}</div>}

        <h3 className="admin-list-title">Existing Products</h3>
        <div className="admin-products">
          {products.map((p) => (
            <div key={p.id} className="admin-card">
              <img src={p.image || "/default-product.png"} alt={p.name} />
              <div>
                <h4>{p.name}</h4>
                <p className="small">Slug: {p.slug}</p>
                <p className="small">{p.inventory} in stock</p>
              </div>
              <span className="price">₹{(p.price / 100).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
