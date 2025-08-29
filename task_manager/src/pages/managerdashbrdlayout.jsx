import React, { useState } from "react";
import Sidebar from "../pages/managerApis/Sidebar";
import Mainbar from "../pages/managerApis/Mainbar";

const Managerdashbrdlayout = () => {
  const [activeSection, setActiveSection] = useState("Manager Profile");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Mainbar */}
      <div className="ml-[20%] w-[80%] p-6">
        <Mainbar activeSection={activeSection} />
      </div>
    </div>
  );
};

export default Managerdashbrdlayout;
