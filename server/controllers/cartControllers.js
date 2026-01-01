import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js";
import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }

      await cart.save();
    }

    return res.status(200).json({
      message: "Item added to cart",
      cart
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    // get productId from body
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // get token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // find product in cart
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // if quantity > 1 → decrement
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // quantity === 1 → remove item
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart",
      cart
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const getCartItems = async (req, res) => {
  try {
    // get token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // find cart
    const cart = await Cart.findOne({ userId });

    // if no cart, return empty items (IMPORTANT)
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    return res.status(200).json({
      items: cart.items
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
