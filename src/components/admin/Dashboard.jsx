import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Welcome to your Dashboard</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
    </div>
  );
};

export default Dashboard;
