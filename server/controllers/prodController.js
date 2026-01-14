import Product from "../models/Product.js";

export const fetchProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    
  
    res.status(200).json({
      products,
      currentPage: page,
      totalPages,
      totalProducts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "product id is required" });
    }
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(
      product
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
export const searchProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword || "";

    //Build search filter (multi-field)
    const filter = keyword
      ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } },
          { brand: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
      : {};

    const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });

  } catch (err) {
    console.log(err);
  }
}


