import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      {/* Left */}
      <h1 className="text-xl font-semibold text-indigo-700 tracking-wide">
        ShopEase Admin
      </h1>

      {/* Right */}
      <button
        onClick={logoutHandler}
        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
