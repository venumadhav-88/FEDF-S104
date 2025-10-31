import { useEffect, useState } from "react";

const Analytics = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setProductCount(products.length);
    setUserCount(users.length);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 app-section">
      <div className="app-container">
        <h2 className="section-title">Analytics</h2>

        <div className="app-grid cols-3">
          <div className="app-card center">
            <h3 className="text-3xl font-bold" style={{color:'#2563eb'}}>{productCount}</h3>
            <p className="muted">Products</p>
          </div>

          <div className="app-card center">
            <h3 className="text-3xl font-bold" style={{color:'#16a34a'}}>{userCount}</h3>
            <p className="muted">Users</p>
          </div>

          <div className="app-card center">
            <h3 className="text-3xl font-bold" style={{color:'#7c3aed'}}>{productCount + userCount}</h3>
            <p className="muted">Total Items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
