import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-black-600">TaskTrack</h1>
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
      <main className="flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-r from-blue-100 to-blue-200">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
          Organize. Track. Achieve.
        </h2>
        <p className="text-gray-700 max-w-2xl mb-8 text-lg md:text-xl">
          TaskTrack helps you manage your daily tasks efficiently, collaborate with your team, 
          and achieve goals faster. Stay organized and boost productivity effortlessly.
        </p>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Get Started
        </Link>
      </main>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h3 className="text-4xl font-bold text-center mb-16 text-gray-800">Features</h3>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
            <h4 className="text-2xl font-semibold mb-4 text-blue-600">Task Management</h4>
            <p>Create, assign, and track tasks easily for yourself and your team.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
            <h4 className="text-2xl font-semibold mb-4 text-blue-600">Real-Time Tracking</h4>
            <p>Monitor task progress and team productivity in real-time across devices.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
            <h4 className="text-2xl font-semibold mb-4 text-blue-600">Team Collaboration</h4>
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
