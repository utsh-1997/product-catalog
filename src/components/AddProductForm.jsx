import { useState } from 'react';

function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    fetch('https://api4magic.lovestoblog.com/api/products.php', {
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
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="add-form">
      <h2>Add New Product</h2>
      {error && <p className="error">{error}</p>}
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
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </div>
  );
}

export default AddProductForm;