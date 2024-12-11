import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js'
import cartRoutes from './routes/cart.routes.js'
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
    cors({
        origin:["https://lambent-marigold-469e25.netlify.app"],
        method:["GET","POST", "PUT", "DELETE"],
        credentials: true,
    })
)

app.use(express.json()); 
app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log("Server Started at http://localhost:" + PORT);
})
