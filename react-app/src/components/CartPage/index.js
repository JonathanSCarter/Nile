import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";
import CartItem from "../CartItem";
import { thunkPurchaseCart } from "../../store/cart";

function CartPage(){
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const [normalizedCartItems, setNormalizedCartItems] = useState([...Object.values(cartItems)])
  const [price, setPrice] = useState(0)
  const handlePurchase = () => {
    dispatch(thunkPurchaseCart())
  }

  useEffect(() => {
    setPrice(normalizedCartItems.reduce((acc, cartItem) => acc + (cartItem.item.price * cartItem.count - cartItem.item.price * cartItem.count * (cartItem.item.discount / 100)), 0).toFixed(2));
  }, [normalizedCartItems])

  useEffect(() => {
    dispatch(thunkGetCart());
  }, [])

  useEffect(() => {
    setNormalizedCartItems([...Object.values(cartItems)]);
  }, [cartItems])
  return(
    <>
    {
      normalizedCartItems.map((cartItem) => {
        return <CartItem cartItem={cartItem}/>
      })
    }
    <button onClick={handlePurchase}>Buy Now ${price}</button>
    </>
  )
}

export default CartPage
