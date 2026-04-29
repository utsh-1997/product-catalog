function ProductCard(props) {
    return(
        <div className="product-card">
            <h2>{props.name}</h2>
            <p className="category">{props.category}</p>
            <p className="price">₹{props.price}</p>
            <button>View Details</button>
        </div>
    );
}

export default ProductCard;