import express from "express";
import mongoose from "mongoose";


// IMPORTING ALL THE FUNCTIONS NEEDED TO THE ENDPOINTS
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controller/product.controller.js";

const router = express.Router();

//NOTE: TO TEST THE ENDPOINTS, WE WILL USE POSTMAN

router.get("/", getProducts); //THIS API ENDPOINT WILL ALLOW US TO GET ALL THE PRODUCTS
router.post("/", createProduct); //THIS API ENDPOINT WILL ALLOW US TO CREATE NEW PRODUCTS
router.put("/:id", updateProduct); // THIS ENDPOINT WILL ALLOW US TO UPDATE A PRODUCT
router.delete("/:id", deleteProduct); // THIS API ENDPOINT WILL ALLOW US TO DELETE A PRODUCT

export default router;