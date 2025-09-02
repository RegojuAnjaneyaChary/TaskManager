import React from "react";

function Sidebar({ activeSection, onSectionChange }) {
  console.log(activeSection, onSectionChange)
  const sections = [
    "Dashboard",
    "Manager Profile",
    "Create Ticket",
    "All Tickets",
    "Employee Directory",
    // "Ticket Details"   // ✅ added
  ];
  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-800 text-white p-6 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Manager Dashboard</h2>
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            className={`p-3 cursor-pointer rounded-lg mb-2 transition-all duration-200 ${activeSection === section ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
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
