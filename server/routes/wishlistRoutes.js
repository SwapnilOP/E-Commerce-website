import express from "express";
import { add,remove,getWishlistItems} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", add);
router.post("/remove",remove);
router.get("/getWishlist",getWishlistItems);

export default router;
