import React, { useState } from "react";
import Employeemainbar from "./employeeApis/Mainbar";
import Employeesidebar from "./employeeApis/Sidebar";

const EmployeeDashboardlayout = () => {
  const [activeSection, setActiveSection] = useState("My Profile");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar (20%) */}
      <div style={{ flex: "0 0 20%" }}>
        <Employeesidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Mainbar (80%) */}
      <div style={{ flex: "1" }}>
        <Employeemainbar activeSection={activeSection} />
      </div>
    </div>
  );
};

export default EmployeeDashboardlayout;
