import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "../components/user/NavBar";
import ProductGrid from "../components/user/ProductGrid";

const PRODUCTS_PER_PAGE = 30;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/search?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}&keyword=${keyword}`
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // 🔑 backend-sliced data
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage,keyword]);

  return (
    <div>
      <NavBar />

      {loading ? (
        <p className="text-center mt-10">Loading products...</p>
      ) : (
        <ProductGrid products={products} />
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 my-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-purple-700 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
