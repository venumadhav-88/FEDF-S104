const AboutUs = () => {
  return (
    <section className="hero about-content">
      <h1>About Us</h1>
      <p className="lead">Welcome to the <strong>Product Management System</strong>. We provide tools to manage products, users and analytics in a simple interface.</p>

      <div className="grid cols-2" style={{ marginTop: 20 }}>
        <div className="card">
          <h3>Our Mission</h3>
          <p className="muted">Simplify product management with role-based access and inventory tracking.</p>
        </div>
        <div className="card">
          <h3>Features</h3>
          <ul>
            <li>Role-based access (Admin/User)</li>
            <li>Secure authentication</li>
            <li>Product & inventory tracking</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;