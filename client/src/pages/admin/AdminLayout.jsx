import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (decoded.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top bar */}
      <AdminNavbar />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Left sidebar */}
        <AdminSidebar />

        {/* Routed admin pages */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
