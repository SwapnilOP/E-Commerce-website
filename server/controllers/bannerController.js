import Banner from "../models/Banner.js";

export const fetchBanners = async (req, res) => {
  try {
    const count = Math.min(Number(req.query.count) || 5, 10); // hard cap
    const now = new Date();

    const banners = await Banner.aggregate([
      {
        $match: {
          isActive: true,
          $or: [
            { startDate: { $exists: false }, endDate: { $exists: false } },
            { startDate: { $lte: now }, endDate: { $gte: now } }
          ]
        }
      },
      { $sort: { position: 1 } }
    ]);

    if (banners.length === 0) {
      return res.status(404).json({ message: "No banners found" });
    }

    res.status(200).json(banners);

  } catch (err) {
    console.error("Fetch banners error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
