import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import Dashboard from "./components/Dashboard";
import ManageProducts from "./components/ManageProducts";
import UserManagement from "./components/UserManagement";
import Analytics from "./components/Analytics";
import Prodect from "./components/Prodect";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/products" element={<Prodect />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/Prodect" element={<Prodect />} />
      </Routes>
    </Router>
  );
}

export default App;