import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setProduct({
          name: data.name,
          price: data.price,
          stock: data.stock,
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      });

      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Product Name"
        />

        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Price"
        />

        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Stock"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
