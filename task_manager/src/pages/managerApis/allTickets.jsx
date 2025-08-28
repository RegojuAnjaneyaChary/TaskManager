import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App";
import { useNavigate } from "react-router-dom";

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
      } else {
        throw new Error(response.data.message || "Failed to fetch tickets");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Assigned Tickets</h2>

      {loading && <p className="text-gray-500">Loading tickets...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {tickets.length > 0 ? (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h3 className="text-lg font-bold">{ticket.title}</h3>
              <p className="text-gray-700">{ticket.description}</p>
              <p className="text-sm text-gray-500">
                Status: <span className="font-medium">{ticket.status}</span>
              </p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(ticket.createdAt).toLocaleString()}
              </p>

              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => navigate(`/ticket/${ticket._id}`)}
              >
                View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-600">No tickets found.</p>
      )}
    </div>
  );
};

export default AllTickets;
