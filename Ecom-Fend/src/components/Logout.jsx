import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Only clear the authenticated user session (don't remove registered users list)
    sessionStorage.removeItem("user");
    // Optionally clear cart on logout if you prefer:
    // localStorage.removeItem("cart");
    // Redirect to sign-in so users can log back in
    navigate("/signin");
  }, [navigate]);

  return null;
};

export default Logout;