import React, { useState } from "react";
import "../../../src/global.css"; // make sure you created this file with the CSS I gave you

const Homebar = ({ onSectionChange }) => {
  const [active, setActive] = useState("Home");

  const sections = [
    "Dashboard",
    "Profile",
    "Create Ticket",
    "All Tickets",
    "Employee Directory",
  ];

  const handleClick = (section) => {
    setActive(section);
    onSectionChange(section);
  };

  return (
    <div className="mobile-menu">
      {/* Home button */}
      <button
        className={`home-btn ${active === "Home" ? "active" : ""}`}
        onClick={() => handleClick("Home")}
      >
        Home
      </button>

      {/* Section buttons */}
      {sections.map((section) => (
        <button
          key={section}
          className={`section-btn ${active === section ? "active" : ""}`}
          onClick={() => handleClick(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default Homebar;
