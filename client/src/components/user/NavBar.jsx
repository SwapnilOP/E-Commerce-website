import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="text-black bg-purple-200 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black">
          ShopEase
        </Link>

        {/* Nav Links (visible on desktop/tablet) */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li><Link to="/" className="hover:text-gray-600">Home</Link></li>
          <li><Link to="/shop" className="hover:text-gray-600">Shop</Link></li>
          <li><Link to="/about" className="hover:text-gray-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-600">Contact</Link></li>
        </ul>

        {/* Search bar (desktop/tablet only) */}
        <div className="hidden lg:flex items-center h-[60%] w-[30%] border border-gray-400 rounded-full px-3 gap-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for any product"
            className="w-full outline-none text-black placeholder-gray-500"
          />
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Search icon (mobile only) */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="lg:hidden text-gray-700 text-xl"
          >
            <FaSearch />
          </button>

          {/* Cart Icon */}
          <button className="text-black text-2xl relative">
            <FaShoppingCart />
          </button>

          {/* Hamburger Menu (mobile only) */}
          <button
            className="md:hidden text-2xl text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="lg:hidden flex items-center border-t border-b border-gray-300 p-2 bg-white">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for any product"
            className="w-full outline-none text-black"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white text-center space-y-4 py-4">
          <Link to="/" className="block hover:text-gray-300">Home</Link>
          <Link to="/shop" className="block hover:text-gray-300">Shop</Link>
          <Link to="/about" className="block hover:text-gray-300">About</Link>
          <Link to="/contact" className="block hover:text-gray-300">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
