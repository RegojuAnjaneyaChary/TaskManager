import React from "react";
import Allemployeelist from "./allemployeelist";
import Profile from "../Profile";
import AllTickets from "./allTickets";
import CreateTicket from "./createTicket";
import TicketbyId from "./ticketbyId";
import Managerhome from "./managerhome";

function Mainbar({ activeSection }) {
  return (
    <div>
     
      <div>
        {activeSection === "Dashboard" && <Managerhome />}
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