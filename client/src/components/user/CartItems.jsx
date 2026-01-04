import React from "react";

const CartItems = ({ items, setItems }) => {
  const safeItems = Array.isArray(items) ? items : [];

  const subtotal = safeItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (safeItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Add something before I shut down.
          </p>
        </div>
      </div>
    );
  }

  const updateQuantity = async (productId, op) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/update/${productId}?operation=${op}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Update only the quantity of the one item in your local state
        setItems(prevItems =>
          prevItems.map(item =>
            item.productId === productId
              ? { ...item, quantity: op === 'add' ? item.quantity + 1 : item.quantity - 1 }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // !!! REMOVED updateQuantity(); from here !!!

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
              className="flex flex-col sm:flex-row bg-white p-4 sm:p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-28 h-44 sm:h-28 object-cover rounded-xl"
              />

              <div className="flex-1 sm:ml-5 mt-4 sm:mt-0">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-green-700 font-medium mt-1">₹ {item.price}</p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => updateQuantity(item.productId, "remove")}
                    className="w-9 h-9 border rounded-full text-lg hover:bg-violet-100 transition"
                  >
                    −
                  </button>
                  <span className="font-semibold text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, "add")}
                    className="w-9 h-9 border rounded-full text-lg hover:bg-violet-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between sm:items-end mt-4 sm:mt-0 sm:ml-6">
                <p className="font-bold text-gray-800 text-lg">
                  ₹{item.price * item.quantity}
                </p>
                <button className="text-red-500 text-sm sm:text-base hover:underline mt-2">
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
          <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-violet-600 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;