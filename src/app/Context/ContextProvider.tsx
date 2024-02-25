'use client'
import React, { useState, createContext, useContext, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

interface ContextType {
  productItems: any[];
  cartItems: Item[];
  addProducts: (products: any[]) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number, e:any) => void;
  clearCart: () => void;
  updateSelectedCartItem: (itemId: number) => void;
}

const Context = createContext<ContextType>({
  productItems: [],
  cartItems: [],
  addProducts: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateSelectedCartItem: () => {}
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [productItems, setProductItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch cart items from localStorage on component mount
    const cartItemsFromStorage = localStorage.getItem('cart-items');
    if (cartItemsFromStorage) {
      setCartItems(JSON.parse(cartItemsFromStorage));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever cartItems change
    const wait = setTimeout(() => {
      localStorage.setItem('cart-items', JSON.stringify(cartItems));
    }, 100)
    
    return () => clearTimeout(wait)
  }, [cartItems]);

  const addProducts = (products: any[]) => {
    
    setProductItems(products);
  };

  const addToCart = (item: Item) => {
    const updatedCartItems = [...cartItems];

    // Check if the item already exists in the cart
    if (!updatedCartItems.some(cartItem => cartItem.id === item.id)) {
      updatedCartItems.push({...item, selected:false});
      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (itemId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    console.log({event})
    event.preventDefault()
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateSelectedCartItem = (itemId: number) => {
    const findItem = cartItems.find((cart: Item) => cart.id === itemId);
    const updatedItem = {...findItem, selected: !findItem?.selected}
    const filterItems = cartItems.filter((cart: Item) => cart.id !== itemId)

    const updatedCartItems: any[] = [...filterItems, updatedItem];
    setCartItems(updatedCartItems)
  }

  return (
    <Context.Provider value={{ productItems, addProducts, cartItems, addToCart, removeFromCart, clearCart, updateSelectedCartItem }}>
      {children}
    </Context.Provider>
  );
}

function useContextClient() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContextClient must be used within a ContextProvider');
  }
  return context;
}

export { ContextProvider, useContextClient };
