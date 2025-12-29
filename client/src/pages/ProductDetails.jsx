import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import NavBar from "../components/user/NavBar";
import ProductGrid from "../components/user/ProductGrid";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  /* ================= FETCH PRODUCT DETAILS ================= */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/productDetails/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);

  /* ================= FETCH RECOMMENDED PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products/getProducts?page=1&limit=8"
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  /* ================= SKELETON LOADER ================= */
  if (!product) {
    return (
      <div className="min-h-screen bg-purple-50 animate-pulse">
        <NavBar />
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
          <div className="h-[420px] bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-12 bg-gray-300 rounded-lg mt-6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <NavBar />

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-6">

          {/* IMAGE */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-5">
            <img
              src={product.images}
              alt={product.name}
              loading="lazy"
              className="max-h-[420px] w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">

            {/* TITLE + RATING */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < Math.round(product.rating)
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({Math.floor(Math.random() * 300 + 50)} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mb-4">
              <p className="text-3xl font-bold text-purple-700">
                ₹{product.price}
              </p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>

            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>

            {/* STOCK STATUS */}
            {product.stock < 30 ? (
              <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                Only {product.stock} left – hurry!
              </span>
            ) : (
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                In stock
              </span>
            )}

            {/* ACTION BUTTONS */}
            <div className="mt-auto sticky bottom-4 bg-white p-4 rounded-xl shadow-lg flex gap-3">
              <button className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg font-semibold transition active:scale-95">
                Add to Cart
              </button>
              <button className="flex-1 border-2 border-purple-700 text-purple-700 hover:bg-purple-50 py-3 rounded-lg font-semibold transition active:scale-95">
                Wishlist
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= RECOMMENDED PRODUCTS ================= */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 ml-6">
          Recommended Products
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductDetails;
