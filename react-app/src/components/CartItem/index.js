import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkGetCart, thunkUpdateCount } from "../../store/cart";
import { thunkDeleteCart } from "../../store/cart";
import "./CartItem.css";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(cartItem.count);

  const handleUpdate = (e) => {
    const payload = {
      count: e.target.value,
    };
    dispatch(thunkUpdateCount(cartItem.id, payload));
  };

  const handleDelete = () => {
    dispatch(thunkDeleteCart(cartItem.id));
  };

  useEffect(() => {
    setCount(cartItem.count);
  }, [cartItem]);

  return (
    <div className="cart-item">
      <img src={cartItem.item.image} alt="Item Image" />
      <div className="cart-item-info">
        <p>{cartItem.item.name}</p>
        <span>
        <span>
        <label>Quantity</label>
        <select onChange={handleUpdate} value={count}>
        {[...Array(count + 10).keys()].map((num) => (
    <option key={num} value={num + 1}>
      {num + 1}
    </option>
  ))}
        </select>
        </span>
        <button onClick={handleDelete}>Delete Item From Cart</button>
        </span>
      </div>
    </div>
  );
}

export default CartItem;
