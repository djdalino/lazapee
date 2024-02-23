'use client'

import { ProductResponse } from '@/app/Models/ProductModel'
import React, { useOptimistic, useEffect } from 'react'
import ProductRow from '@/app/Components/ProductRow'
import { useContextClient } from '../Context/ContextProvider'

interface ProductListProps {
  products: ProductResponse
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const {addToCart} = useContextClient()

  const getCartItems: any = typeof localStorage !== 'undefined' && localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : []

  const [optimisticProducts, removeOptimisticProduct] = useOptimistic(
    products,
    (state, removeProductId) => {
      return state.filter((product) => product.id !== removeProductId)
    }
  )
  console.log({ProductList: getCartItems})
 
  // useEffect(() => {
  //   if(getCartItems.length > 0){
      
  //     addToCart(getCartItems)
  //   }
  // }, [])
 

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr className='text-center'>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {optimisticProducts.length ? (
            <>
              {optimisticProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  removeOptimisticProduct={removeOptimisticProduct}
                />
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className='text-center'>
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
