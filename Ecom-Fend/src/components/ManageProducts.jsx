import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaImage } from "react-icons/fa";

const defaultImage = "https://via.placeholder.com/400x300?text=Product+Image";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({ 
    name: "", 
    price: "", 
    image: "",
    description: "" 
  });
  const [imagePreview, setImagePreview] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    
    // Update image preview when image URL changes
    if (name === 'image') {
      setImagePreview("");
      setImageError(false);
      
      if (value.trim()) {
        setImageLoading(true);
        const isValid = await validateImageUrl(value);
        if (isValid) {
          setImagePreview(value);
          setImageError(false);
        } else {
          setImageError(true);
        }
        setImageLoading(false);
      }
    }
  };

  const validateImageUrl = (url) => {
    if (!url || !url.trim()) return Promise.resolve(false);
    
    // Check if URL is valid
    try {
      new URL(url);
    } catch {
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => {
        img.src = '';
        resolve(false);
      }, 5000); // Timeout after 5 seconds

      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(false);
      };
      img.src = url;
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const imageUrl = productData.image.trim() ? productData.image : defaultImage;
    const isValidImage = await validateImageUrl(imageUrl);
    
    const newProduct = {
      ...productData,
      id: Date.now().toString(), // Add unique ID
      image: isValidImage ? imageUrl : defaultImage,
      price: parseFloat(productData.price) || 0
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setProductData({ name: "", price: "", image: "", description: "" });
    setImagePreview("");
  };

  const handleDeleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-pink-400 p-4 text-white">
        <h1 className="text-xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="hover:underline">Dashboard</button>
          <button onClick={() => navigate("/logout")} className="hover:underline">Logout</button>
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-sm">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Add Product Form */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product name"
                  value={productData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={productData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={productData.image}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Image Preview</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {imageLoading ? (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-2">Loading image...</p>
                  </div>
                ) : imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 object-contain"
                    onError={(e) => {
                      e.target.src = defaultImage;
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <FaImage size={24} />
                    <p className="mt-2">{imageError ? "Invalid image URL" : "Enter image URL above"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Product description..."
              value={productData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold my-6 px-6">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.src = defaultImage;
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <p className="text-gray-600 mb-2">₹{p.price.toFixed(2)}</p>
                {p.description && (
                  <p className="text-sm text-gray-500 mb-4">{p.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;