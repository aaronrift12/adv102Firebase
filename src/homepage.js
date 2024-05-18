import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <header className="main-header">
        <h1>Elevate</h1>
        <nav className="mini-navbar">
          <ul>
            <li><Link to="/homepage">Home</Link></li> 
            <li><Link to="/bmi">BMI Calculator</Link></li>
            <li><Link to="/exercise">Exercises</Link></li> 
            <li><Link to="/list">List</Link></li> 
            <li><Link to="/login">Logout</Link></li>
         
          </ul>
        </nav>
      </header>
      <div className="highlighted-text">Welcome to Elevate Fitness, where we elevate your health and well-being to new heights!</div>
      <Link to="/exercise" className="get-started-button">Get Started</Link>
    </div>
  );
}

export default Homepage;
