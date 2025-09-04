
import React, { useState } from "react";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const ViewCommentsTicketById = () => {
  const [ticketID, setTicketID] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch comments
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

  // Edit comment
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
        handleFetchComments();
      } else {
        toast.error(data.message || "Failed to edit comment ❌");
      }
    } catch (error) {
      console.error("Edit error:", error);
      toast.error("Error editing comment ❌");
    }
  };

  // Delete comment
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
        handleFetchComments();
      } else {
        toast.error(data.message || "Failed to delete comment ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting comment ❌");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
      style={{ minHeight: "80vh" }}
    >
      <div className="w-full max-w-xl bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
        {/* Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
          View Comments
        </h2>

        {/* Form */}
        <label className="block text-gray-700 font-medium mb-1 text-sm">
          Ticket ID
        </label>
        <input
          type="text"
          value={ticketID}
          onChange={(e) => setTicketID(e.target.value)}
          placeholder="Enter Ticket ID"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm mb-3 text-sm"
        />

        <button
          onClick={handleFetchComments}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg shadow-md text-sm mb-4"
        >
          {loading ? "Loading..." : "Fetch Comments"}
        </button>

        {/* Comments Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-md sm:text-lg font-semibold mb-2 text-gray-800 border-b pb-1">
            Comments ({comments.length})
          </h3>

          <div className="flex-1 overflow-y-auto max-h-60 pr-2 space-y-3 border rounded-lg p-2 bg-gray-50">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm break-words text-sm"
                >
                  {editingCommentId === comment._id ? (
                    <>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border p-2 rounded mb-2 text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-3 py-1 bg-gray-400 text-white rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700 mb-1">
                        <span className="font-semibold">Comment:</span>{" "}
                        {comment.text || comment.comment}
                      </p>
                      <p className="text-gray-500 mb-1">
                        <span className="font-semibold">By:</span>{" "}
                        {comment.commentedBy?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-400 mb-2">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleString()
                          : ""}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment._id);
                            setEditText(comment.text || comment.comment);
                          }}
                          className="text-blue-500 hover:text-blue-700 text-xs"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No comments to show
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCommentsTicketById;
