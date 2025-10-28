export default async function handler(req, res) {
  const apiKey = req.headers['x-api-key'] || ''
  if (apiKey !== process.env.API_KEY) return res.status(401).json({ error: 'Invalid API key' })
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { slug } = req.body || {}
  if (!slug) return res.status(400).json({ error: 'Missing slug' })
  try {
    await res.revalidate(`/products/${slug}`)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to revalidate', details: String(err) })
  }
}
