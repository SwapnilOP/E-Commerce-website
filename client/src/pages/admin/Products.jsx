import React, { useState, useEffect } from "react";
import AdminTable from "../../components/admin/AdminTable";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/info?infoType=products",
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
        renderActions={() => (
          <button className="text-indigo-600 hover:underline text-sm">
            Edit
          </button>
        )}
      />
    </div>
  );
};

export default Products;
