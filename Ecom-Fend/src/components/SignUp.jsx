import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(u => u.email === formData.email);
    if (exists) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign-up successful! Please sign in.");
    navigate("/signin");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} aria-label="Sign up form">
        <h2>Sign Up</h2>
        <input className="input" type="text" name="username" placeholder="Full name" value={formData.username} onChange={handleChange} required />
        <input className="input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input className="input" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

        <select className="input" name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;