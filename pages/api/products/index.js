import { readProducts, writeProducts } from "../../../lib/data";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = readProducts();
    return res.json(products);
  }

  if (req.method === "POST") {
    const apiKey = req.headers["x-api-key"] || "";
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: "Invalid API key" });
    }
    const body = req.body;
    if (!body || !body.name || !body.slug) {
      return res.status(400).json({ error: "Missing name or slug" });
    }
    const products = readProducts();
    const id = "prod_" + nanoid(8);
    const now = new Date().toISOString();
    const newProduct = {
      id,
      lastUpdated: now,
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      price: typeof body.price === "number" ? body.price : 0,
      category: body.category || "general",
      inventory: typeof body.inventory === "number" ? body.inventory : 0,
    };
    products.push(newProduct);
    writeProducts(products);
    // Optional: trigger revalidation for list or product page
    try {
      if (res.revalidate) {
        // not available in some environments; ignore errors
        await res.revalidate("/");
      }
    } catch (e) {}
    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
