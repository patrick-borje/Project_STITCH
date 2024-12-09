import {create} from 'zustand'

export const useCartItemsStore = create(set => ({
    cartItems: [],
    setCartItems: (cartItems) => set({cartItems}),
    fetchCartItems: async () => {
        const res = await fetch("/api/cart/cartItems");
        const data = await res.json();
        set({cartItems: data.data})
    }
}))