import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [])
    return(
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li key="cart-title">
                        <h3>
                            Shopping Cart
                        </h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                        <li key="cart-empty">
                            Cart is empty
                        </li>
                        :
                        cartItems.map( item => 
                        <li key="cart-{item.product}">
                            <div className="cart-image">
                                <img src={item.image} alt="product"/>
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/" + item.product }>
                                        {item.name}
                                    </Link>
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                        {[...Array(item.countInStock).keys()].map((x) => {
                                            return (<option key={x+1} value={x+1}>{x+1}</option>)
                                        })}
                                    </select>
                                    <button type="button" onClick={() =>removeFromCartHandler(item.product)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                ${item.price}
                            </div>
                        </li>
                        )
                    }                   
                </ul>
            </div>
            <div className="cart-actions">
                <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items )
                :
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button className="button primary" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen