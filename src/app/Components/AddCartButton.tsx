'use client'
import React, { useContext, useEffect, useState } from 'react';
import { BiCart } from 'react-icons/bi';
import { useRouter, usePathname } from 'next/navigation'; // Importing from 'next/router' instead of 'next/navigation'
import { useContextClient } from '../Context/ContextProvider';
interface CartButtonProps {
  name?: string;
  onClick?: () => void;
}

export function AddCartButton(props: CartButtonProps) {
  const { cartItems } = useContextClient();
  const router = useRouter(); // Ensure that useRouter is called within the component
  const pathName = usePathname()
  const redirectToPage = () => {
    props.onClick
    router.push('/cart');
  };
  useEffect(() => {
    if(cartItems.length == 0) {
      router.push('/');
      return;
    }
  }, [cartItems])
  if(pathName == '/cart') return ;

 
  return (
    <button
      disabled={cartItems ? cartItems.length === 0 : false}
      className='btn btn-outline btn-info mr-4 cursor-pointer relative'
      onClick={redirectToPage}
    >
      <BiCart size='2rem' />
      {props.name}
      <span className='text-white bg-red-500 p-1 rounded-full h-30 w-30 absolute bottom-[-10px] right-[-10px]'>{cartItems.length}</span>
    </button>
  );
}
