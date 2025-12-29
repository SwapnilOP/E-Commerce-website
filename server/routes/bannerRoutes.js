import express from "express";
import { fetchBanners } from "../controllers/bannerController.js";

const router = express.Router();

router.get("/fetch",fetchBanners);

export default router;
