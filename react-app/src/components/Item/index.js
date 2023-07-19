import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItem } from "../../store/item";
import { useHistory } from 'react-router-dom';
import './item.css';
function Item({item}){
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(thunkGetItem(item.id))
    .then(() => history.push(`/items/${item.id}`));
  }

  return(
    <div className='item-container' onClick={handleSelect}>
      <img src={item.image} alt="Item Image" />
      <div>
      <p>{item.name}</p>
      <p>{item.rating} star</p>
      <p>{item.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Item
