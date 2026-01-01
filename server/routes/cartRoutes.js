import express from "express";
import {protect} from "../middleware/protect.js"

import { addToCart, getCartItems, removeFromCart } from "../controllers/cartControllers.js";


const router = express.Router();
router.use(protect);

router.post("/add",addToCart);
router.post("/remove",removeFromCart);
router.get("/getCart",getCartItems)

export default router;
