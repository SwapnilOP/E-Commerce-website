import React, { useState, useEffect } from "react";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/info?infoType=users`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { key: "_id", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Users
        </h1>
        <p className="text-gray-500 mt-1">
          Manage platform users
        </p>
      </div>

      {/* Users Table */}
      <AdminTable
        columns={columns}
        data={users.map((u) => ({
          ...u,
          status: (
            <StatusBadge
              status={u.status || (u.isBlocked ? "Blocked" : "Active")}
            />
          ),
        }))}
      />
    </div>
  );
};

export default Users;
