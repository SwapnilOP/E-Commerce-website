import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handelEdit = (productId) => {
    navigate(`/admin/edit/${productId}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/info?infoType=products`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { key: "_id", label: "Product ID" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price (₹)" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Products
        </h1>
        <p className="text-gray-500 mt-1">
          Manage store products
        </p>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={products}
        renderActions={(product) => (
          <button
            className="text-indigo-600 hover:underline text-sm"
            onClick={() => handelEdit(product._id)}
          >
            Edit
          </button>
        )}
      />

    </div>
  );
};

export default Products;
