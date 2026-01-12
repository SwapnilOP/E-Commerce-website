import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        const statsData = [
          {
            title: "Total Products",
            value: data.totalProducts,
            icon: <FaBox size={30} />,
            color: "bg-indigo-500",
          },
          {
            title: "Total Orders",
            value: data.totalOrders,
            icon: <FaClipboardList size={30} />,
            color: "bg-green-500",
          },
          {
            title: "Total Users",
            value: data.totalUsers,
            icon: <FaUsers size={30} />,
            color: "bg-purple-500",
          },
        ];

        setStats(statsData);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of store performance
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
