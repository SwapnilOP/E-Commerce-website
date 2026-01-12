import React from "react";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const StatusBadge = ({ status }) => {
  const style =
    statusStyles[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
