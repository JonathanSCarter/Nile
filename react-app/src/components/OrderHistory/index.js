import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPurchases } from "../../store/cart";
import OldCartItem from "../OldCartItem";

function OrderHistory(){
  const dispatch = useDispatch()

  const carts = useSelector(state => state.cart.oldCartItems);
  const [normalizedCarts, setNormalizedCarts] = useState([]);
  useEffect(() => {
    setNormalizedCarts([...Object.values(carts)])
  }, [carts])


  useEffect(() => {
    dispatch(thunkGetPurchases)
  })

  return(
    <>
    {normalizedCarts && normalizedCarts.map((cart) => {
      return (<OldCartItem cart={cart}/>)
    }
    )}
    </>
  )
}

export default OrderHistory
