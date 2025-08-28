import React, { useState } from "react";
import { apiUrl } from "../../App";

const ViewCommentsTicketById = () => {
  const [ticketID, setTicketID] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetchComments = async () => {
    if (!ticketID) {
      setMessage("⚠️ Please enter a Ticket ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setComments([]);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/employee/viewcommetToTicket/${ticketID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.data) {
        setComments(data.data);
      } else {
        setMessage(data.message || data.error || "No comments found for this ticket");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setMessage("❌ Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  const getCommenterName = (comment) => {
    if (comment.commentedBy && typeof comment.commentedBy === "object") {
      return comment.commentedBy.name || comment.commentedBy.username || "Unknown";
    }
    if (comment.commentedBy && typeof comment.commentedBy === "string") {
      return "User ID: " + comment.commentedBy;
    }
    return comment.commenterName || comment.user?.name || "Unknown";
  };

  return (
    <div className="pt-20 px-4 md:px-8 lg:px-16"> {/* Add padding top for navbar spacing */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          View Comments for Ticket
        </h2>

        {/* Ticket ID Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
          <input
            type="text"
            value={ticketID}
            onChange={(e) => setTicketID(e.target.value)}
            placeholder="Enter Ticket ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Fetch Button */}
        <button
          onClick={handleFetchComments}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
        >
          {loading ? "Loading..." : "Fetch Comments"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("❌") ? "text-red-600" : "text-yellow-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Comments</h3>
            <ul className="space-y-3">
              {comments.map((comment, index) => (
                <li key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-gray-700"><strong>Comment:</strong> {comment.text || comment.comment}</p>
                  <p className="text-sm text-gray-500"><strong>By:</strong> {getCommenterName(comment)}</p>
                  <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCommentsTicketById;
