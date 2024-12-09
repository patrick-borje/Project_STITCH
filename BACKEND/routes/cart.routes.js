import express from "express";

import Cart from "../models/cart.model.js"
import { addToCart, getCart, updateCart, removeItem } from "../controller/cart.controller.js";
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

router.post('/add-to-cart',authenticateUser, addToCart);
router.get('/cartItems', getCart);
router.put('/cart/update-item', authenticateUser, updateCart);
router.delete('/cart/remove-item', authenticateUser, removeItem);
export default router;