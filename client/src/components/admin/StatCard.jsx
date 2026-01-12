import React from "react";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </h2>
      </div>

      <div
        className={`text-white text-2xl p-4 rounded-full ${color}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
