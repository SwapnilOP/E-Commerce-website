import React from "react";
import NavBar from "../components/user/NavBar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-400 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-purple-100">
          Have questions? We’re here to help you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-white rounded-xl shadow-sm border border-purple-100">
              <p className="font-semibold text-purple-700">📧 Email</p>
              <p className="text-gray-600">support@shopease.com</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow-sm border border-purple-100">
              <p className="font-semibold text-purple-700">📞 Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow-sm border border-purple-100">
              <p className="font-semibold text-purple-700">📍 Location</p>
              <p className="text-gray-600">India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send a Message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg
                         hover:bg-purple-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Contact;
