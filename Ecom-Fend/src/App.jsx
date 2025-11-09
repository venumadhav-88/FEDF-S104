import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewAnalytics from "./components/ViewAnalytics";
import UserManagement from "./components/UserManagement";
import ManageProducts from "./components/ManageProducts";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} adminOnly={true} />} />
            <Route path="/analytics" element={<ProtectedRoute element={<ViewAnalytics />} adminOnly={true} />} />
            <Route path="/usermanagement" element={<ProtectedRoute element={<UserManagement />} adminOnly={true} />} />
            <Route path="/manage-products" element={<ProtectedRoute element={<ManageProducts />} adminOnly={true} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} KL - Product Management System · All rights reserved</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;