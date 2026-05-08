import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://product-api-0t84.onrender.com/products.php';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProduct(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!product) return <div className="container"><p>Product not found.</p></div>;

  return (
    <div className="container">
      <button
        className="back-btn"
        onClick={() => navigate('/')}
      >
        ← Back to Catalog
      </button>

      <div className="detail-card">
        <p className="category">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price">₹{product.price}</p>
        <div className="detail-info">
          <div className="detail-row">
            <span>Product ID</span>
            <span>#{product.id}</span>
          </div>
          <div className="detail-row">
            <span>Category</span>
            <span>{product.category}</span>
          </div>
          <div className="detail-row">
            <span>Price</span>
            <span>₹{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;