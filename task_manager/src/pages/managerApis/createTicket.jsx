import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";

const CreateTicket = () => {
  const [formData, setFormData] = useState({ title: "", description: "", assignTo: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiUrl}/ticket/create`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Task created successfully!");
      setFormData({ title: "", description: "", assignTo: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <input
          type="text"
          name="assignTo"
          value={formData.assignTo}
          onChange={handleChange}
          placeholder="Assign To (Employee ID)"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-2 rounded text-center ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateTicket;
