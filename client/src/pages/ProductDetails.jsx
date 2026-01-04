import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/user/NavBar";
import ProductGrid from "../components/user/ProductGrid";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* ================= FETCH PRODUCT DETAILS ================= */
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `http://localhost:5000/api/products/productDetails/${id}`
      );
      const data = await res.json();
      setProduct(data);
    };
    fetchDetails();
  }, [id]);

  /* ================= FETCH RECOMMENDED PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "http://localhost:5000/api/products/getProducts?page=1&limit=8"
      );
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  /* ================= SYNC CART & WISHLIST (FIXED ENDPOINTS) ================= */
  useEffect(() => {
    const syncState = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // ---- GET CART ----
        const cartRes = await fetch(
          "http://localhost:5000/api/cart/cart-items-list",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const cartData = await cartRes.json();

        setIsInCart(
          cartData.items?.some(
            item => item.productId.toString() === id
          )
        );

        // ---- GET WISHLIST ----
        const wishRes = await fetch(
          "http://localhost:5000/api/wishlist/get-wishlist-list",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const wishData = await wishRes.json();

        setIsWishlisted(
          wishData.items?.some(
            pid => pid.toString() === id
          )
        );

      } catch (err) {
        console.error("Sync failed:", err);
      }
    };

    syncState();
  }, [id]);

  /* ================= CART TOGGLE ================= */
  const handleCartToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      setCartLoading(true);

      const url = isInCart
        ? "http://localhost:5000/api/cart/remove"
        : "http://localhost:5000/api/cart/add";

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id })
      });

      setIsInCart(prev => !prev);
    } finally {
      setCartLoading(false);
    }
  };

  /* ================= WISHLIST TOGGLE ================= */
  const handleWishlistToggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      setWishlistLoading(true);

      const url = isWishlisted
        ? "http://localhost:5000/api/wishlist/remove"
        : "http://localhost:5000/api/wishlist/add";

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id })
      });

      setIsWishlisted(prev => !prev);
    } finally {
      setWishlistLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-purple-50">
        <NavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-xl">

          {/* IMAGE */}
          <div className="flex justify-center bg-gray-50 rounded-xl p-5">
            <img
              src={product.images}
              alt={product.name}
              className="max-h-[420px] object-contain"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(product.rating)
                      ? "text-amber-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="text-3xl font-bold text-purple-700 mb-4">
              ₹{product.price}
            </p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* ACTION BUTTONS */}
            <div className="mt-auto flex gap-3">

              {/* CART */}
              <button
                onClick={handleCartToggle}
                disabled={cartLoading}
                className={`flex-1 py-3 rounded-lg font-semibold transition
                  ${isInCart
                    ? "bg-green-600 text-white"
                    : "bg-purple-700 text-white"}
                `}
              >
                {cartLoading
                  ? "Processing..."
                  : isInCart
                    ? "Remove from Cart"
                    : "Add to Cart"}
              </button>

              {/* WISHLIST */}
              <button
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className={`flex-1 py-3 rounded-lg font-semibold transition border-2
                  ${isWishlisted
                    ? "border-red-600 text-red-600"
                    : "border-purple-700 text-purple-700"}
                `}
              >
                {wishlistLoading
                  ? "Processing..."
                  : isWishlisted
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
              </button>

            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">
          Recommended Products
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductDetails;
