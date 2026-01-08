import express, { Router } from 'express';
import { checkUserAddress } from '../controllers/userController.js';
import {protect} from "../middleware/protect.js";

const router = Router();

router.post('/address',protect, checkUserAddress);

export default router;