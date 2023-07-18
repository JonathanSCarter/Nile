import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItem } from "../../store/item";
import { useHistory } from 'react-router-dom'

function Item({item}){
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(thunkGetItem(item.id))
    .then(() => history.push(`/items/${item.id}`))
  }
  console.log(item);
  return(
    <div onClick={handleSelect}>
      <img src={item.image} alt="Item Image" />
      <div>{item.name}</div>
      <div>{item.rating}</div>
      <div>{item.price}</div>
    </div>
  )
}

export default Item
