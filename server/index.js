import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import AuthRoutes from "./routes/authRoutes.js";

const app = express();

dotenv.config();
connectDB();
app.use(express.json());


app.use("/api/auth",AuthRoutes);

app.get("/",(req,res)=>{
    res.send("app is running");
   console.log("get request");        
});

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})