import React from "react";
import Navbar from "../pages/Navbar";
import EmployeeDashboardlayout from "../pages/empdashboardlayout";
 
const EmployeeDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Dashboard Layout */}
      <EmployeeDashboardlayout />
    </div>
  );
};

export default EmployeeDashboard;
