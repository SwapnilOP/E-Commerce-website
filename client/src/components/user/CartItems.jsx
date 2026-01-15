import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdressInputForm from "./AdressInputForm";
import { FaTrash } from 'react-icons/fa';

const CartItems = ({ items, setItems }) => {

  const [isAdressAdded, setIsAdressAdded] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const checkAdress = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/address?operation=isAdded`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) {
          return console.error("failed to fetch adress info", res.status);
        }
        const data = await res.json();
        setIsAdressAdded(data.isAddressAdded);
        setAddress(data.address);
      } catch (err) {
        console.error("Error fetching adress info:", err);
      }
    }
    checkAdress();
  }, [])

  const handelDeleteAdress = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/address?operation=remove`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) {
        return console.error("Failed to remove address", res.status);
      }
      setIsAdressAdded(false);
    } catch (err) {
      console.error("Error removing address:", err);
    }
  };

  const safeItems = Array.isArray(items) ? items : [];
  const navigate = useNavigate();
  const subtotal = safeItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (safeItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Add something before I shut down.
          </p>
          <div className="mt-5">
            <Link to='/' className='border rounded-lg p-1 px-2'>Shop now</Link>
          </div>
        </div>
      </div>
    );
  }

  const goToCheckOut = () => {
    const data = {
      subtotal: subtotal,
      items: items
    }
    navigate("/checkout", { state: data });
  }

  const updateQuantity = async (productId, op) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/update/${productId}?operation=${op}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        setItems(prevItems => {
          if (op === "delete") {
            return prevItems.filter(item => item.productId !== productId);
          }

          return prevItems.map(item =>
            item.productId === productId
              ? {
                ...item,
                quantity:
                  op === "add" ? item.quantity + 1 : item.quantity - 1
              }
              : item
          ).filter(item => item.quantity > 0);
        });
      }

    } catch (err) {
      console.error("Update failed:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {safeItems.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row bg-white p-4 hover:scale-[1.02] sm:p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-28 h-90 sm:h-28 object-cover rounded-xl"
              />

              <div className="flex-1 sm:ml-5 mt-4 sm:mt-0">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-green-700 font-medium mt-1">₹ {item.price}</p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => updateQuantity(item.productId, "subtract")}
                    className="w-9 h-9 border cursor-pointer rounded-full text-lg hover:bg-violet-100 transition"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, "add")}
                    className="w-9 h-9 border rounded-full cursor-pointer text-lg hover:bg-violet-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between sm:items-end mt-4 sm:mt-0 sm:ml-6">
                <p className="font-bold text-gray-800 text-lg">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => updateQuantity(item.productId, "delete")}
                  className="text-red-500 text-sm sm:text-base border p-1 rounded-lg cursor-pointer mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Order Summary</h2>
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Delivery</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          {/* adress input */}
          {isAdressAdded && address ? (
            <div className="mt-8 p-4 flex items-start justify-between gap-4 
                  border border-green-300 bg-green-50 rounded-xl">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-green-700">
                  Shipping Address
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {address.landmark}, {address.city}, {address.state} {address.pincode}
                </p>
                <p className="text-gray-600 text-sm">
                  {address.country}
                </p>
              </div>

              <button
                onClick={handelDeleteAdress}
                className="text-red-500 hover:text-red-600 
                 p-2 rounded-full hover:bg-red-100 transition"
                title="Remove address"
              >
                <FaTrash />
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <AdressInputForm setIsAdressAdded={setIsAdressAdded} />
            </div>
          )}


          <button
            onClick={goToCheckOut}
            className={isAdressAdded ? "w-full cursor-pointer mt-6 bg-gradient-to-r from-purple-600 to-violet-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition" : "hidden"}
          >
            Proceed to Checkout
          </button>

        </div>
      </div>
    </div>
  );
};

export default CartItems;