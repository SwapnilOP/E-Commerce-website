import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js";
import User from "../models/User.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userId = req.user.id;

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

    const userId = req.user.id;

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


export const cartItemsList = async (req, res) => {
  try {
    const userId = req.user.id;
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

export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price images stock isActive"
    });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Shape data for frontend
    const items = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.images?.[0],
      stock: item.productId.stock,
      isActive: item.productId.isActive,
      quantity: item.quantity
    }));

    res.status(200).json({ items });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { operation } = req.query;
    const userId = req.user.id;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId, "items.productId": productId },
      { $inc: { "items.$.quantity": operation === "add" ? 1 : -1 } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Did the quantity drop to 0 or less?
    const updatedItem = updatedCart.items.find(item => item.productId.toString() === productId);
    
    if (updatedItem && updatedItem.quantity <= 0) {
      // remove the item if quantity is 0
      const cartAfterRemoval = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId: productId } } },
        { new: true }
      );
      return res.status(200).json(cartAfterRemoval);
    }

    // 3.updated 
    res.status(200).json(updatedCart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};