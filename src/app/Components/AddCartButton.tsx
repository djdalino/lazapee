
import React, {useEffect, useState} from 'react';
import { BiCart } from 'react-icons/bi';
import { useRouter, usePathname } from 'next/navigation';
import { cartStore } from '../Store/Store';
interface CartButtonProps {
  name?: string;
  onClick?: () => void;
}

export function AddCartButton(props: CartButtonProps) {
  const [renderItem, setRenderItem] = useState<boolean>(false)
  const { cart: cartItems } = cartStore();
  const router = useRouter();
  const pathName = usePathname();

  const redirectToPage = () => {
    props.onClick
    router.push('/cart');
  };
 
  useEffect(() => {
    (() => {
      if(pathName == '/cart') {
        setRenderItem(false)
        return
      } 
      setRenderItem(true)
    })()
    
  }, [pathName])

  useEffect(() => {
    if(cartItems.length == 0) {
      router.push('/');
      return;
    }
  }, [cartItems])
  
  return (
    <>
      {renderItem && <button
          disabled={cartItems ? cartItems.length === 0 : false}
          className='btn btn-outline btn-info mr-4 cursor-pointer relative'
          onClick={redirectToPage}
        >
          <BiCart size='2rem' />
          {props.name}
          <p className='text-white bg-red-500 p-1.5 rounded-full h-30 w-30 absolute bottom-[-10px] right-[-10px]'>{cartItems.length}</p>
        </button>}
    </>
      
  );
}
