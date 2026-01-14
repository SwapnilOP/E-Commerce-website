import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaBox,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

const linkBase =
  "flex items-center gap-3 px-4 py-3 rounded-lg transition";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] p-4">
      <nav className="space-y-2 text-gray-700 font-medium">

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FaBox />
          Products
        </NavLink>

        <NavLink
          to="/admin/Addproducts"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FaBox />
          Add Products
        </NavLink>

        <NavLink
          to="/admin/Addbanners"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FaBox />
          Add Banner
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FaClipboardList />
          Orders
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`
          }
        >
          <FaUsers />
          Users
        </NavLink>

      </nav>
    </aside>
  );
};

export default AdminSidebar;
