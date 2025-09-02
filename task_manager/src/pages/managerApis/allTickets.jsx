// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../App";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast"; // ✅ Import toast

// const AllTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fetchAllTickets = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found. Please login again.");

//       const response = await axios.get(`${apiUrl}/ticket/allTickets`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       if (response.data?.data) {
//         setTickets(response.data.data);

//         if (response.data.data.length === 0) {
//           toast("No tickets found ⚠️");
//         } else {
//           toast.success("Tickets loaded successfully ✅");
//         }
//       } else {
//         throw new Error(response.data.message || "Failed to fetch tickets");
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || err.message;
//       setError(errorMessage);
//       toast.error(errorMessage); // ✅ Show toast on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllTickets();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         🎫 Your Assigned Tickets
//       </h2>

//       {loading && (
//         <p className="text-gray-500 text-center animate-pulse">
//           Loading tickets...
//         </p>
//       )}
//       {error && <p className="text-red-600 text-center">{error}</p>}

//       {tickets.length > 0 ? (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {tickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               className="border rounded-2xl p-5 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-100 hover:shadow-2xl transition duration-300"
//             >
//               <h3 className="text-xl font-semibold text-indigo-800 mb-2">
//                 {ticket.title}
//               </h3>
//               <p className="text-gray-700 mb-3">{ticket.description}</p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-semibold text-indigo-700">Status:</span>{" "}
//                 {ticket.status}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-semibold text-indigo-700">
//                   Created At:
//                 </span>{" "}
//                 {new Date(ticket.createdAt).toLocaleString()}
//               </p>

//               <button
//                 className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition"
//                 onClick={() => navigate(`/ticket/${ticket._id}`)}
//               >
//                 View More →
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && (
//           <p className="text-gray-600 text-center">No tickets found.</p>
//         )
//       )}
//     </div>
//   );
// };

// export default AllTickets;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAllTickets = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const response = await axios.get(`${apiUrl}/ticket/allTickets`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data?.data) {
        setTickets(response.data.data);

        if (response.data.data.length === 0) {
          toast("No tickets found ⚠️");
        } else {
          toast.success("Tickets loaded successfully ✅");
        }
      } else {
        throw new Error(response.data.message || "Failed to fetch tickets");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  return (
    <div style={{ minHeight: "80vh" }}>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🎫 Your Assigned Tickets
      </h2>

      {loading && (
        <p className="text-gray-500 text-center animate-pulse">
          Loading tickets...
        </p>
      )}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {tickets.length > 0 ? (
        <div className="max-h-[75vh] overflow-y-auto pr-2">
          {/* Grid with spacing */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border rounded-2xl p-5 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-100 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  {ticket.title}
                </h3>
                <p className="text-gray-700 mb-3">{ticket.description}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-indigo-700">Status:</span>{" "}
                  {ticket.status}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-indigo-700">Created At:</span>{" "}
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>

                <button
                  className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition"
                  onClick={() => navigate(`/ticket/${ticket._id}`)}
                >
                  View More →
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-gray-600 text-center">No tickets found.</p>
        )
      )}
    </div>
  );
};

export default AllTickets;
