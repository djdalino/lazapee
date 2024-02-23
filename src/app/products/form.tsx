'use client'

import { useFormState } from 'react-dom'
import { StandardResponse } from '@/app/Helpers/Responses'
import { useEffect, useRef } from 'react'
import addProduct from '@/app/actions/products'
import { SubmitProductButton } from '@/app/products/SubmitProductButton'
import { Toaster } from '../Components/Toaster'

const initialState: StandardResponse = {
  success: false,
}

export default function ProductForm() {
  const ref = useRef<any>(null)
  const [state, formAction] = useFormState(addProduct, initialState)

  useEffect(() => {
    if (state.success) ref.current?.reset()
  })

  return (
    <form
      ref={ref}
      action={formAction}
      className='grid grid-cols-1 md:grid-cols-2 gap-4'
    >
      <div className='mb-4 col-span-2'>
        <Toaster
          type={state.success ? 'success' : 'error'}
          message={
            state.success ? 'success' : 'This functionality has been disabled'
          }
        />
      </div>

      <div className='mb-4'>
        <input
          type='text'
          name='name'
          placeholder='Product name'
          className='input input-bordered w-full'
          required
        />
        {state?.errors?.name && (
          <p className='text-red-500 text-sm mt-1'>*{state.errors.name}</p>
        )}
      </div>
      <div className='mb-4'>
        <input
          type='text'
          name='price'
          placeholder='Price'
          className='input input-bordered w-full'
          required
        />
        {state?.errors?.price && (
          <p className='text-red-500 text-sm mt-1'>*{state.errors.price}</p>
        )}
      </div>
      <div className='mb-4 col-span-2'>
        <textarea
          name='image'
          placeholder='Image URL'
          className='textarea textarea-bordered w-full'
          required
        />
        {state?.errors?.image && (
          <p className='text-red-500 text-sm mt-1'>*{state.errors.image}</p>
        )}
      </div>
      <div className='mb-4 col-span-2'>
        <textarea
          name='description'
          placeholder='Description'
          className='textarea textarea-bordered w-full'
          required
        />
        {state?.errors?.description && (
          <p className='text-red-500 text-sm mt-1'>
            *{state.errors.description}
          </p>
        )}
      </div>

      <div className='mb-4 col-span-2 text-center'>
        <SubmitProductButton name='Add Product' />
      </div>
    </form>
  )
}
