import Banner from "../models/Banner.js";

export const fetchBanners = async (req, res) => {
  try {
    const count = Math.min(Number(req.query.count) || 5, 10);

    const banners = await Banner.find({ isActive: true })
      .sort({ position: 1 })
      .limit(count);

    res.status(200).json(banners);
  } catch (err) {
    console.error("Fetch banners error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



