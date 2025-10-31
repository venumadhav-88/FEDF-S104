import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    // clear session and send user to home, replacing history so back doesn't return to dashboard
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page content; header is provided by global Header component */}
      <div className="app-section">
        <div className="app-container text-center">
          <h2 className="section-title">Welcome {user?.username || "User"}!</h2>
          <p className="muted spaced">Manage products, users, and view analytics.</p>

          <div className="app-grid cols-3 spaced">
            <div className="app-card cursor-pointer" onClick={() => navigate("/manage-products")}>
              <h3 className="card-title">Manage Products</h3>
              <p className="muted">Add, edit, and delete products.</p>
            </div>

            <div className="app-card cursor-pointer" onClick={() => navigate("/usermanagement")}>
              <h3 className="card-title" style={{color:'#10b981'}}>User Management</h3>
              <p className="muted">Manage user roles and accounts.</p>
            </div>

            <div className="app-card cursor-pointer" onClick={() => navigate("/analytics")}>
              <h3 className="card-title" style={{color:'#7c3aed'}}>Analytics</h3>
              <p className="muted">View reports and insights.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;