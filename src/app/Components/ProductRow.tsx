'use client'

import { IProduct } from '@/app/Models/ProductModel'
import { BiInfoCircle, BiSolidTrash } from 'react-icons/bi'
import { FaCartPlus } from "react-icons/fa";
import { deleteProduct } from '@/app/Helpers/Products'
import { useRouter } from 'next/navigation'
import React, {useState, useContext} from 'react'
import { useContextClient,  } from '../Context/ContextProvider';

interface ProductRowProps {
  product: IProduct
  removeOptimisticProduct: (productId: number) => void
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  removeOptimisticProduct,
}) => {
  const router = useRouter()
  const {cartItems, addToCart} = useContextClient()

  const handleAddToCart = (newItems: any) => {
    addToCart(newItems)
  }
  const handleViewProduct = (product_id: number) => {
    router.push(`/products/${product_id}`)
  }

  const handleDeleteProduct = async (product_id) => {
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
            disabled={!!cartItems?.find((cart: any) => cart.id === product.id)}
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
