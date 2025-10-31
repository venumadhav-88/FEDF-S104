import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
  { id: 1, title: "Classic Leather Bag", price: 79.0, category: "Accessories", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=60", desc: "Hand-crafted leather bag — sleek, durable and timeless." },
  { id: 2, title: "Minimal Desk Lamp", price: 49.5, category: "Home", img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=60", desc: "Warm LED lamp with adjustable arm and dimmer." },
  { id: 3, title: "Sport Running Shoes", price: 99.99, category: "Footwear", img: "https://images.unsplash.com/photo-1528701800489-4766c4356a3b?w=800&q=60", desc: "Lightweight running shoes with breathable mesh." },
  { id: 4, title: "Ceramic Coffee Mug", price: 12.0, category: "Home", img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=60", desc: "350ml mug with ergonomic handle and matte finish." },
  { id: 5, title: "Wireless Headphones", price: 129.0, category: "Electronics", img: "https://images.unsplash.com/photo-1518444024633-9e2f1b3f7b8d?w=800&q=60", desc: "Noise-cancelling bluetooth headphones with 24h battery." }
];

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const set = new Set(sampleProducts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = sampleProducts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase())
    );
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (sort === "price-asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = list.slice().sort((a, b) => b.price - a.price);
    return list;
  }, [query, category, sort]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((it) => it.id === p.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ id: p.id, name: p.title, price: p.price, quantity: 1, img: p.img });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${p.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">Browse and manage products</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Only Log Out button (no Home / Sign In / Sign Up) */}
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="search"
            placeholder="Search products, description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-100">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
                  <span className="text-sm text-gray-500">{p.category}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-900">₹{p.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 ml-2">incl. taxes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelected(p)}
                      className="px-3 py-1 bg-gray-100 border rounded-md text-sm hover:bg-gray-200"
                    >
                      View
                    </button>
                    <button onClick={() => addToCart(p)} className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products match your search.</p>
        )}
      </main>

      {selected && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-2">
              <div className="h-72 md:h-auto">
                <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{selected.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{selected.category}</p>
                <p className="text-gray-700 mb-4">{selected.desc}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">₹{selected.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md">Add to cart</button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded-md">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}