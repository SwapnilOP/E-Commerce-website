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
      return res.json({ products });
    }

    if (infoType === "users") {
      const users = await User.find({ role: "user" }).select("-password");
      return res.json({ users });
    }

    if (infoType === "orders") {
      const orders = await Order.find({})
        .populate("user", "name email")
        .populate("products.product")
        .sort({ createdAt: -1 });

      return res.json({ orders });
    }

    return res.status(400).json({ message: "Invalid info type" });
  } catch (err) {
    console.error("Error fetching admin info:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.name = name;
        product.price = price;
        product.stock = stock;
        await product.save();
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.status(200).json({ message: "Order status updated successfully" });
        console.log(`Order ${orderId} status updated to ${status}`);
    }
    catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
    console.log("Product added:", product);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

