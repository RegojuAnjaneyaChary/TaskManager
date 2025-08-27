import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";

const UpdateTicketStatusById = () => {
  const [ticketID, setTicketID] = useState(""); // matches backend param
  const [taskStatus, setTaskStatus] = useState("To do"); // default
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketID) {
      setMessage("Ticket ID is required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // JWT token if required

      const response = await axios.put(
        `${apiUrl}/employee/updateTicketStatus/${ticketID}`,
        { taskStatus }, // matches your backend body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Task updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to update task status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Update Task Status</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
          <input
            type="text"
            value={ticketID}
            onChange={(e) => setTicketID(e.target.value)}
            placeholder="Enter Ticket ID"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Select Status</label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="To do">To do</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default UpdateTicketStatusById;
