import React, { useContext, useState } from "react";
import { ShopContext } from "./shop-context";

export default function Product(props) {
  const { id, title, description, price, imageURL, sizeOptions } = props.data;
  const { addToCart } = useContext(ShopContext);
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);

  const convertIdToSize = (id) => {
    if (id == 1) {
      return "S";
    } else if (id == 2) {
      return "M";
    } else if (id == 3) {
      return "L";
    } else {
      return "";
    }
  };

  const handleAddToCart = () => {
    if (!size) {
      setError(true);
    } else {
      setError(false);
      setSize(null);
      addToCart(id, size);
    }
  };

  return (
    <div className="main-container">
      {(props.data &&      
        <div className="product-container">
          <div className="image-container">
            <img src={imageURL} alt="basic t-shirt" />
          </div>
          <div className="content-container">
            <h2 className="title">{title}</h2>
            <p className="price">${price.toFixed(2)}</p>
            <p className="description">{description}</p>
            <p>
              Size <span className="required">*</span>{" "}
              <span>{convertIdToSize([size])}</span>
            </p>
            <div className="size-container">
              {Array.isArray(sizeOptions) && sizeOptions.length > 0 ? (
                sizeOptions.map((size) => (
                  <div
                    onClick={() => setSize(size.id)}
                    className="size-box"
                    key={size.id}
                  >
                    {size.label}
                  </div>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>
            {error && (
              <p className="error-message">
                Please select a size.
              </p>
            )}
            <button className="add-cart-button" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
