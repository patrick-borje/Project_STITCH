import mongoose from "mongoose";
import Cart from "../models/cart.model.js";

export const addToCart = async (req, res, next) => {
    const { product, quantity } = req.body;
    const userId = req.user._id;

    console.log("product id object: ", product);
    console.log("user id object: ", userId);
    console.log("quantity: ", quantity);

    // Validation
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID.' });
    }
    if (!product || !mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ success: false, message: 'Invalid Product ID.' });
    }
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ success: false, message: 'Quantity must be greater than 0.' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
         
            const productIndex = cart.products.findIndex(p => p.productId.toString() === product.toString());

            if (productIndex > -1) {
         
                cart.products[productIndex].quantity += quantity;
            } else {
             
                cart.products.push({ productId: product, quantity });
            }
        } else {
        
            cart = new Cart({
                userId,
                products: [{ productId: product, quantity }],
            });
        }

        // Save the updated cart
        await cart.save();
        console.log("Updated cart: ", cart);
        res.status(200).json({ success: true, cart });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err });
    }
};

export const getCart = async (req, res) => {
    try {
 
        const {userId} = req.params
     
        const cart = await Cart.findOne({ userId: userId }).populate('products.productId');
  
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

    // Validation
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID." });
    }
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ success: false, message: "Quantity must be greater than 0." });
    }

    try {
        // Ensure `userId` comes from `req.user` set by `authenticateUser`
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID." });
        }

        // Find the cart for the user
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId.toString()
        );

        if (productIndex > -1) {
            // Update the quantity if the product exists
            cart.products[productIndex].quantity = quantity;

            // Save the updated cart
            await cart.save();

            return res.status(200).json({ success: true, cart });
        } else {
            // Product not found in the cart
            return res.status(404).json({ success: false, message: "Product not found in cart." });
        }
    } catch (err) {
        console.error("Error updating cart:", err); // Debugging log
        return res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
};

export const removeItem = async (req, res) => {
    const { userId, productId } = req.params;  // Extract `userId` and `productId` from params

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID." });
    }

    try {
        // Find the cart by `userId`
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        // Filter out the product to remove it
        cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
};
export const checkout = async (req, res) => {
    const userId = req.user.id;

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found." });
        }

        // Logic to handle checkout (e.g., create an order, charge payment, etc.)
        // For simplicity, we'll just clear the cart
        cart.products = []; // Clear the cart

        // Save the empty cart
        await cart.save();

        res.status(200).json({ success: true, message: "Checkout successful!" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err });
    }
};