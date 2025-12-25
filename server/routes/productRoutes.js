import express from "express";
import { fetchProducts } from "../controllers/prodController.js";

const router = express.Router();

router.get("/getProducts",fetchProducts);

export default router;