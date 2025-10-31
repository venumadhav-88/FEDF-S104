import { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price) || 0,
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 app-section">
      <div className="app-container">
        <h2 className="section-title">Manage Products</h2>

        <form onSubmit={handleAdd} className="mb-6 flex gap-2 flex-wrap">
          <input className="border p-2 rounded w-full md:w-1/2" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="border p-2 rounded w-full md:w-1/4" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>

        <div className="app-grid cols-3">
          {products.length === 0 && <p className="muted">No products yet.</p>}
          {products.map((p) => (
            <div key={p.id} className="app-card fade-in">
              <h3 className="card-title">{p.name}</h3>
              <p className="muted">Price: ${p.price}</p>
              <div className="mt-3">
                <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
