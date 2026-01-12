import React, { useState, useEffect } from "react";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/info?infoType=orders",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { key: "_id", label: "Order ID" },
    { key: "user", label: "User" },
    { key: "createdAt", label: "Date" },
    { key: "totalAmount", label: "Total (₹)" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500 mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Orders Table */}
      <AdminTable
        columns={columns}
        data={orders.map((order) => ({
          ...order,
          user: order.user?.name || "N/A",
          createdAt: new Date(order.createdAt).toLocaleDateString(),
          status: <StatusBadge status={order.status} />,
        }))}
        renderActions={(order) => (
          <select
            value={order.status}
            onChange={(e) => {
              const newStatus = e.target.value;
              setOrders((prev) =>
                prev.map((o) =>
                  o._id === order._id
                    ? { ...o, status: newStatus }
                    : o
                )
              );
            }}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        )}
      />
    </div>
  );
};

export default Orders;
