import React, { createContext, useState } from 'react'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {
    1: {1: 0, 2: 0, 3: 0}
  };
  return cart;
}

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId, sizeId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId][sizeId] += 1;
  
      return updatedCart;
    });
  }

  const removeFromCart = (itemId, sizeId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      if (!updatedCart[itemId][sizeId]) {
        updatedCart[itemId][sizeId] = 0;
      } else {
        updatedCart[itemId][sizeId] -= 1;
      }
  
      return updatedCart;
    });
  }

  const contextValue = { cartItems, addToCart, removeFromCart }
  
  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
}