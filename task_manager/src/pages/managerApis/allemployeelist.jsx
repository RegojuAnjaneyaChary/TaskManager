import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const AllemployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEmployees(response.data.data);

      if (response.data.data.length === 0) {
        toast("No employees found ⚠️");
      } else {
        toast.success("Employees loaded successfully ✅");
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.response?.data?.message || "Failed to fetch employees");
      toast.error(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete Employee
  const handleDelete = async (employeeID) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await axios.delete(`${apiUrl}/ticket/delete/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEmployees((prev) => prev.filter((emp) => emp._id !== employeeID));
      toast.success(response.data.message || "Employee deleted successfully ✅");
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error(err.response?.data?.message || "Failed to delete employee ❌");
    }
  };

  if (loading)
    return <p className="text-center py-6 text-gray-500 animate-pulse">Loading employees...</p>;
  if (error)
    return <p className="text-red-600 text-center py-6">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        👥 Employee Directory
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-indigo-50 transition duration-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 text-gray-600">{emp._id}</td>
                <td className="py-3 px-4 font-medium text-gray-800">{emp.name}</td>
                <td className="py-3 px-4 text-gray-700">{emp.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      emp.role === "Manager"
                        ? "bg-green-600"
                        : emp.role === "Employee"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {emp.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllemployeeList;
