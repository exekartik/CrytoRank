import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to Crypto Dashboard</h1>
        <p>Explore the world of cryptocurrencies with real-time data and analytics</p>
        <button className="start-button" onClick={handleStart}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
