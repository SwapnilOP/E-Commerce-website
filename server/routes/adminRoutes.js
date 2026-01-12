import express from "express";
import {adminOnly} from "../middleware/adminOnly.js";
import {protect} from "../middleware/protect.js";

import {getDashboardStats,getInfo} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats",protect,adminOnly,getDashboardStats);
router.get("/info",protect,adminOnly,getInfo);

export default router;
