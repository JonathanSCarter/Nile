import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import items, { thunkGetItem } from "../../store/item";
import { useParams, useHistory } from "react-router-dom";
import DeleteItem from '../DeleteItem'
import OpenModalButton from "../OpenModalButton";
import { thunkAddToCart } from "../../store/cart";

function ItemPage(){
  const history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams()
  const item = useSelector(state => state.items.singleItem)
  const user = useSelector(state => state.session.user)
  const [isSeller, setIsSeller] = useState(false)
  useEffect(() => {
    dispatch(thunkGetItem(id))
    if(user) setIsSeller(user.id === item.seller_id)
    else setIsSeller (false)
  }, [user])

  const handleUpdate = () => {
    history.push(`/items/${id}/update`)
  }

  const handleAdd = () => {
    const payload = {
      "item_id": id,
      "count": 1
    }
    dispatch(thunkAddToCart(payload))
  }

  const handleBuy = async () => {
    await handleAdd()
    history.push('/cart')
  }

  return (
    <div>
      <div>{item.image}</div>
      <div>{item.name}</div>
      <div>{item.rating}</div>
      <div>{item.description}</div>
      <div>{item.seller}</div>
      <div>{item.price}</div>
      <div>{item.category}</div>
      {user && isSeller ?
      <>
        <OpenModalButton
          buttonText="Delete Item"
          modalComponent={<DeleteItem id={item.id}/>}
          />
        <button onClick={handleUpdate}>Update Item</button>
          </>
       :
       <>
        <button onClick={handleAdd}>Add to Cart</button>
        <button onClick={handleBuy}>Buy Now</button>
       </>
      }
    </div>
  )

}

export default ItemPage
