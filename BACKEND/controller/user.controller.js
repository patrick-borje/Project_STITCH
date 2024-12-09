import mongoose from "mongoose";
import User from '../models/user.model.js'
import { createSecretToken } from "../Util/SecretToken.js"
import bcrypt from "bcrypt"

//Get all Users
export const getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json({success: true, data: users})
    } catch(error){
        console.log("error in fetching users: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//This function is for creating a user / SIGNUP
export const createUser = async (req, res, next) => {
    const user = req.body;
    console.log("this is the user",user)
    if(!user.firstName || !user.lastName || !user.email || !user.password || !user.role){
        return res.status(400).json({success: false, message: "Please provide the needed details to create a user"})
    }

    const existingUser = await User.findOne({email: user.email});
    if(existingUser){
        return res.json({message: "User already exists"});
    }

    

    try{
        const newUser = await User.create(user);
        const token = createSecretToken(newUser._id)
        res.cookie("token", token,{
            withCredentials: true,
            httpOnly: false,
        })
        res.status(201).json({success: true, data: newUser});
    }catch(error){
        console.error("Error in Creating a User: ", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

//LOGIN FUNCTION

export const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({success: false, message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({message: "Incorrect email or password"})
        }
        const auth = await bcrypt.compare(password, user.password)
        if(!auth){
            return res.json({message: "Incorrect email or password"})
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token,{
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({message: "User logged in successfully", success: true})
        next();
    }catch(error){
        console.log(error);
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;

    const user = req.body;

    if(!mongoose.Types.ObjectId(id)){
        return res.status(404).json({success: false, message: "Product not found!"})
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true})
        res.status(200).json({success: true, data: updatedUser})
    }catch(error){
        res.stats(500).json({success: false, message: "Server Error"})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "User Not Found!"})
    }

    try{
        await User.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "User has been deleted"})
    }catch(error){
        res.status(500).json({success: false, message: "Server Error"})
    }
}