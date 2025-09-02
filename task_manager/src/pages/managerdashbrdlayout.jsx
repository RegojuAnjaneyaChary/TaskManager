
import React, { useState } from "react";
import Navbar from "./Navbar"; // Include manager navbar
import Sidebar from "../pages/managerApis/Sidebar";
import Mainbar from "../pages/managerApis/Mainbar";

export default function ManagerDashboardLayout() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-800 text-white p-4 overflow-y-auto transition-transform duration-300 z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64`}
        >
          <Sidebar
            activeSection={activeSection}
            onSectionChange={(section) => {
              setActiveSection(section);
              setIsSidebarOpen(false); // Close sidebar on mobile after click
            }}
          />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-start bg-gray-100 p-4 md:ml-64 overflow-y-auto" style={{ marginLeft: 0 }}>
          {/* Mobile Hamburger Button */}
          <div className="w-full md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-gray-800 text-white rounded-md"
            >
              {isSidebarOpen ? "✖" : "☰"}
            </button>
            <h1 className="text-lg font-bold text-center flex-1">{activeSection}</h1>
          </div>

          {/* Main content centered */}
          <div className="w-full max-w-5xl">
            <Mainbar activeSection={activeSection} />
          </div>
        </div>
      </div>
    </div>
  );
}

