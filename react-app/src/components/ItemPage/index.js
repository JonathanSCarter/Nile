import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import items, { thunkGetItem } from "../../store/item";
import { useParams, useHistory } from "react-router-dom";
import DeleteItem from '../DeleteItem'
import OpenModalButton from "../OpenModalButton";

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

  return (
    <div>
      <div>{item.image}</div>
      <div>{item.name}</div>
      <div>{item.rating}</div>
      <div>{item.description}</div>
      <div>{item.seller}</div>
      <div>{item.price}</div>
      <div>{item.category}</div>
      {isSeller &&
      <>
        <OpenModalButton
          buttonText="Delete Item"
          modalComponent={<DeleteItem id={item.id}/>}
          />
        <button onClick={handleUpdate}>Update Item</button>
          </>
      }
    </div>
  )

}

export default ItemPage
