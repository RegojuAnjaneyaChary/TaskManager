import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../App"; // Your backend base URL
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
      if (!token) {
        throw new Error("No token found. Please login again.");
      }

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
    <div style={{ padding: "20px" }}>
      <h2>Your Assigned Tickets</h2>

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {tickets.length > 0 ? (
        <div>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                margin: "10px 0",
                borderRadius: "5px",
              }}
            >
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <p>Status: {ticket.status}</p>
              <p>Created At: {new Date(ticket.createdAt).toLocaleString()}</p>

              {/* View More button */}
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  background: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/ticket/${ticket._id}`)}
              >
                View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No tickets found.</p>
      )}
    </div>
  );
};

export default AllTickets;
