import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  handleCheck,
  addCart
}) {
  return (
    <div className="box">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <div className="image">
        <img src={product.images.url} alt={product.title} />
      </div>

      <div className="content">
        <h3>{product.title}</h3>
          <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
          </div>
<div className='price'>${product.price}</div>
        <div className="row">
        <Link className="btn" to="#1" onClick={() =>deleteProduct(product._id,product.images.public_id)}>
            Delete
          </Link>
          <Link className="btn" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
