import { useState } from 'react';
import { supabase } from '../supabase';

function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');

    const { error } = await supabase
      .from('products')
      .insert([{ name, price: parseFloat(price), category }]);

    if (error) {
      setError('Failed to add product');
    } else {
      onProductAdded();
      setName('');
      setPrice('');
      setCategory('');
    }
    setLoading(false);
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
      <button className="add-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </div>
  );
}

export default AddProductForm;