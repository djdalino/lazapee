import { HomeButton } from '@/app/Components/HomeButton'
import { getProduct } from '@/app/Helpers/Products'

interface ProductViewProps {
  params: {
    productId: string
  }
}

const ProductView = async ({ params }: ProductViewProps) => {
  // Directus: Product Get
  const product:any = await getProduct(parseInt(params.productId))

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Product View</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mb-4'>
          <input
            type='text'
            className='input input-bordered w-full'
            value={product?.name}
            readOnly={true}
          />
        </div>
        <div className='mb-4'>
          <input
            type='text'
            className='input input-bordered w-full'
            value={product?.price}
            readOnly={true}
          />
        </div>
        <div className='mb-4 col-span-2'>
          <textarea
            name='image'
            placeholder='Image URL'
            className='textarea textarea-bordered w-full'
            value={product?.image}
            readOnly={true}
          />
        </div>
        <div className='mb-4 col-span-2'>
          <textarea
            name='description'
            placeholder='Description'
            className='textarea textarea-bordered w-full'
            value={product?.description}
            readOnly={true}
          />
        </div>

        <div className='mb-4 col-span-2'>
          <HomeButton />
        </div>
      </div>
    </main>
  )
}

export default ProductView
