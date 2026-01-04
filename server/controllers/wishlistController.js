import jwt from "jsonwebtoken";
import WishList from "../models/Wishlist.js";

export const add = async (req, res) => {
  try {
    // get productId from body
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userId = req.user.id;

    // add product to wishlist (no duplicates)
    const wishlist = await WishList.findOneAndUpdate(
      { userId },
      { $addToSet: { items: productId } }, // prevents duplicates
      { new: true, upsert: true }           // create if not exists
    );

    return res.status(200).json({
      message: "Product added to wishlist",
      wishlist
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const remove = async (req, res) => {
  try {
    // get productId from body
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userId = req.user.id;

    // remove product from wishlist
    const wishlist = await WishList.findOneAndUpdate(
      { userId },
      { $pull: { items: productId } }, // remove product
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    return res.status(200).json({
      message: "Product removed from wishlist",
      wishlist
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const getWishlistList = async (req, res) => {
  try {
    const userId = req.user.id;

    // find wishlist
    const wishlist = await WishList.findOne({ userId });

    // if no wishlist, return empty items (IMPORTANT)
    if (!wishlist) {
      return res.status(200).json({ items: [] });
    }

    return res.status(200).json({
      items: wishlist.items
    });

  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
