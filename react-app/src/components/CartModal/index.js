import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";
import CartItem from "../CartItem";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";


function CartModal() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [normalizedCartItems, setNormalizedCartItems] = useState([...Object.values(cartItems)]);
  const history = useHistory()
  const { closeModal } = useModal();
  useEffect(() => {
    dispatch(thunkGetCart());
  }, [])
  useEffect(() => {
    setNormalizedCartItems([...Object.values(cartItems)]);
  }, [cartItems])

  const handleGoCart = () => {
    closeModal()
    history.push('/cart')
  }

  return (
    <>
    {
      normalizedCartItems.map((cartItem) => {
        return <CartItem cartItem={cartItem} />
      })
    }
    <button onClick={handleGoCart}>Go to Checkout</button>
    </>
  )
}

export default CartModal
