import React, { useState } from "react";

const AddBanner = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "",
    position: 0,
    isActive: true,
    startDate: "",
    endDate: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    setUploading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: fd,
      });

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
    } catch (err) {
      console.error("Banner upload failed", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload a banner image");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/banner/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Banner added successfully");
      setFormData({
        title: "",
        image: "",
        link: "",
        position: 0,
        isActive: true,
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add banner");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Add Homepage Banner
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TITLE */}
        <input
          name="title"
          placeholder="Banner title (optional)"
          value={formData.title}
          onChange={handleChange}
          className="input"
        />

        {/* IMAGE UPLOAD */}
        <div className="border-2 border-dashed rounded-xl p-4 text-center">
          <label className="cursor-pointer inline-block">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
            <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
              Upload Banner Image
            </span>
          </label>

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading…</p>
          )}

          {formData.image && (
            <img
              src={formData.image}
              alt="banner preview"
              className="mt-4 rounded-xl max-h-48 mx-auto"
            />
          )}
        </div>

        {/* LINK */}
        <input
          name="link"
          placeholder="Redirect link (e.g. /shop?category=shoes)"
          value={formData.link}
          onChange={handleChange}
          className="input"
        />

        {/* POSITION */}
        <input
          type="number"
          name="position"
          placeholder="Position (lower = first)"
          value={formData.position}
          onChange={handleChange}
          className="input"
        />

        {/* DATES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* ACTIVE */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active banner
        </label>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            Add Banner
          </button>
        </div>
      </form>

      {/* styles */}
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

export default AddBanner;
