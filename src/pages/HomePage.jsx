import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import SkeletonCard from '../components/SkeletonCard';
import Toast from '../components/Toast';

const API_URL = 'https://product-api-0t84.onrender.com/products.php';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchProducts = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        showToast('Failed to load products', 'error');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AddProductForm
        onProductAdded={() => {
          fetchProducts();
          showToast('Product added successfully!');
        }}
        apiUrl={API_URL}
      />

      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="product-grid">
          {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">No products found.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              onDelete={() => {
                fetchProducts();
                showToast('Product deleted.', 'info');
              }}
              onUpdate={() => {
                fetchProducts();
                showToast('Product updated!');
              }}
              apiUrl={API_URL}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;