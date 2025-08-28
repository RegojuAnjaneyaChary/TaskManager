
import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App"; // your API base URL

const AddCommentToTicketById = () => {
  const [ticketID, setTicketID] = useState(""); // MongoDB ticket ID
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!ticketID.trim()) {
      setMessage("Ticket ID is required!");
      return;
    }
    if (!comment.trim()) {
      setMessage("Comment cannot be empty!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // JWT token if required

      // Send POST request to backend
      const response = await axios.post(
        `${apiUrl}/employee/addcommetToTicket/${ticketID}`,
        { comment }, // body matches your backend
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Comment added successfully!");
      setComment(""); // clear comment input
    } catch (error) {
      console.error("Add comment error:", error);
      setMessage(
        error.response?.data?.message || "Failed to add comment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Add Comment to Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ticket ID Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
          <input
            type="text"
            value={ticketID}
            onChange={(e) => setTicketID(e.target.value)}
            placeholder="Enter Ticket ID"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default AddCommentToTicketById;

