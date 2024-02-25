import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  selected: boolean;
}

interface CartStore {
  cart: CartItem[];
  addToCartItem: (item: CartItem) => void;
  removeToCart: (itemId: number) => void;
  selectedToCheckout: (itemId: number) => void;
  resetCart: () => void;
}

export const cartStore = create<CartStore>((set) => {
    const initialCart = typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [];

  return {
    cart: initialCart,
    addToCartItem: (item) => {
      set((state) => {
        const updatedCart = [...state.cart, { ...item, selected: false }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    },
    removeToCart: (itemId) => {
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        return { cart: updatedCart };
      });
    },
    selectedToCheckout: (itemId) => {
      set((state) => {
        const findCartItem: any = state.cart.find((item) => item.id === itemId);
        const updateItem = { ...findCartItem, selected: !findCartItem.selected };
        const filterItem = state.cart.filter((item) => item.id !== itemId);
        const updatedCart = [...filterItem, updateItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        return { cart: updatedCart };
      });
    },
    resetCart: () => {
      localStorage.removeItem('cart'); 
      set({ cart: [] });
    },
  };
});
