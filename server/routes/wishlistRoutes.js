import express from "express";
import { protect } from "../middleware/protect.js";
import { add,remove,getWishlistList} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add",protect,add);
router.post("/remove",protect,remove);
router.get("/get-wishlist-list",protect,getWishlistList);

export default router;
