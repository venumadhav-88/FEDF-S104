import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <header className="site-header">
      <div className="app-container inner">
        <div className="site-logo">KL Shop</div>

        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/aboutus">About</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          {user ? (
            <>
              <span className="muted" style={{fontSize: '0.95rem'}}>{user.username}</span>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
