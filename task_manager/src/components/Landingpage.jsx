// import React from "react";
// import { Link } from "react-router-dom";
// import "./Landingpage.css"; // Import CSS file


// const Home = () => {
//   return (
//     <div className="landing-container">
//       {/* Header */}
//       <header className="landing-header">
//         <h1 className="logo">TaskManager</h1>
//         <nav>
//           <Link to="/login" className="nav-link">Login</Link>
//           <Link to="/signup" className="btn-primary">Sign Up</Link>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="hero">
//         <h2>Organize Your Tasks, <br /> Boost Your Productivity</h2>
//         <p>
//           TaskManager helps you manage your daily tasks effortlessly. Stay
//           organized, track your progress, and meet your goals on time.
//         </p>
//         <Link to="/signup" className="btn-primary">Get Started</Link>
//       </main>

//       {/* Features Section */}
//       <section className="features">
//         <div className="feature-card">
//           <h3>Task Organization</h3>
//           <p>Create, edit, and manage tasks easily with intuitive tools.</p>
//         </div>
//         <div className="feature-card">
//           <h3>Real-time Tracking</h3>
//           <p>Monitor your task progress in real-time across devices.</p>
//         </div>
//         <div className="feature-card">
//           <h3>Team Collaboration</h3>
//           <p>Assign tasks, set priorities, and collaborate seamlessly.</p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="landing-footer">
//         © {new Date().getFullYear()} TaskManager. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../App";
import { toast } from "react-hot-toast";

const Home = () => {
  const [stats, setStats] = useState({ employees: 0, tasks: 0 });
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch stats from backend APIs
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Example: get total employees
        const employeeRes = await axios.get(`${apiUrl}/ticket/getAllemployeeList`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const tasksRes = await axios.get(`${apiUrl}/ticket/getAllTickets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setStats({
          employees: employeeRes.data.data.length,
          tasks: tasksRes.data.data.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        toast.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">TaskTrack</h1>
        <nav className="space-x-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-blue-100 to-blue-200">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Manage Your Tasks, <br /> Track Progress, Achieve Goals
        </h2>
        <p className="text-gray-700 max-w-xl mb-8">
          TaskTrack helps you organize your daily tasks, collaborate with your team, and monitor progress
          in real-time. Stay productive and meet deadlines effortlessly.
        </p>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Get Started
        </Link>
      </main>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Your Team Stats</h3>
        {loading ? (
          <p className="text-center">Loading stats...</p>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md w-48">
              <h4 className="text-2xl font-bold text-blue-600">{stats.employees}</h4>
              <p>Total Employees</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md w-48">
              <h4 className="text-2xl font-bold text-green-600">{stats.tasks}</h4>
              <p>Total Tasks</p>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-200">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Task Management</h4>
            <p>Create, assign, and track tasks easily for yourself and your team.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-200">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Real-Time Tracking</h4>
            <p>Monitor task progress and team productivity in real-time across devices.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-200">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Team Collaboration</h4>
            <p>Assign tasks, set priorities, and collaborate seamlessly with your team.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto py-6 text-center text-gray-600">
        © {new Date().getFullYear()} TaskTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
