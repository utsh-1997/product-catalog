import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function ProductCard({ id, name, price, category, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editCategory, setEditCategory] = useState(category);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) onDelete();
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('products')
      .update({ name: editName, price: parseFloat(editPrice), category: editCategory })
      .eq('id', id);

    if (!error) {
      setIsEditing(false);
      onUpdate();
    }
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
        <button className="view-btn" onClick={() => navigate(`/product/${id}`)}>View</button>
      </div>
    </div>
  );
}

export default ProductCard;