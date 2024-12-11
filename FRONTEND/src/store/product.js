
import {create} from 'zustand'
import { createProduct } from '../../../BACKEND/controller/product.controller'

export const useProductStore = create((set) =>({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async(newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.size || !newProduct.image){
            return {success: false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}))
        return{
            success: true, message:"Product added successfully"
        }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log(data)
        set({products: data.data})
    }
}))

