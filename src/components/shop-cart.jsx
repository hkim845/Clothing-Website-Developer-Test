import React, { useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { ShopContext } from "./shop-context";

export const ShopCart = (props) => {
    const { id, title, price, imageURL, sizeOptions } = props.data;
    const { cartItems } = useContext(ShopContext);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                My Cart
            </Dropdown.Toggle>

        {(props.data &&
            <Dropdown.Menu>
                {Object.entries(cartItems[id]).map(([sizeId, quantity]) => (
                    quantity > 0 && 
                        <Dropdown.Item className='cart-item-container d-flex'>
                            <img className='cart-image' src={imageURL} alt="thumbnail"></img>
                            <div>
                                <p>{title}</p>
                                <p>{quantity} x ${price.toFixed(2)}</p>
                                <p>Size: {sizeOptions.find((option) => option.id == sizeId)?.label} </p>
                            </div>
                        </Dropdown.Item>
                ))}
            </Dropdown.Menu>)}
        </Dropdown>
    );
}

export default ShopCart;

