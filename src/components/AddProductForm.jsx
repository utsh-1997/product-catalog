import { useState } from 'react';

function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost/product-api/products.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, category })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onProductAdded();
          setName('');
          setPrice('');
          setCategory('');
        }
      });
  };

  return (
    <div className="add-form">
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default AddProductForm;