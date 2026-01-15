import React, { useState } from "react";

const AddressInputForm = ({setIsAdressAdded}) => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitAddress = async () => {
    try {
      const token = localStorage.getItem("token")?.trim();
      if (!token) {
        alert("User not authenticated");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/address?operation=add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ address: formData }),
        }
      );

      if (!res.ok) {
        console.error("Failed to submit address", res.status);
        return;
      }

      alert("Address saved successfully ✅");
      setIsAdressAdded(true);

    } catch (err) {
      console.error("Error submitting address:", err);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-2xl shadow-sm bg-gray-200 p-6 space-y-5">
      <h3 className="text-xl font-semibold text-gray-800">
        Shipping Address
      </h3>

      {/* Country */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="India"
          className="border p-2 rounded-lg"
        />
      </div>

      {/* State + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Maharashtra"
            className="border p-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Pune"
            className="border p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Pincode */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="411001"
          maxLength={6}
          className="border p-2 rounded-lg"
        />
      </div>

      {/* Landmark */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">
          Landmark (optional)
        </label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          placeholder="Near Metro Station"
          className="border p-2 rounded-lg"
        />
      </div>

      <button
        onClick={submitAddress}
        className="w-full bg-gradient-to-r from-purple-600 to-violet-600
                   hover:opacity-90 text-white py-3 rounded-xl font-semibold transition"
      >
        Save Address
      </button>
    </div>
  );
};

export default AddressInputForm;
