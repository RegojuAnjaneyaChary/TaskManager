import React, { useState } from "react";
import Navbar from "../pages/Navbar"; // import your Navbar
import Sidebar from "../pages/managerApis/Sidebar";
import Mainbar from "../pages/managerApis/Mainbar";

const Managerdashbrdlayout = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
 
  return (
    <div className="min-h-screen">
      {/* Navbar at the top */}
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar + Mainbar */}
      <div className="flex pt-16"> {/* pt-16 = height of Navbar so content is not hidden */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="ml-[20%] w-[80%] p-6">
          <Mainbar activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};

export default Managerdashbrdlayout;
