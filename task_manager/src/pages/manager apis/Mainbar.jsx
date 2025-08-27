import React from "react";
import Allemployeelist from "./allemployeelist";
import Profile from "../Profile";
import AllTickets from "./allTickets";
import CreateTicket from "./createTicket";
import TicketbyId from "./ticketbyId";

function MainBar({ activeSection }) {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{activeSection}</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {activeSection === "Manager Profile" && <Profile />}
        {activeSection === "Create Ticket" && <CreateTicket />}
        {activeSection === "Ticket Details" && <TicketbyId />}
        {activeSection === "All Tickets" && <AllTickets />}
        {activeSection === "Employee Directory" && <Allemployeelist />}
      </div>
    </div>
  );
}

export default MainBar;
