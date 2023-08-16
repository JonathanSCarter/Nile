import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetCart } from "../../store/cart";
import CartItem from "../CartItem";
import { useHistory } from "react-router-dom";
import './CartButton.css'
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

function CartButton() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [normalizedCartItems, setNormalizedCartItems] = useState([...Object.values(cartItems)]);
  const history = useHistory()
  const [show, setShow] = useState(false)
  const [numItems, setNumItems] = useState(0)
  const cartModalRef = useRef(null);


  useEffect(() => {
    dispatch(thunkGetCart());
  }, [])

  useEffect(() => {
    setNormalizedCartItems([...Object.values(cartItems)]);
  }, [cartItems])

  useEffect(() => {
    let sum = 0
    normalizedCartItems.forEach(item => sum += item.count)
    setNumItems(sum)
  }, [normalizedCartItems])

  const showCart = () => {
    setShow(!show)
  }

  const handleGoCart = () => {
    history.push('/cart')
  }

  const handleOutsideClick = (e) => {
    if (cartModalRef.current && !cartModalRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
    <button onClick={showCart} style={{ whiteSpace: 'pre-line' }}>View Cart {'\n'} {numItems} items</button>
    {show && (
      <div className="cart-modal" ref={cartModalRef}>
        {normalizedCartItems.length === 0 ? <p>Your Cart it Empty</p>: normalizedCartItems.slice(0, 5).map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
        <div className="cart-modal-bottom">
        {normalizedCartItems.length > 5 && (
          <p>And some more items</p>
          )}
        <button onClick={handleGoCart}>Go to Checkout</button>
          </div>
      </div>
    )}
  </>
  )
}

export default CartButton
