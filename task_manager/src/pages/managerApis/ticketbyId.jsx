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
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketID]);

  if (loading)
    return (
      <p className="text-gray-500 text-center animate-pulse mt-10">
        Loading ticket details...
      </p>
    );
  if (error)
    return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🎫 Ticket Details
      </h2>

      {ticket ? (
        <div className="border rounded-2xl p-6 shadow-lg bg-gradient-to-r from-indigo-50 to-blue-100 space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-800">
            {ticket.title}
          </h3>

          <p className="text-gray-700">
            <span className="font-semibold text-indigo-700">Description:</span>{" "}
            {ticket.description}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold text-indigo-700">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                ticket.status === "Open"
                  ? "bg-green-500"
                  : ticket.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {ticket.status}
            </span>
          </p>

          <p className="text-gray-600">
            <span className="font-semibold text-indigo-700">Created At:</span>{" "}
            {new Date(ticket.createdAt).toLocaleString()}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold text-indigo-700">Created By:</span>{" "}
            {ticket.createdBy?.name || "N/A"}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold text-indigo-700">Assigned To:</span>{" "}
            {ticket.assignTo?.name || "N/A"}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No ticket found.</p>
      )}
    </div>
  );
};

export default TicketbyId;
