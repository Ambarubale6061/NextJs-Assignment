import { readProducts } from '../lib/data'

export default function Dashboard({ stats }) {
  return (
    <div className="container">
      <h1>Inventory Dashboard (SSR)</h1>
      <div>Total products: {stats.total}</div>
      <div>Low stock (&lt;=10): {stats.lowStock}</div>
      <h3 style={{marginTop:12}}>Products</h3>
      {stats.products.map(p => (
        <div key={p.id} className="product">
          <div>
            <strong>{p.name}</strong>
            <div style={{fontSize:12,color:'#666'}}>{p.inventory} in stock</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  // SSR: runs on every request
  const products = readProducts()
  const total = products.length
  const lowStock = products.filter(p => p.inventory <= 10).length
  return {
    props: {
      stats: { total, lowStock, products }
    }
  }
}
