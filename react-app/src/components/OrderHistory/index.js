import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPurchases } from "../../store/cart";
import OldCartItem from "../OldCartItem";
import './OrderHistory.css'
function OrderHistory(){
  const dispatch = useDispatch()

  const carts = useSelector(state => state.cart.oldCartItems);
  const [normalizedCarts, setNormalizedCarts] = useState([]);
  useEffect(() => {
    setNormalizedCarts([...Object.values(carts)])
  }, [carts])

  useEffect(() => {
    dispatch(thunkGetPurchases())
  }, [])

  return(
    <div className="order-history-container">
      <h1>Your Order History</h1>
    {normalizedCarts && normalizedCarts.sort((a,b) => new Date(b.purchased_at) - new Date(a.purchased_at)).map((cart) => {
      return (<OldCartItem cart={cart}/>)
    }
    )}
    </div>
  )
}

export default OrderHistory
