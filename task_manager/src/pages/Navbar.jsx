import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../App";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${apiUrl}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data); // Set user info
        localStorage.setItem("userData", JSON.stringify(response.data)); // Optional
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 px-4 md:px-6 py-3 bg-white shadow-lg">
      {/* Left Section: Logo + App Name */}
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start mb-3 md:mb-0">
        <div className="flex items-center">
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain rounded-md"
          />
          <span className="text-xl font-semibold text-black tracking-wide ml-2">
            TaskTrack
          </span>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                Welcome, {user?.name || "Guest"}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop User Info Section */}
      <div className="hidden md:flex items-center justify-center md:w-auto md:ml-auto gap-4">
        <span className="text-[0.95rem] text-gray-600">
          Welcome, {user?.name || "Guest"}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
