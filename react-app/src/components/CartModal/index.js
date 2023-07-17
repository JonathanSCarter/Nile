import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";
import CartItem from "../CartItem";
import { useHistory } from "react-router-dom";

function CartModal() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [normalizedCartItems, setNormalizedCartItems] = useState([...Object.values(cartItems)]);
  const history = useHistory()
  useEffect(() => {
    dispatch(thunkGetCart());
  }, [])
  useEffect(() => {
    setNormalizedCartItems([...Object.values(cartItems)]);
  }, [cartItems])
  return (
    <>
    {
      normalizedCartItems.map((cartItem) => {
        return <CartItem cartItem={cartItem} />
      })
    }
    <button onClick={() => history.push('/cart')}>Go to Cart</button>
    </>
  )
}

export default CartModal
