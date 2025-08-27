import React from "react";

function Sidebar({ activeSection, onSectionChange }) {
 
  const sections = [
  "Manager Profile",
  "Create Ticket",
  
  "All Tickets",
  "Employee Directory"
];

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Manager Dashboard</h2>
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
