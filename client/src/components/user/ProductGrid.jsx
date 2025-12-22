import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const ProductGrid = ({ limit }) => {
  const products = [
    {
      id: 1,
      name: "Classic T-Shirt",
      price: "₹799",
      image:
        "https://m.media-amazon.com/images/I/717Q2swzhBL._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: "₹2,199",
      image:
        "https://m.media-amazon.com/images/I/71N4hshhfNL._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 3,
      name: "Sneakers",
      price: "₹3,499",
      image:
        "https://m.media-amazon.com/images/I/61XLamz-hVL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 4,
      name: "Smart Watch",
      price: "₹5,999",
      image:
        "https://m.media-amazon.com/images/I/61Wixzl2n-L._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 5,
      name: "Bluetooth Headphones",
      price: "₹2,499",
      image:
        "https://m.media-amazon.com/images/I/61CUjh3AjmL._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 6,
      name: "Leather Wallet",
      price: "₹1,299",
      image:
        "https://m.media-amazon.com/images/I/81p9dO3Jp0L._AC_UY327_FMwebp_QL65_.jpg",
    },
    {
      id: 7,
      name: "Casual Shirt",
      price: "₹999",
      image:
        "https://m.media-amazon.com/images/I/71uG6McmHkL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 8,
      name: "Stylish Cap",
      price: "₹499",
      image:
        "https://m.media-amazon.com/images/I/71ddGHwkSUL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 9,
      name: "Backpack",
      price: "₹1,899",
      image:
        "https://m.media-amazon.com/images/I/81qS9kYFAxL._AC_UL480_FMwebp_QL65_.jpg",
    },
  ];

  // ✅ If limit is provided and not 0, show only that many; else show all
  const visibleProducts =
    limit && limit > 0 ? products.slice(0, limit) : products;

  return (
    <section className="bg-purple-50 py-10 px-4 sm:px-8 lg:px-16">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
          >
            {/* Wishlist Icon */}
            <button className="absolute top-3 right-3 z-20 text-gray-600 border rounded-full p-2 bg-amber-50 hover:text-pink-600 transition">
              <FaHeart className="text-lg"/>
            </button>

            {/* Image */}
            <div className="m-2 flex items-center justify-center bg-white h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-purple-700 font-medium mt-1">
                {product.price}
              </p>

              <button className="mt-3 w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 flex items-center justify-center gap-2 transition">
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default ProductGrid;
