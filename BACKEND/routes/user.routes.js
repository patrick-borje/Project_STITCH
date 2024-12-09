import express from "express";



// IMPORTING ALL THE FUNCTIONS NEEDED TO THE ENDPOINTS
import { getUsers, loginUser, createUser, updateUser, deleteUser,  } from "../controller/user.controller.js";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

//NOTE: TO TEST THE ENDPOINTS, WE WILL USE POSTMAN

router.get("/", getUsers); //THIS API ENDPOINT WILL ALLOW US TO GET ALL THE UserS
router.post("/register", createUser); //THIS API ENDPOINT WILL ALLOW US TO CREATE NEW UserS /SIGNUP
router.post("/login", loginUser) //THIS API ENDPOINT WILL ALLOW THE USER TO LOGIN
router.put("/:id", updateUser); // THIS ENDPOINT WILL ALLOW US TO UPDATE A User
router.delete("/:id", deleteUser); // THIS API ENDPOINT WILL ALLOW US TO DELETE A User
router.post("/", userVerification);

export default router;