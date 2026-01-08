import express, { Router } from 'express';
import {createOrder,verifyPayment,} from '../controllers/paymentController.js';
import {protect} from '../middleware/protect.js';

const router = express.Router();

router.post('/create-order',protect,createOrder);
router.post("/verify", verifyPayment);

export default router;