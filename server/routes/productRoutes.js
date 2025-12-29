import express from "express";
import { fetchProducts } from "../controllers/prodController.js";
import { fetchDetails } from "../controllers/prodController.js";
import { searchProducts } from "../controllers/prodController.js";

const router = express.Router();

router.get("/getProducts",fetchProducts);
router.get("/productDetails/:id",fetchDetails);
router.get("/search",searchProducts);

export default router;