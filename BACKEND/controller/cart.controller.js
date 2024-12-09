import mongoose from "mongoose";
import Cart from "../models/cart.model.js";

export const addToCart = async (req, res, next) => {
    const {  product, quantity } = req.body;
    const userId = req.user._id;
  
   
    console.log("product id object: ",product)
    console.log("user id object: ",userId)
    console.log("quantity: ",quantity)


    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID.' });
    }
    if (!product || !mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ success: false, message: 'Invalid Product ID.' });
    }

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ success: false, message: 'Quantity must be greater than 0.' });
    }
    // console.log(req.body)
    try {
  
        
        let cart = await Cart.findOne({ userId });
    
        if (cart) {
            // Check if product exists in cart
           
            const productIndex = cart.products.findIndex(p => p.product == product);
            
            if (productIndex > -1) {
                // Update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product
                cart.products.push({ productId: product, quantity });
            }
        } else {
           
         
            // Create a new cart
            cart = new Cart({
                userId,
                products: [{ productId: product, quantity }],
            });
          
        }
   
        await cart.save();
        console.log("test",cart);
        res.status(200).json({ success: true, cart });
        
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err });
    }

}

export const getCart = async (req, res) => {
    try {
        console.log("test")
        const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
        console.log("user cart: ",cart);
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }
        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
}

export const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        const productIndex = cart.products.findIndex((p) => p.productId == productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ success: true, cart });
        } else {
            res.status(404).json({ success: false, message: "Product not found in cart." });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
}

export const removeItem = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        cart.products = cart.products.filter((p) => p.productId != productId);
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
}
