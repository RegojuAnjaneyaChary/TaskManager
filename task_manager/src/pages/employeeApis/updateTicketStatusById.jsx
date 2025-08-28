import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";

const UpdateTicketStatusById = () => {
  const [ticketID, setTicketID] = useState("");
  const [taskStatus, setTaskStatus] = useState("To do");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketID) {
      setMessage("⚠️ Ticket ID is required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/employee/updateTicketStatus/${ticketID}`,
        { taskStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "✅ Task updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "❌ Failed to update task status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Task Status
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ticket ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ticket ID
            </label>
            <input
              type="text"
              value={ticketID}
              onChange={(e) => setTicketID(e.target.value)}
              placeholder="Enter Ticket ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Status
            </label>
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            >
              <option value="To do">To Do</option>
              <option value="Inprogress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            {loading ? "Updating..." : "Update Status"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 text-center font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateTicketStatusById;
