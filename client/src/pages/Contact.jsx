import React from "react";
import NavBar from "../components/user/NavBar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <NavBar />

      {/* Header */}
      <section className="relative bg-gradient-to-r from-purple-700 to-purple-500 text-white py-24 text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_70%)]"></div>

        <h1 className="relative text-4xl md:text-5xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        <p className="relative mt-4 text-purple-100 max-w-xl mx-auto">
          Need help or have a question? Reach out anytime.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          
          {/* Email */}
          <div className="group bg-white/80 backdrop-blur rounded-2xl p-8 shadow-md border border-purple-100 hover:shadow-xl transition">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Email
            </h3>
            <p className="text-gray-600">
              support@shopease.com
            </p>
          </div>

          {/* Phone */}
          <div className="group bg-white/80 backdrop-blur rounded-2xl p-8 shadow-md border border-purple-100 hover:shadow-xl transition">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Phone
            </h3>
            <p className="text-gray-600">
              +91 98765 43210
            </p>
          </div>

          {/* Location */}
          <div className="group bg-white/80 backdrop-blur rounded-2xl p-8 shadow-md border border-purple-100 hover:shadow-xl transition">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Location
            </h3>
            <p className="text-gray-600">
              India
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
