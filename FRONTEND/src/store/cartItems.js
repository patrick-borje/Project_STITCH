import {create} from 'zustand'

export const useCartItemsStore = create((set) => ({
    cartItems: [],
    setCartItems: (cartItems) => set({cartItems}),
    fetchCartItems: async (id) => {
        const res = await fetch(`https://project-stitch.onrender.com/api/cart/cartItems/${id}`);
        const data = await res.json();
        
        set({cartItems: data.cart})
    }
}))

