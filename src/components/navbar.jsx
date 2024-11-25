import React from 'react'
import ShopCart from "./shop-cart";

export default function Navbar(props) {

  return (
    <div className="shopping-cart-navbar">
        <div className="link">
            <ShopCart data={props.data}></ShopCart>
        </div>
    </div>
  )
}