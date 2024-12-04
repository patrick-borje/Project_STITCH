import express from "express";
import mongoose from "mongoose";


// IMPORTING ALL THE FUNCTIONS NEEDED TO THE ENDPOINTS
import { getOrders, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();

//NOTE: TO TEST THE ENDPOINTS, WE WILL USE POSTMAN

router.get("/", getOrders); //THIS API ENDPOINT WILL ALLOW US TO GET ALL THE OrderS
router.post("/", createOrder); //THIS API ENDPOINT WILL ALLOW US TO CREATE NEW OrderS
router.put("/:id", updateOrder); // THIS ENDPOINT WILL ALLOW US TO UPDATE A Order
router.delete("/:id", deleteOrder); // THIS API ENDPOINT WILL ALLOW US TO DELETE A PRODUCT

export default router;