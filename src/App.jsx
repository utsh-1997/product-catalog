import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = () => {
    fetch('http://localhost/product-api/products.php')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Product Catalog</h1>
      <AddProductForm onProductAdded={fetchProducts} />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          onDelete={fetchProducts}
          onUpdate={fetchProducts}
        />
      ))}
    </div>
  );
}

export default App;