import React, { useState } from "react";
import Sidebar from "../pages/managerApis/Sidebar";
import MainBar from "../pages/managerApis/Mainbar";
import Navbar from "../pages/Navbar";
import DashboardLayout from "../pages/DashboardLayout";

function ManagerDashboard() {
  // Uplifted state: determines which section is active
  const [activeSection, setActiveSection] = useState("Overview");

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="w-full">
        <Navbar />
      </div>
      <DashboardLayout />

    </div>
  );
}

export default ManagerDashboard;
