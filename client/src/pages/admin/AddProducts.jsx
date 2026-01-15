import React, { useState } from "react";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    setUploading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      setFormData((p) => ({
        ...p,
        images: [...p.images, data.imageUrl], // ✅ correct key
      }));
    } catch (e) {
      console.error("Upload failed", e);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Product added");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        images: [],
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
          <p className="text-sm text-gray-500">
            Create a new product and upload images
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* DETAILS */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="input md:col-span-2 min-h-[100px]"
                required
              />
            </div>
          </section>

          {/* PRICING */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Pricing & Stock
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                placeholder="Price (₹)"
                value={formData.price}
                onChange={handleChange}
                className="input"
                required
              />
              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="input"
              />
            </div>
          </section>

          {/* IMAGES */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Product Images
            </h2>

            <div className="border-2 border-dashed rounded-xl p-4">
              <label className="flex items-center justify-center gap-3 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
                <span className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
                  Upload Image
                </span>
                <span className="text-sm text-gray-500">
                  JPG, PNG, WEBP
                </span>
              </label>

              {uploading && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Uploading…
                </p>
              )}

              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                  {formData.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-lg overflow-hidden border"
                    >
                      <img
                        src={img}
                        alt="preview"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              onClick={() =>
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  stock: "",
                  category: "",
                  brand: "",
                  images: [],
                })
              }
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Tailwind helper */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 0.6rem 0.75rem;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,.15);
        }
      `}</style>
    </div>
  );
};

export default AddProducts;
