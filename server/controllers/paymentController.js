import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ message: 'amount is required' });
        }
        const userId = req.user.id;

        // verifying cart sum from backend , for safety
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            model: 'Product',
            select: 'price'
        });

        const totalSum = cart.items.reduce((acc, item) => {
            const price = item.productId.price || 0;
            const quantity = item.quantity || 0;
            return acc + (price * quantity);
        }, 0);

        if (amount != totalSum) {
            return res.status(400).json({ message: 'amount verification failed' })
        }

        const options = {
            amount: totalSum * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Razorpay order",
            error: error.message,
        });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payload" });
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "payment verification failed",
            error: err.message
        })
    }
}