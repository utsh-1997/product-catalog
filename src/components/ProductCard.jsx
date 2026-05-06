import { useState } from 'react';

function ProductCard({ id, name, price, category, onDelete, onUpdate, apiUrl }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editCategory, setEditCategory] = useState(category);

  const handleDelete = () => {
    fetch(apiUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => { if (data.success) onDelete(); });
  };

  const handleUpdate = () => {
    fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: editName, price: editPrice, category: editCategory })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsEditing(false);
          onUpdate();
        }
      });
  };

  if (isEditing) {
    return (
      <div className="product-card">
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
        <input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
        <div className="card-actions">
          <button className="save-btn" onClick={handleUpdate}>Save</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p className="category">{category}</p>
      <p className="price">₹{price}</p>
      <div className="card-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ProductCard;