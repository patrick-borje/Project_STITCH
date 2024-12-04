import mongoose from "mongoose"
import Product from "../models/product.model.js";


// THIS FUNCTION IS TO ALL THE PRODUCTS
export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch(error) {
        console.log("error in fetching products: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//THIS FUNCTION IS FOR CREATING A PRODUCT
export const createProduct = async (req, res) => {
    const product = req.body;
    console.log(product); 
    if( !product.name || !product.description || !product.size || !product.price || !product.stock || !product.image){
        return res.status(400).json({success: false, message: "Please provide the needed details to create a product."})
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        console.error("Error in Creating product: ", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Product not found!"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(200).json({success: true, data: updatedProduct});
    }catch(error){
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Product not found!"})
    }

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"})
    } catch(error){
        res.status(500).json({success: false, message: "Server Error"});
    }
}