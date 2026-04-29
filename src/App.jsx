import { useState } from 'react';
import ProductCard from './components/ProductCard';

const products = [
  { id: 1, name: "Wireless Earbuds", price: "7000", category: "Electronics" },
  { id: 2, name: "Running Shoes", price: "3500", category: "Footwear" },
  { id: 3, name: "Water Bottle", price: "499", category: "Sports" },
  { id: 4, name: "Laptop Stand", price: "1299", category: "Accessories" },
  { id: 5, name: "Sunglasses", price: "2199", category: "Fashion" },
  { id: 6, name: "Yoga Mat", price: "899", category: "Fitness" },
  { id: 7, name: "Bracelet", price: "107000", category: "Jwellery" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Product Catalog</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
        />
      ))}
    </div>
  );
}

export default App;