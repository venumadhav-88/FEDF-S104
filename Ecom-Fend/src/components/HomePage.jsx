import { Link } from "react-router-dom";
import React from 'react';

const HomePage = () => {
  return (
    <main className="hero" role="main" aria-labelledby="home-title">
      <h1 id="home-title">Welcome to the Product Management System</h1>
      <p className="lead">
        Manage products, users, and inventory easily. Sign up as an Admin or User to get started.
      </p>

      <div className="grid cols-3" style={{ marginTop: 22 }}>
        <div className="card">
          <h3>Products</h3>
          <p className="muted">Add, edit and categorize your products.</p>
        </div>
        <div className="card">
          <h3>Users</h3>
          <p className="muted">Manage user access and roles.</p>
        </div>
        <div className="card">
          <h3>Analytics</h3>
          <p className="muted">View sales and usage insights.</p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;