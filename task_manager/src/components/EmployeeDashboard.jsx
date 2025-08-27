import React, { useState } from "react";
import Sidebar from "../pages/employee apis/Sidebar";
import MainBar from "../pages/employee apis/Mainbar";
import Navbar from "../pages/Navbar";

function ManagerDashboard() {
  // Uplifted state: determines which section is active
  const [activeSection, setActiveSection] = useState("My Profile");


  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Sidebar + MainBar layout */}
      <div className="flex flex-1">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <MainBar activeSection={activeSection} />
      </div>
    </div>
  );
}

export default ManagerDashboard;
