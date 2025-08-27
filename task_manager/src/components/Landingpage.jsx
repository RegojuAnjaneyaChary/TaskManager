import React from "react";
import { Link } from "react-router-dom";
import "./Landingpage.css"; // Import CSS file


const Home = () => {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <h1 className="logo">TaskManager</h1>
        <nav>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>Organize Your Tasks, <br /> Boost Your Productivity</h2>
        <p>
          TaskManager helps you manage your daily tasks effortlessly. Stay
          organized, track your progress, and meet your goals on time.
        </p>
        <Link to="/signup" className="btn-primary">Get Started</Link>
      </main>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Task Organization</h3>
          <p>Create, edit, and manage tasks easily with intuitive tools.</p>
        </div>
        <div className="feature-card">
          <h3>Real-time Tracking</h3>
          <p>Monitor your task progress in real-time across devices.</p>
        </div>
        <div className="feature-card">
          <h3>Team Collaboration</h3>
          <p>Assign tasks, set priorities, and collaborate seamlessly.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} TaskManager. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
