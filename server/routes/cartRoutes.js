import express from "express";
import {protect} from "../middleware/protect.js"

import { 
 addToCart, cartItemsList, removeFromCart,getCartItems,updateQuantity
} from "../controllers/cartControllers.js";



const router = express.Router();
router.use(protect);

router.post("/add",protect,addToCart);
router.post("/remove",protect,removeFromCart);
router.get("/cart-items-list",protect,cartItemsList);
router.get("/get-cart-items",protect,getCartItems);
router.post("/update/:productId",protect,updateQuantity);

export default router;
 