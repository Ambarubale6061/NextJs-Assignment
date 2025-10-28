import { readProducts, writeProducts } from '../../../lib/data'

export default function handler(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const products = readProducts()
    const p = products.find(x => x.id === id)
    if (!p) return res.status(404).json({ error: 'Not found' })
    return res.json(p)
  }

  if (req.method === 'PUT') {
    const apiKey = req.headers['x-api-key'] || ''
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Invalid API key' })
    }
    const body = req.body || {}
    const products = readProducts()
    const idx = products.findIndex(x => x.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    const updated = { ...products[idx], ...body, lastUpdated: new Date().toISOString() }
    products[idx] = updated
    writeProducts(products)
    // try to revalidate product page and home
    try { if (res.revalidate) { res.revalidate(`/products/${updated.slug}`); res.revalidate('/') } } catch(e){}
    return res.json(updated)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
