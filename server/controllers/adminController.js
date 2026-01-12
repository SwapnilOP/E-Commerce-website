import Order from "../models/Orders.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });
        res.status(200).json({
            totalOrders,
            totalProducts,
            totalUsers
        })
    } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getInfo = async (req, res) => {
    try {
        const { infoType } = req.query;
        if (infoType === "products") {
            const products = await Product.find({});
            return res.status(200).json({ products });
        } else if (infoType === "users") {
            const users = await User.find({ role: 'user' });
            return res.status(200).json({ users });
        } else if (infoType === "orders") {
            const orders = await Order.find({}).populate("user", "name email").populate("products.product");
            return res.status(200).json({ orders });
        } else {
            return res.status(400).json({ message: "Invalid info type" });
        }
    } catch (err) {
        console.error("Error fetching", err);
        res.status(500).json({ message: "Internal server error" });
    }
}