import express from "express";

import Cart from "../models/cart.model.js"
import { addToCart, getCart, updateCart, removeItem, checkout } from "../controller/cart.controller.js";
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/add-to-cart',authenticateUser, addToCart);
router.get('/cartItems/:userId',authenticateUser, getCart);
router.put('/update-item', authenticateUser, updateCart);
router.delete('/remove-item/:userId/:productId', authenticateUser, removeItem);
router.post('/checkout/:userId', authenticateUser, checkout);  // New checkout route
export default router;
