import express from "express";
import { userLogin, userSignup } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",userLogin);
router.post("/register",userSignup);
 
export default router;
