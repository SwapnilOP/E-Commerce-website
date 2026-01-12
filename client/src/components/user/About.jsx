import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-400 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Quality You Love, Prices You Deserve
        </h1>
        <p className="mt-6 text-purple-100 text-lg max-w-2xl mx-auto">
          ShopEase makes online shopping simple, affordable, and reliable —
          curated products, trusted quality, and fast delivery.
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl">
          Our mission is to redefine online shopping by offering premium-quality
          products at honest prices. We focus on customer satisfaction,
          transparency, and long-term trust.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-purple-600">10k+</h3>
            <p className="text-gray-600 mt-1">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">5k+</h3>
            <p className="text-gray-600 mt-1">Products</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">24/7</h3>
            <p className="text-gray-600 mt-1">Support</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-purple-600">Fast</h3>
            <p className="text-gray-600 mt-1">Delivery</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {[
          {
            title: "Fast Delivery",
            desc: "Quick and reliable shipping with secure packaging.",
          },
          {
            title: "Premium Quality",
            desc: "Every product goes through strict quality checks.",
          },
          {
            title: "Affordable Prices",
            desc: "Best value deals without compromising standards.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow-sm border border-purple-100
                       hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <h3 className="text-xl font-semibold text-purple-700">
              {item.title}
            </h3>
            <p className="text-gray-600 mt-3">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-16 text-center">
        <h2 className="text-3xl font-semibold">
          Made With Love By Swapnil
        </h2>
        <p className="mt-4 text-purple-200 max-w-xl mx-auto">
          ( and with little efforts too )
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-8 py-3 bg-white text-purple-700
                     font-semibold rounded-xl shadow
                     hover:bg-gray-100 hover:scale-105 transition"
        >
          Start Shopping
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center mt-auto">
        <p className="text-sm">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
