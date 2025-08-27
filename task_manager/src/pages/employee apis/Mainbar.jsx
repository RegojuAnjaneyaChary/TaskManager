import React from "react";
import Profile from "../Profile";
import ViewAssignedTickets from "./viewAssignedTickets";
import ViewCommentsTicketById from "./viewCommentsTicketById";
import UpdateTicketStatusById from "./updateTicketStatusById";
import AddCommentToTicketById from "./addCommentToTicketById";

function MainBar({ activeSection }) {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{activeSection}</h1>

      <div className="bg-white p-4 rounded-lg shadow">
              {activeSection === "My Profile" && (
                  <Profile/>
        
        )}

        {activeSection === "My Assigned Tickets" && (
           <ViewAssignedTickets/>
        )}

        {activeSection === "Update Ticket Status" && (
             <UpdateTicketStatusById/>
        )}

        {activeSection === "View Ticket Comments" && (
           <ViewCommentsTicketById/>
        )}

        {activeSection === "Add Comment to Ticket" && (
             <AddCommentToTicketById/>
        )}
      </div>
    </div>
  );
}

export default MainBar;
