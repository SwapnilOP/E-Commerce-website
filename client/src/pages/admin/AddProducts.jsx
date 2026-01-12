import React, { useState } from "react";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    images: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert images string to array
    const payload = {
      ...formData,
      images: formData.images
        .split(",")
        .map((img) => img.trim()),
    };

    console.log("ADD PRODUCT PAYLOAD:", payload);
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );
       
      if (res.ok) { 
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
            price: "",
            stock: "",
            category: "",
            brand: "",
            images: "",
        });
      }
    } catch (err) {
        console.error("Error adding product:", err);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          value={formData.images}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
