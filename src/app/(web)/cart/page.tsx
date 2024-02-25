'use client'

import { BsCartXFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import React, { useEffect, useState} from 'react'
import Image from 'next/image'

import { cartStore } from '@/app/Store/Store';


interface CartItem {
    id: number,
    name: string,
    description: string,
    price: number,
    selected: boolean,
    image: string,
}

const Cart = () => {
    const [cartList, setCartList] = useState<CartItem[]>([])
    const {cart: cartItems, removeToCart, selectedToCheckout} = cartStore()
   
    // const {cartItems, removeFromCart,updateSelectedCartItem} = useContextClient()
    const shippingFee = cartList.filter((cart: any) => cart.selected === true).length > 0 ? 39 : 0;
    const disabled = cartList.some((cart:any) => cart.selected == true)
    
    useEffect(() => {
        setCartList(cartItems)
    }, [cartItems])


  return (
    <div className='flex mt-5 justify-between mx-auto h-100'>
        <div className='w-full h-screen'>
            {cartList.sort((a:{id: number}, b:{id: number}) => a.id > b.id ? 1 : -1).map((cart: CartItem) => {
                return (
                    <div key={cart.id} className='w-[700px] gap-x-4 py-1 mx-auto flex justify-between items-center'>
                        <div>
                            <input 
                                type='checkbox' 
                                checked={cart.selected} 
                                onChange={() => selectedToCheckout(cart.id)}
                            />
                        </div>
                        <div className='border-2 border-[#00b5ff] w-300 h-150'>
                            <Image 
                                src={cart.image} 
                                alt={cart.name} 
                                width={400} 
                                height={400}
                            />
                        </div>
                        <div className='w-full h-inherit'>
                            <p className='font-weight-800 text-2xl mb-4'>{cart.name}</p>
                            <p className='font-weight-800 text-md mb-4'>{cart.description}</p>

                            <div className='flex items-center justify-between w-full pr-5'>
                                <p>Price: {cart.price}</p>
                                <BsCartXFill size='2rem' color='#ff5862' onClick={(e:any) => removeToCart(cart.id)}/>
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
                    <FaLocationDot color='#ff5862' size='1.25rem' /> <p>123 Village, City, State</p>
                </div>
            </div>
            <div className='w-full bg-gray-600 h-0.5' />
            <div className='p-4'>
                <p className='text-xl font-semibold mb-5'>Order Summary</p>
                <div className='flex items-center justify-between w-full'>
                    <p>Subtotal ({cartItems.filter((cart: any) => cart.selected === true).length} Item{cartItems.filter((cart: any) => cart.selected === true).length > 1 ? 's':''}):</p> 
                    <p>{cartItems.filter((cart: any) => cart.selected === true).reduce((total:any, item: any) => total + parseFloat(item?.price), 0)}</p>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <p>Shipping Fee:</p> 
                    <p>{cartItems.filter((cart: any) => cart.selected === true).length > 0 ? shippingFee : 0}</p>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <p>Total:</p> 
                    <p>{cartItems.filter((cart: any) => cart.selected === true).reduce((total:any, item: any) => total + parseFloat(item?.price), shippingFee)}</p>
                </div>
                <div className={`mt-10 ${!disabled ? 'bg-gray-500' : 'bg-[#00b5ff]'}  w-full text-center py-3 text-white cur`}>
                    <button className='w-full' onClick={() => alert(`Items for checkout \n\n${JSON.stringify(cartItems.filter((cart: any) => cart.selected === true))}`)} disabled={!disabled}>Checkout</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Cart