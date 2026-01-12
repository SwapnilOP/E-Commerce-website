import React from "react";

const AdminTable = ({ columns, data, renderActions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-6 py-3 font-medium"
              >
                {col.label}
              </th>
            ))}

            {renderActions && (
              <th className="text-left px-6 py-3 font-medium">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="text-center px-6 py-8 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row._id || index}
                className="border-t hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {row[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-6 py-4">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
