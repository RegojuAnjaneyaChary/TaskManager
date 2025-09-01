// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { apiUrl } from "../../App";

// const TicketbyId = () => {
//   const { ticketID } = useParams();
//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTicket = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${apiUrl}/ticket/ticketByID/${ticketID}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTicket(res.data.task);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicket();
//   }, [ticketID]);

//   if (loading) return <p className="text-gray-500">Loading ticket details...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>

//       {ticket ? (
//         <div className="border rounded-lg p-6 shadow-sm bg-white space-y-2">
//           <h3 className="text-xl font-bold">{ticket.title}</h3>
//           <p>
//             <span className="font-medium">Description:</span> {ticket.description}
//           </p>
//           <p>
//             <span className="font-medium">Status:</span> {ticket.status}
//           </p>
//           <p className="text-sm text-gray-600">
//             <span className="font-medium">Created At:</span>{" "}
//             {new Date(ticket.createdAt).toLocaleString()}
//           </p>
//           <p>
//             <span className="font-medium">Created By:</span>{" "}
//             {ticket.createdBy?.name || "N/A"}
//           </p>
//           <p>
//             <span className="font-medium">Assigned To:</span>{" "}
//             {ticket.assignTo?.name || "N/A"}
//           </p>
//         </div>
//       ) : (
//         <p className="text-gray-600">No ticket found.</p>
//       )}
//     </div>
//   );
// };

// export default TicketbyId;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../App";
import { toast } from "react-hot-toast"; // ✅ import toast

const TicketbyId = () => {
  const { ticketID } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${apiUrl}/ticket/ticketByID/${ticketID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data?.task) {
          setTicket(res.data.task);
          toast.success("Ticket details loaded successfully ✅");
        } else {
          setTicket(null);
          toast("No ticket found ⚠️");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        toast.error(errorMessage); // ✅ Show toast on error
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketID]);

  if (loading) return <p className="text-gray-500">Loading ticket details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>

      {ticket ? (
        <div className="border rounded-lg p-6 shadow-sm bg-white space-y-2">
          <h3 className="text-xl font-bold">{ticket.title}</h3>
          <p>
            <span className="font-medium">Description:</span> {ticket.description}
          </p>
          <p>
            <span className="font-medium">Status:</span> {ticket.status}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Created By:</span>{" "}
            {ticket.createdBy?.name || "N/A"}
          </p>
          <p>
            <span className="font-medium">Assigned To:</span>{" "}
            {ticket.assignTo?.name || "N/A"}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No ticket found.</p>
      )}
    </div>
  );
};

export default TicketbyId;
