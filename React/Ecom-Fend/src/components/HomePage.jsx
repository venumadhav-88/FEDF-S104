import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content; header/Nav is handled by global Header component */}
      <div className="p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Product Management System</h2>
        <p className="mb-2 text-gray-700">
          Manage products, users, and inventory easily.
        </p>
        <p className="text-gray-600">
          Sign up as an Admin or User to get started .
        </p>
      </div>
    </div>
  );
};

export default HomePage;