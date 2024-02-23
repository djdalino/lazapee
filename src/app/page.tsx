import { getProducts } from '@/app/Helpers/Products'
import ProductList from '@/app/components/ProductList'

export default async function Home() {
  // Directus: Product Lists
  const products = await getProducts()
  return (
    <>
      <main className='max-w-4xl mx-auto mt-4'>
        <ProductList products={products} />
      </main>
    </>
  )
}
