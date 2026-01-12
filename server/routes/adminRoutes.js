import express from "express";
import {adminOnly} from "../middleware/adminOnly.js";
import {protect} from "../middleware/protect.js";

import {
    getDashboardStats,
    getInfo,
    getProductById,
    updateProduct,
    updateOrderStatus,
    addProduct
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats",protect,adminOnly,getDashboardStats);
router.get("/info",protect,adminOnly,getInfo);
router.get("/products/:id", protect, adminOnly, getProductById);
router.put("/products/:id", protect, adminOnly, updateProduct);
router.put("/update-status/:orderId", protect, adminOnly,updateOrderStatus);
router.post("/add-product", protect, adminOnly, addProduct);

export default router;
