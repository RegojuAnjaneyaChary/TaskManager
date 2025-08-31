import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App"; // your API base URL
import { toast } from "react-hot-toast"; // ✅ import toast

const AddCommentToTicketById = () => {
  const [ticketID, setTicketID] = useState(""); // MongoDB ticket ID
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticketID.trim()) {
      setMessage("⚠️ Ticket ID is required!");
      toast.error("Ticket ID is required!");
      return;
    }
    if (!comment.trim()) {
      setMessage("⚠️ Comment cannot be empty!");
      toast.error("Comment cannot be empty!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${apiUrl}/employee/addcommetToTicket/${ticketID}`,
        { comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "✅ Comment added successfully!");
      toast.success(response.data.message || "Comment added successfully!");
      setComment("");
    } catch (error) {
      console.error("Add comment error:", error);
      const errorMessage = error.response?.data?.message || "❌ Failed to add comment";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Comment to Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ticket ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
            <input
              type="text"
              value={ticketID}
              onChange={(e) => setTicketID(e.target.value)}
              placeholder="Enter Ticket ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
          >
            {loading ? "Adding..." : "Add Comment"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddCommentToTicketById;
