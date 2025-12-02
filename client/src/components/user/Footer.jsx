import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-purple-100 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ShopEase</h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Your one-stop online store for fashion, electronics, and more.
            We bring quality products right to your doorstep with love 💜.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition">Track Order</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Blog</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-purple-100 text-xl">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-purple-700 pt-4 text-center text-sm text-purple-300">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
