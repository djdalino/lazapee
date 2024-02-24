'use client'

import { useContextClient } from '@/app/Context/ContextProvider'
import { BsCartXFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import React, { useEffect, useState} from 'react'
import Image from 'next/image'

const Cart = async () => {
    const [updatedCartItems, setUpdateCartItems] = useState<any>([])
    const {cartItems, productItems, removeFromCart} = useContextClient()
    const shippingFee = updatedCartItems.filter((cart: any) => cart.selected === true).length > 0 ? 39 : 0;
    const disabled = updatedCartItems.some((cart:any) => cart.selected == true)

    useEffect(() => {
        (() => {
            const temp: any[] = []
            cartItems.forEach((cart: any) => {
                temp.push({...cart, selected: false})
            })
            setUpdateCartItems(temp)
        })()
    }, [cartItems])
    console.log({updatedCartItems})
  return (
    <div className='flex mt-5 justify-between mx-auto h-100'>
        <div className='w-full h-screen'>
            {updatedCartItems.sort((a:any, b:any) => a.id > b.id ? 1 : -1).map((cart: any) => {
                return (
                    <div key={cart.id} className='w-[700px] gap-x-4 gap-y-4 mx-auto flex justify-between items-center'>
                        <div>
                            <input 
                                type='checkbox' 
                                checked={cart.selected} 
                                onChange={(e) => setUpdateCartItems(() => {
                                    e.preventDefault()
                                    const findItem = updatedCartItems.find((updatedCart:any) => updatedCart.id === cart.id)
                                    const update = {...findItem, selected: !cart.selected}
                                    const filterItem = updatedCartItems.filter((updatedCart: any) => updatedCart.id !== cart.id)
                                    
                                    return [...filterItem, update]
                                })}
                            />
                        </div>
                        <div className='border-2 border-blue-500 w-300 h-150 mb-4'>
                            <Image 
                                src={cart.image} 
                                alt={cart.name} 
                                layout='auto' 
                                width={400} 
                                height={400}
                            />
                        </div>
                        <div className='w-full h-inherit'>
                            <p className='font-weight-800 text-2xl mb-4'>{cart.name}</p>
                            <p className='font-weight-800 text-md mb-4'>{cart.description}</p>

                            <div className='flex items-center justify-between w-full pr-5'>
                                <p>Price: {cart.price}</p>
                                <BsCartXFill size='2rem' color='rgb(239 68 68)' onClick={(e:any) => removeFromCart(cart.id, e)}/>
                            </div>
                            
                        </div>
                    </div>
                )
            })}
        </div>

        <div className='w-[500px] h-vh bg-white relative'>
            <div className='p-4 space-y-2'>
                <p className='font-semibold text-xl'>Location</p>
                <div className='flex gap-x-4'>
                    <FaLocationDot color='red' size='1.25rem' /> <p>asdasd</p>
                </div>
            </div>
            <div className='w-full bg-gray-600 h-0.5' />
            <div className='p-4'>
                <p className='text-xl font-semibold mb-5'>Order Summary</p>
                <div className='flex items-center justify-between w-full'>
                    <p>Subtotal ({updatedCartItems.filter((cart: any) => cart.selected === true).length} Item{updatedCartItems.filter((cart: any) => cart.selected === true).length > 1 ? 's':''}):</p> 
                    <p>{updatedCartItems.filter((cart: any) => cart.selected === true).reduce((total:any, item: any) => total + parseFloat(item?.price), 0)}</p>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <p>Shipping Fee:</p> 
                    <p>{updatedCartItems.filter((cart: any) => cart.selected === true).length > 0 ? shippingFee : 0}</p>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <p>Total:</p> 
                    <p>{updatedCartItems.filter((cart: any) => cart.selected === true).reduce((total:any, item: any) => total + parseFloat(item?.price), shippingFee)}</p>
                </div>
                <div className={`mt-10 ${!disabled ? 'bg-gray-500' : 'bg-blue-500'}  w-full text-center py-3 text-white cur`}>
                    <button className='w-full' onClick={() => console.log({disabled: !disabled})} disabled={!disabled}>Checkout</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Cart