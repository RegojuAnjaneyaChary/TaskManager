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
      toast.success(response.data.message || "Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error(err.response?.data?.message || "Failed to delete employee");
    }
  };

  if (loading) return <p className="text-center py-4">Loading employees...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Employee List</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{emp._id}</td>
                <td className="py-3 px-4 font-medium">{emp.name}</td>
                <td className="py-3 px-4">{emp.role}</td>
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
                <td colSpan="5" className="py-4 text-center text-gray-500">
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
