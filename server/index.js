import "dotenv/config"; // 🔥 MUST be first

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
connectDB();
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("app is running");
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
