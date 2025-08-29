import React from "react";
import Allemployeelist from "./allemployeelist";
import Profile from "../Profile";
import AllTickets from "./allTickets";
import CreateTicket from "./createTicket";
import TicketbyId from "./ticketbyId";

function Mainbar({ activeSection }) {
  return (
    <div>
      {/* Page Header */}
      {/* <div>
        <h1>{activeSection}</h1>
        <p>
          {activeSection === "Manager Profile" && "Manage your profile and settings"}
          {activeSection === "Create Ticket" && "Create new tasks for employees"}
          {activeSection === "All Tickets" && "View all tasks you have created"}
          {activeSection === "Ticket Details" && "Detailed view of the selected ticket"}
          {activeSection === "Employee Directory" && "Manage all employees"}
        </p>
      </div> */}

      {/* Main Content */}
      <div>
        {activeSection === "Manager Profile" && <Profile />}
        {activeSection === "Create Ticket" && <CreateTicket />}
        {activeSection === "Ticket Details" && <TicketbyId />}
        {activeSection === "All Tickets" && <AllTickets />}
        {activeSection === "Employee Directory" && <Allemployeelist />}
      </div>
    </div>
  );
}

export default Mainbar;