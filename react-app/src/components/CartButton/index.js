import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";
import CartItem from "../CartItem";
import { useHistory } from "react-router-dom";
import './CartButton.css'

function CartButton() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [normalizedCartItems, setNormalizedCartItems] = useState([...Object.values(cartItems)]);
  const history = useHistory()
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(thunkGetCart());
  }, [])
  useEffect(() => {
    setNormalizedCartItems([...Object.values(cartItems)]);
  }, [cartItems])

  const showCart = () => {
    setShow(!show)
  }

  const handleGoCart = () => {
    history.push('/cart')
  }

  return (
    <>
    <button onClick={showCart}>View Cart</button>
    {show && (
      <div className="cart-modal">
        {normalizedCartItems.slice(0, 5).map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
        <div className="cart-modal-bottom">
        {normalizedCartItems.length > 5 && (
          <p>And some more items</p>
          )}
        <button onClick={handleGoCart}>Go to Checkout</button>
          </div>
      </div>
    )}
  </>
  )
}

export default CartButton
