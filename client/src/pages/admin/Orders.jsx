import React, { useState, useEffect } from "react";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleChange = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      )
    );
    try {
      console.log("Updating order status:", orderId, newStatus);
      await fetch(`http://localhost:5000/api/admin/update-status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      console.log("Order status updated successfully");
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/info?infoType=orders`,
          {
            headers: {
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
            onChange={(e) =>
              handleChange(order._id, e.target.value)
            }
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        )}
      />
    </div>
  );
};

export default Orders;
