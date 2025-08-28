import React from "react";
import Profile from "../Profile";
import ViewAssignedTickets from "./viewAssignedTickets";
import ViewCommentsTicketById from "./viewCommentsTicketById";
import UpdateTicketStatusById from "./updateTicketStatusById";
import AddCommentToTicketById from "./addCommentToTicketById";

function Employeemainbar({ activeSection }) {
  return (
    <div>
      <h1>{activeSection}</h1>

      <div>
        {activeSection === "My Profile" && <Profile />}

        {activeSection === "My Assigned Tickets" && <ViewAssignedTickets />}

        {activeSection === "Update Ticket Status" && <UpdateTicketStatusById />}

        {activeSection === "View Ticket Comments" && <ViewCommentsTicketById />}

        {activeSection === "Add Comment to Ticket" && (
          <AddCommentToTicketById />
        )}
      </div>
    </div>
  );
}

export default Employeemainbar;
