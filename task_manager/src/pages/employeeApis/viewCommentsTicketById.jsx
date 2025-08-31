
import React, { useState } from "react";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const ViewCommentsTicketById = () => {
  const [ticketID, setTicketID] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ Fetch comments
  const handleFetchComments = async () => {
    if (!ticketID.trim()) {
      toast.error("⚠️ Please enter a Ticket ID");
      return;
    }

    setLoading(true);
    setComments([]);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/employee/viewcommetToTicket/${ticketID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.data) {
        setComments(data.data);
        toast.success("Comments loaded successfully ✅");
      } else {
        toast.error(data.message || "No comments found");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("❌ Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit Comment
  const handleEditComment = async (commentID) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/employee/comment/edit/${ticketID}/${commentID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment: editText }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEditingCommentId(null);
        setEditText("");
        toast.success("Comment updated successfully ✅");
        handleFetchComments(); // refresh list
      } else {
        toast.error(data.message || "Failed to edit comment ❌");
      }
    } catch (error) {
      console.error("Edit error:", error);
      toast.error("Error editing comment ❌");
    }
  };

  // ✅ Delete Comment
  const handleDeleteComment = async (commentID) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/employee/comment/delete/${ticketID}/${commentID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Comment deleted successfully 🗑️");
        handleFetchComments(); // refresh list
      } else {
        toast.error(data.message || "Failed to delete comment ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting comment ❌");
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
    <div className="pt-20 px-4 md:px-8 lg:px-16">
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

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Comments</h3>
            <ul className="space-y-3">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex justify-between items-start"
                >
                  <div>
                    {editingCommentId === comment._id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full border p-2 rounded-lg"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="px-3 py-1 bg-gray-400 text-white rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700">
                          <strong>Comment:</strong> {comment.text || comment.comment}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong>By:</strong> {getCommenterName(comment)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Action buttons */}
                  {editingCommentId !== comment._id && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditText(comment.text || comment.comment);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
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
