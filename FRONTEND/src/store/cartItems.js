import {create} from 'zustand'

export const useCartItemsStore = create((set) => ({
    cartItems: [],
    setCartItems: (cartItems) => set({cartItems}),
    fetchCartItems: async (id) => {
        console.log("test")
        const res = await fetch(`https://project-stitch.onrender.com/api/cart/cartItems/${id}`,{credentials: "include", });
        console.log("test", res)
        
        set({cartItems: data.cart})
    }
}))

