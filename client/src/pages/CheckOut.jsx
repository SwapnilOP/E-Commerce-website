import React from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../components/user/NavBar'

const CheckOut = () => {

  const loadRazorpaySDK = () => {
    return new Promise((resolve) => {
      // If already loaded, skip
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleContinueToPayment = async () => {
    const loaded = await loadRazorpaySDK();
    if (!loaded) {
      alert("razorpay sdk failed to load");
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      alert("user not authenticated");
      return;
    }
    const orderRes = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: subtotal }),
      }
    );

    if (!orderRes.ok) {
      alert("failed to create order");
      return;
    }
    const order = await orderRes.json();
    const options = {
      key: "rzp_test_S162DydRbZSlBU",
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "My MERN Store",
      description: "Secure Checkout",

      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },

      handler: async function (response) {
        const verifyRes = await fetch(
          "http://localhost:5000/api/payment/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(response),
          }
        );

        const result = await verifyRes.json();

        if (result.success) {
          alert("Payment Successful ✅");
        } else {
          alert("Payment verification failed ❌");
        }
      },

      theme: {
        color: "#7c3aed",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const location = useLocation()
  const { items, subtotal } = location.state || {}

  if (!items || subtotal === undefined) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center h-[80vh] bg-gray-50">
          <div className="text-center space-y-2">
            <p className="text-xl font-medium text-gray-700">
              Your checkout is empty
            </p>
            <p className="text-gray-500">
              Add items to your cart to continue
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: ITEMS */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>

                  <p className="text-lg font-semibold text-gray-900">
                    ₹{subtotal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRICE CARD */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Price Details
            </h3>

            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>Included</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <span className="text-lg font-medium text-gray-800">
                Total
              </span>
              <span className="text-2xl font-semibold text-gray-900">
                ₹{subtotal}
              </span>
            </div>

            <button
              onClick={handleContinueToPayment}
              className="w-full cursor-pointer mt-6 bg-gray-900 text-white py-3 rounded-xl text-lg
                         hover:scale-[1.02] hover:bg-purple-600
                         active:scale-[0.98] transition-all"
            >
              Continue to Payment
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Secure checkout • No hidden fees
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default CheckOut
