import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItem } from "../../store/item";
import { useHistory } from "react-router-dom";
import "./item.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Item({ item }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(thunkGetItem(item.id)).then(() =>
      history.push(`/items/${item.id}`)
    );
  };

  return (
    <div className="item-container" onClick={handleSelect}>
      <img src={item.image} alt="Item Image" />
      <div className="item-details">
        <p>{item.name}</p>
        <span>
        <FontAwesomeIcon icon={faStar} style={{color: "#ffdd00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffdd00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffdd00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffdd00",}} />
        <FontAwesomeIcon icon={faStar} style={{color: "#ffdd00",}} />
    </span>
        <span className="price-style">
        <p style={item.discount > 0 ? { textDecoration: "line-through", marginRight:"8px" } : {}}>
          ${item.price.toFixed(2)}
        </p>
        {item.discount > 0 && (
          <p> On sale for ${(item.price - item.price * (item.discount / 100)).toFixed(2)}! {item.discount}% off!</p>
          )}
          </span>
      </div>
    </div>
  );
}

export default Item;
