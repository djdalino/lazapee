'use client'

import { IProduct } from '@/app/Models/ProductModel'
import { BiInfoCircle, BiSolidTrash } from 'react-icons/bi'
import { FaCartPlus } from "react-icons/fa";
import { deleteProduct } from '@/app/Helpers/Products'
import { useRouter } from 'next/navigation'
import React, {useState, useContext, useEffect} from 'react'
// import { useContextClient,  } from '../Context/ContextProvider';
import { cartStore } from '../Store/Store';

interface ProductRowProps {
  product: IProduct
  removeOptimisticProduct: (productId: number) => void
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  removeOptimisticProduct,
}) => {
  const [cartList, setCartList] = useState<any>([])
  const router = useRouter()
  const {cart: cartItems, addToCartItem} = cartStore()
  
  useEffect(()=> {
      setCartList(cartItems)
  }, [cartItems])

  const handleAddToCart = (newItems: any) => {
    addToCartItem(newItems)
  }
  const handleViewProduct = (product_id: number) => {
    router.push(`/products/${product_id}`)
  }

  const handleDeleteProduct = async (product_id: number) => {
    removeOptimisticProduct(product_id)

    // Directus: Product Delete
    await deleteProduct(product_id)
  }

  return (
    <tr key={product.id}>
      <td></td>
      <td>
        <div className='avatar'>
          <div className='w-24 rounded-xl'>
            <img src={product.image} alt={product.image} />
          </div>
        </div>
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <div className='flex space-x-2'>
        <button
            className='btn btn-outline btn-info'
            disabled={cartList?.find((cart: any) => cart.id == product.id) ? true : false}
            onClick={() => handleAddToCart(product)}
          >
            <FaCartPlus size='2rem'/>
          </button>
          <button
            className='btn btn-outline btn-info'
            onClick={() => handleViewProduct(product.id)}
          >
            <BiInfoCircle size='2rem' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow
