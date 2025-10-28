import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'products.json')

export function readProducts() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw)
}

export function writeProducts(products) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8')
}
