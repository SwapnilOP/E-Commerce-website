import express from "express";
import { fetchBanners,} from "../controllers/bannerController.js";
import { addBanner } from "../controllers/adminController.js";
import { protect } from "../middleware/protect.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/fetch",fetchBanners);
router.post("/add", protect, adminOnly, addBanner);

export default router;
