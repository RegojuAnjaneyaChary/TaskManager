// // import React, { useState } from "react";
// // import axios from "axios";
// // import { apiUrl } from "../../App"; // your API base URL
// // import { toast } from "react-hot-toast"; // ✅ import toast

// // const AddCommentToTicketById = () => {
// //   const [ticketID, setTicketID] = useState(""); // MongoDB ticket ID
// //   const [comment, setComment] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!ticketID.trim()) {
// //       setMessage("⚠️ Ticket ID is required!");
// //       toast.error("Ticket ID is required!");
// //       return;
// //     }
// //     if (!comment.trim()) {
// //       setMessage("⚠️ Comment cannot be empty!");
// //       toast.error("Comment cannot be empty!");
// //       return;
// //     }

// //     setLoading(true);
// //     setMessage("");

// //     try {
// //       const token = localStorage.getItem("token");

// //       const response = await axios.post(
// //         `${apiUrl}/employee/addcommetToTicket/${ticketID}`,
// //         { comment },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setMessage(response.data.message || "✅ Comment added successfully!");
// //       toast.success(response.data.message || "Comment added successfully!");
// //       setComment("");
// //     } catch (error) {
// //       console.error("Add comment error:", error);
// //       const errorMessage = error.response?.data?.message || "❌ Failed to add comment";
// //       setMessage(errorMessage);
// //       toast.error(errorMessage);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="pt-20 px-4 md:px-8 lg:px-16">
// //       <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
// //         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
// //           Add Comment to Ticket
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {/* Ticket ID */}
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
// //             <input
// //               type="text"
// //               value={ticketID}
// //               onChange={(e) => setTicketID(e.target.value)}
// //               placeholder="Enter Ticket ID"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
// //             />
// //           </div>

// //           {/* Comment */}
// //           <div>
// //             <label className="block text-gray-700 font-medium mb-1">Comment</label>
// //             <textarea
// //               value={comment}
// //               onChange={(e) => setComment(e.target.value)}
// //               placeholder="Enter your comment"
// //               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
// //               rows={4}
// //             />
// //           </div>

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
// //           >
// //             {loading ? "Adding..." : "Add Comment"}
// //           </button>
// //         </form>

// //         {/* Message */}
// //         {message && (
// //           <p
// //             className={`mt-4 text-center font-medium ${
// //               message.includes("✅")
// //                 ? "text-green-600"
// //                 : message.includes("❌")
// //                 ? "text-red-600"
// //                 : "text-yellow-600"
// //             }`}
// //           >
// //             {message}
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddCommentToTicketById;




// import React, { useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../App";
// import { toast } from "react-hot-toast";

// const AddCommentToTicketById = () => {
//   const [ticketID, setTicketID] = useState("");
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const containerStyle = {
//     minHeight: "80vh",        // full viewport height
//     width: "100%",
//     backgroundColor: "#f9fafb", // gray-50
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "1rem",
//     overflow: "hidden",
//     boxSizing: "border-box",
//   };

//   const cardStyle = {
//     width: "100%",
//     maxWidth: "500px",          // centered card width
//     backgroundColor: "#fff",
//     padding: "1.5rem",
//     borderRadius: "1rem",
//     boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
//     boxSizing: "border-box",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!ticketID.trim()) {
//       setMessage("⚠️ Ticket ID is required!");
//       toast.error("Ticket ID is required!");
//       return;
//     }
//     if (!comment.trim()) {
//       setMessage("⚠️ Comment cannot be empty!");
//       toast.error("Comment cannot be empty!");
//       return;
//     }
//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${apiUrl}/employee/addcommetToTicket/${ticketID}`,
//         { comment },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage(response.data.message || "✅ Comment added successfully!");
//       toast.success(response.data.message || "Comment added successfully!");
//       setComment("");
//     } catch (error) {
//       console.error("Add comment error:", error);
//       const errorMessage = error.response?.data?.message || "❌ Failed to add comment";
//       setMessage(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={cardStyle}>
//         <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "#1f2937" }}>
//           Add Comment to Ticket
//         </h2>

//         <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//           {/* Ticket ID */}
//           <div>
//             <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "0.25rem" }}>Ticket ID</label>
//             <input
//               type="text"
//               value={ticketID}
//               onChange={(e) => setTicketID(e.target.value)}
//               placeholder="Enter Ticket ID"
//               style={{
//                 width: "100%",
//                 padding: "0.5rem 1rem",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "0.5rem",
//                 outline: "none",
//               }}
//             />
//           </div>

//           {/* Comment */}
//           <div>
//             <label style={{ display: "block", color: "#374151", fontWeight: "500", marginBottom: "0.25rem" }}>Comment</label>
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Enter your comment"
//               rows={4}
//               style={{
//                 width: "100%",
//                 padding: "0.5rem 1rem",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "0.5rem",
//                 outline: "none",
//                 resize: "vertical",
//               }}
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               backgroundColor: "#3b82f6",
//               color: "#fff",
//               fontWeight: "600",
//               padding: "0.5rem",
//               borderRadius: "0.5rem",
//               cursor: "pointer",
//               border: "none",
//             }}
//           >
//             {loading ? "Adding..." : "Add Comment"}
//           </button>
//         </form>

//         {/* Message */}
//         {message && (
//           <p
//             style={{
//               marginTop: "1rem",
//               textAlign: "center",
//               fontWeight: "500",
//               color: message.includes("✅") ? "#16a34a" : message.includes("❌") ? "#dc2626" : "#f59e0b",
//             }}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddCommentToTicketById;



import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast";

const AddCommentToTicketById = () => {
  const [ticketID, setTicketID] = useState("");
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
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-10"  style={{ minHeight: "80vh" }} >
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Add Comment to Ticket
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Ticket ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Ticket ID</label>
            <input
              type="text"
              value={ticketID}
              onChange={(e) => setTicketID(e.target.value)}
              placeholder="Enter Ticket ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
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
