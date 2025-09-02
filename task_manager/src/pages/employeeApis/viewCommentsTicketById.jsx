
// // import React, { useState } from "react";
// // import { apiUrl } from "../../App";
// // import { toast } from "react-hot-toast";

// // const ViewCommentsTicketById = () => {
// //   const [ticketID, setTicketID] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [editingCommentId, setEditingCommentId] = useState(null);
// //   const [editText, setEditText] = useState("");

// //   // ✅ Fetch comments
// //   const handleFetchComments = async () => {
// //     if (!ticketID.trim()) {
// //       toast.error("⚠️ Please enter a Ticket ID");
// //       return;
// //     }

// //     setLoading(true);
// //     setComments([]);

// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(
// //         `${apiUrl}/employee/viewcommetToTicket/${ticketID}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await response.json();

// //       if (response.ok && data.data) {
// //         setComments(data.data);
// //         toast.success("Comments loaded successfully ✅");
// //       } else {
// //         toast.error(data.message || "No comments found");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching comments:", error);
// //       toast.error("❌ Error fetching comments");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Edit Comment
// //   const handleEditComment = async (commentID) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(
// //         `${apiUrl}/employee/comment/edit/${ticketID}/${commentID}`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify({ comment: editText }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (response.ok) {
// //         setEditingCommentId(null);
// //         setEditText("");
// //         toast.success("Comment updated successfully ✅");
// //         handleFetchComments(); // refresh list
// //       } else {
// //         toast.error(data.message || "Failed to edit comment ❌");
// //       }
// //     } catch (error) {
// //       console.error("Edit error:", error);
// //       toast.error("Error editing comment ❌");
// //     }
// //   };

// //   // ✅ Delete Comment
// //   const handleDeleteComment = async (commentID) => {
// //     if (!window.confirm("Are you sure you want to delete this comment?")) return;

// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(
// //         `${apiUrl}/employee/comment/delete/${ticketID}/${commentID}`,
// //         {
// //           method: "DELETE",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await response.json();

// //       if (response.ok) {
// //         toast.success("Comment deleted successfully 🗑️");
// //         handleFetchComments(); // refresh list
// //       } else {
// //         toast.error(data.message || "Failed to delete comment ❌");
// //       }
// //     } catch (error) {
// //       console.error("Delete error:", error);
// //       toast.error("Error deleting comment ❌");
// //     }
// //   };

// //   const getCommenterName = (comment) => {
// //     if (comment.commentedBy && typeof comment.commentedBy === "object") {
// //       return comment.commentedBy.name || comment.commentedBy.username || "Unknown";
// //     }
// //     if (comment.commentedBy && typeof comment.commentedBy === "string") {
// //       return "User ID: " + comment.commentedBy;
// //     }
// //     return comment.commenterName || comment.user?.name || "Unknown";
// //   };

// //   return (
// //     <div className="pt-20 px-4 md:px-8 lg:px-16">
// //       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           View Comments for Ticket
// //         </h2>

// //         {/* Ticket ID Input */}
// //         <div className="mb-4">
// //           <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
// //           <input
// //             type="text"
// //             value={ticketID}
// //             onChange={(e) => setTicketID(e.target.value)}
// //             placeholder="Enter Ticket ID"
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
// //           />
// //         </div>

// //         {/* Fetch Button */}
// //         <button
// //           onClick={handleFetchComments}
// //           disabled={loading}
// //           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
// //         >
// //           {loading ? "Loading..." : "Fetch Comments"}
// //         </button>

// //         {/* Comments List */}
// //         {comments.length > 0 && (
// //           <div className="mt-6">
// //             <h3 className="text-lg font-semibold mb-3 text-gray-800">Comments</h3>
// //             <ul className="space-y-3">
// //               {comments.map((comment) => (
// //                 <li
// //                   key={comment._id}
// //                   className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex justify-between items-start"
// //                 >
// //                   <div>
// //                     {editingCommentId === comment._id ? (
// //                       <div>
// //                         <textarea
// //                           value={editText}
// //                           onChange={(e) => setEditText(e.target.value)}
// //                           className="w-full border p-2 rounded-lg"
// //                         />
// //                         <div className="flex gap-2 mt-2">
// //                           <button
// //                             onClick={() => handleEditComment(comment._id)}
// //                             className="px-3 py-1 bg-green-500 text-white rounded"
// //                           >
// //                             Save
// //                           </button>
// //                           <button
// //                             onClick={() => setEditingCommentId(null)}
// //                             className="px-3 py-1 bg-gray-400 text-white rounded"
// //                           >
// //                             Cancel
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <>
// //                         <p className="text-gray-700">
// //                           <strong>Comment:</strong> {comment.text || comment.comment}
// //                         </p>
// //                         <p className="text-sm text-gray-500">
// //                           <strong>By:</strong> {getCommenterName(comment)}
// //                         </p>
// //                         <p className="text-xs text-gray-400">
// //                           {new Date(comment.createdAt).toLocaleString()}
// //                         </p>
// //                       </>
// //                     )}
// //                   </div>

// //                   {/* Action buttons */}
// //                   {editingCommentId !== comment._id && (
// //                     <div className="flex gap-2 ml-4">
// //                       <button
// //                         onClick={() => {
// //                           setEditingCommentId(comment._id);
// //                           setEditText(comment.text || comment.comment);
// //                         }}
// //                         className="text-blue-500 hover:text-blue-700"
// //                       >
// //                         ✏️
// //                       </button>
// //                       <button
// //                         onClick={() => handleDeleteComment(comment._id)}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         🗑️
// //                       </button>
// //                     </div>
// //                   )}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewCommentsTicketById;






// import React, { useState } from "react";
// import { apiUrl } from "../../App";
// import { toast } from "react-hot-toast";

// const ViewCommentsTicketById = () => {
//   const [ticketID, setTicketID] = useState("");
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editText, setEditText] = useState("");



//  const containerStyle = {
//   minHeight: "80vh",        // full viewport height
//   width: "100%",
//   backgroundColor: "#f9fafb",
//   display: "flex",
//   alignItems: "center",      // vertical centering
//   justifyContent: "center",  // horizontal centering
//   padding: "1rem",
//   boxSizing: "border-box",   // include padding in size
//   overflow: "hidden",
// };

// const cardStyle = {
//   width: "100%",
//   maxWidth: "768px",
//   backgroundColor: "#ffffff",
//   padding: "1.5rem",
//   borderRadius: "1rem",
//   boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
//   boxSizing: "border-box",
// };


//   const handleFetchComments = async () => {
//     if (!ticketID.trim()) {
//       toast.error("⚠️ Please enter a Ticket ID");
//       return;
//     }
//     setLoading(true);
//     setComments([]);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `${apiUrl}/employee/viewcommetToTicket/${ticketID}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (response.ok && data.data) {
//         setComments(data.data);
//         toast.success("Comments loaded successfully ✅");
//       } else {
//         toast.error(data.message || "No comments found");
//       }
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//       toast.error("❌ Error fetching comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditComment = async (commentID) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `${apiUrl}/employee/comment/edit/${ticketID}/${commentID}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ comment: editText }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setEditingCommentId(null);
//         setEditText("");
//         toast.success("Comment updated successfully ✅");
//         handleFetchComments();
//       } else {
//         toast.error(data.message || "Failed to edit comment ❌");
//       }
//     } catch (error) {
//       console.error("Edit error:", error);
//       toast.error("Error editing comment ❌");
//     }
//   };

//   const handleDeleteComment = async (commentID) => {
//     if (!window.confirm("Are you sure you want to delete this comment?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `${apiUrl}/employee/comment/delete/${ticketID}/${commentID}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         toast.success("Comment deleted successfully 🗑️");
//         handleFetchComments();
//       } else {
//         toast.error(data.message || "Failed to delete comment ❌");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("Error deleting comment ❌");
//     }
//   };

//   const getCommenterName = (comment) => {
//     if (comment.commentedBy && typeof comment.commentedBy === "object") {
//       return comment.commentedBy.name || comment.commentedBy.username || "Unknown";
//     }
//     if (comment.commentedBy && typeof comment.commentedBy === "string") {
//       return "User ID: " + comment.commentedBy;
//     }
//     return comment.commenterName || comment.user?.name || "Unknown";
//   };

//   return (
//     <div style={containerStyle}>
//       <div  style={cardStyle}>
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
//           View Comments for Ticket
//         </h2>

//         {/* Ticket ID Input */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Ticket ID</label>
//           <input
//             type="text"
//             value={ticketID}
//             onChange={(e) => setTicketID(e.target.value)}
//             placeholder="Enter Ticket ID"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           />
//         </div>

//         {/* Fetch Button */}
//         <button
//           onClick={handleFetchComments}
//           disabled={loading}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition duration-200"
//         >
//           {loading ? "Loading..." : "Fetch Comments"}
//         </button>

//         {/* Comments List */}
//         {comments.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
//               Comments ({comments.length})
//             </h3>
//             <ul className="space-y-4">
//               {comments.map((comment) => (
//                 <li
//                   key={comment._id}
//                   className="p-4 sm:p-5 rounded-lg bg-gray-50 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 break-words"
//                 >
//                   <div className="flex-1 w-full">
//                     {editingCommentId === comment._id ? (
//                       <div>
//                         <textarea
//                           value={editText}
//                           onChange={(e) => setEditText(e.target.value)}
//                           className="w-full border p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
//                         />
//                         <div className="flex gap-2 mt-2 flex-wrap">
//                           <button
//                             onClick={() => handleEditComment(comment._id)}
//                             className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={() => setEditingCommentId(null)}
//                             className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         <p className="text-gray-700 mb-1 break-words">
//                           <span className="font-semibold">Comment:</span>{" "}
//                           {comment.text || comment.comment}
//                         </p>
//                         <p className="text-sm text-gray-500 mb-1">
//                           <span className="font-semibold">By:</span> {getCommenterName(comment)}
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           {new Date(comment.createdAt).toLocaleString()}
//                         </p>
//                       </>
//                     )}
//                   </div>

//                   {/* Action buttons */}
//                   {editingCommentId !== comment._id && (
//                     <div className="flex gap-3 mt-2 sm:mt-0 flex-shrink-0">
//                       <button
//                         onClick={() => {
//                           setEditingCommentId(comment._id);
//                           setEditText(comment.text || comment.comment);
//                         }}
//                         className="text-blue-500 hover:text-blue-700 transition text-lg"
//                         title="Edit Comment"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         onClick={() => handleDeleteComment(comment._id)}
//                         className="text-red-500 hover:text-red-700 transition text-lg"
//                         title="Delete Comment"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewCommentsTicketById;



import React, { useState } from "react";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const ViewCommentsTicketById = () => {
  const [ticketID, setTicketID] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

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
    <div className=" flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-10"   style={{ minHeight: "80vh" }}>
      <div className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          View Comments for Ticket
        </h2>

        {/* Ticket ID Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ticket ID</label>
          <input
            type="text"
            value={ticketID}
            onChange={(e) => setTicketID(e.target.value)}
            placeholder="Enter Ticket ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          />
        </div>

        {/* Fetch Button */}
        <button
          onClick={handleFetchComments}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
        >
          {loading ? "Loading..." : "Fetch Comments"}
        </button>

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Comments ({comments.length})
            </h3>
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment._id}
                  className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 break-words"
                >
                  <div className="flex-1 w-full">
                    {editingCommentId === comment._id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full border p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-700 mb-1 break-words">
                          <span className="font-semibold">Comment:</span>{" "}
                          {comment.text || comment.comment}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                          <span className="font-semibold">By:</span> {getCommenterName(comment)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Action buttons */}
                  {editingCommentId !== comment._id && (
                    <div className="flex gap-3 mt-2 sm:mt-0 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditText(comment.text || comment.comment);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition text-lg"
                        title="Edit Comment"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:text-red-700 transition text-lg"
                        title="Delete Comment"
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

