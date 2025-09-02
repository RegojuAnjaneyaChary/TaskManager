import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const CreateTicket = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.data || []);
    } catch (err) {
      console.error("Error fetching employees:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch employees");
      toast.error(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignTo) {
      toast.error("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authenticated. Please login again.");
      return;
    }

    try {
      const payload = {
        title,
        description,
        assignTo,
      };

      if (employeeEmail.trim() !== "") {
        payload.employeeEmail = employeeEmail;
      }

      console.log("📤 Sending payload:", payload);

      const response = await axios.post(`${apiUrl}/ticket/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message || "Ticket created successfully");

      // Reset form
      setTitle("");
      setDescription("");
      setAssignTo("");
      setEmployeeEmail("");
    } catch (err) {
      console.error("❌ Error creating ticket:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to create ticket");
    }
  };

  if (loading) return <p className="text-center py-4">Loading employees...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Assign To</label>
          <select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Additional Email (optional)</label>
          <input
            type="email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="someone@example.com"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
