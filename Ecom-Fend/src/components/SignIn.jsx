import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      if (user.role && user.role.toLowerCase() === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/products");
      }
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} aria-label="Sign in form">
        <h2>Sign In</h2>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;