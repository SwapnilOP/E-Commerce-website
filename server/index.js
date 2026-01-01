import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js"

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config(); 
app.use(cors());
connectDB();
app.use(express.json());


app.use("/api/auth",AuthRoutes);
app.use("/api/products",productRoutes);
app.use("/api/banner",bannerRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get("/",(req,res)=>{ 
    res.send("app is running");
   console.log("get request");        
});

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})