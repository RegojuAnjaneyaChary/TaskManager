import React, { useState } from "react";
import { apiUrl } from "../../App"; // Make sure this file exports your apiUrl

const ViewCommentsTicketById = () => {
  const [ticketID, setTicketID] = useState(""); // Changed to match backend parameter name
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetchComments = async () => {
    if (!ticketID) {
      setMessage("Please enter a Ticket ID");
      return;
    }

    setLoading(true);
    setMessage("");
    setComments([]);

    try {
      const token = localStorage.getItem("token"); // Get JWT token

      // FIXED: Use ticketID to match backend parameter name
      const response = await fetch(`${apiUrl}/employee/viewcommetToTicket/${ticketID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.data) {
        console.log("Comments data:", data.data); // Debug: see the actual data structure
        setComments(data.data);
      } else {
        // Show the actual error message from backend
        setMessage(data.message || data.error || "No comments found for this ticket");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setMessage("Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get commenter name
  const getCommenterName = (comment) => {
    console.log("Comment object:", comment); // Debug: see individual comment structure

    // Check if commentedBy is populated (object with user details)
    if (comment.commentedBy && typeof comment.commentedBy === 'object') {
      console.log("commentedBy object:", comment.commentedBy);
      return comment.commentedBy.name || comment.commentedBy.username || "Unknown";
    }

    // Check if commentedBy is just an ID (string)
    if (comment.commentedBy && typeof comment.commentedBy === 'string') {
      console.log("commentedBy is ID:", comment.commentedBy);
      return "User ID: " + comment.commentedBy;
    }

    // Fallback to other possible fields
    return comment.commenterName || comment.user?.name || "Unknown";
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">View Comments for Ticket</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Ticket ID</label>
        <input
          type="text"
          value={ticketID}
          onChange={(e) => setTicketID(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter Ticket ID"
        />
      </div>
      <button
        onClick={handleFetchComments}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Loading..." : "Fetch Comments"}
      </button>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      {comments.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li
                key={index}
                className="border p-2 rounded bg-gray-50"
              >
                <p><strong>Comment:</strong> {comment.text || comment.comment}</p>
                <p className="text-sm text-gray-500">
                  <strong>By:</strong> {getCommenterName(comment)}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewCommentsTicketById;
