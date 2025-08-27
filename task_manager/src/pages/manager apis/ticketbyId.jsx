import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../App";

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
        setTicket(res.data.task);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketID]);

  if (loading) return <p>Loading ticket details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ticket Details</h2>
      {ticket ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "5px",
            marginTop: "15px",
          }}
        >
          <h3>{ticket.title}</h3>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
          <p><strong>Created By:</strong> {ticket.createdBy?.name || "N/A"}</p>
          <p><strong>Assigned To:</strong> {ticket.assignTo?.name || "N/A"}</p>
        </div>
      ) : (
        <p>No ticket found.</p>
      )}
    </div>
  );
};

export default TicketbyId;
