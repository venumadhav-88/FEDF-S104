import { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(saved);
  }, []);

  const save = (updated) => {
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const handleDelete = (email) => {
    const updated = users.filter((u) => u.email !== email);
    save(updated);
  };

  const toggleAdmin = (email) => {
    const updated = users.map((u) => u.email === email ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u);
    save(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 app-section">
      <div className="app-container">
        <h2 className="section-title">User Management</h2>

        {users.length === 0 ? (
          <p className="muted">No users found.</p>
        ) : (
          <div className="responsive-table app-card">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-t">
                    <td className="p-3">{u.username || '-'}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role || 'user'}</td>
                    <td className="p-3">
                      <button onClick={() => toggleAdmin(u.email)} className="btn btn-ghost mr-3">Toggle Role</button>
                      <button onClick={() => handleDelete(u.email)} className="btn" style={{color: '#ef4444'}}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
