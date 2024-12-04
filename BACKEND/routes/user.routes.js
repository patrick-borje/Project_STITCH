import express from "express";
import mongoose from "mongoose";


// IMPORTING ALL THE FUNCTIONS NEEDED TO THE ENDPOINTS
import { getusers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

//NOTE: TO TEST THE ENDPOINTS, WE WILL USE POSTMAN

router.get("/", getUsers); //THIS API ENDPOINT WILL ALLOW US TO GET ALL THE UserS
router.post("/", createUser); //THIS API ENDPOINT WILL ALLOW US TO CREATE NEW UserS
router.put("/:id", updateUser); // THIS ENDPOINT WILL ALLOW US TO UPDATE A User
router.delete("/:id", deleteUser); // THIS API ENDPOINT WILL ALLOW US TO DELETE A User

export default router;