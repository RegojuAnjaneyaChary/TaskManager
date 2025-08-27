import React from "react";

function Sidebar({ activeSection, onSectionChange }) {
 
const sections = [
  "My Profile",
  "My Assigned Tickets",
  "Update Ticket Status",
  "View Ticket Comments",
  "Add Comment to Ticket"
];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Employee Dashboard</h2>
      <ul>
        {sections.map(section => (
          <li
            key={section}
            className={`p-3 cursor-pointer rounded-lg mb-2 transition-all duration-200
              ${activeSection === section ? "bg-gray-600" : "hover:bg-gray-700"}`}
            onClick={() => onSectionChange(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
