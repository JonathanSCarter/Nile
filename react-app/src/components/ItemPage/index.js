import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItem } from "../../store/item";
import { useParams, useHistory } from "react-router-dom";
import DeleteItem from "../DeleteItem";
import OpenModalButton from "../OpenModalButton";
import { thunkAddToCart, thunkGetCart } from "../../store/cart";
import "./ItemPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReviewContainer from "../ReviewContainer";

function ItemPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.items.singleItem);
  const user = useSelector((state) => state.session.user);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (user) setIsSeller(user.id === item.seller_id);
    else setIsSeller(false);
  }, [user, item]);

  const handleUpdate = () => {
    history.push(`/items/${id}/update`);
  };

  const handleAdd = () => {
    const payload = {
      item_id: id,
      count: count,
    };
    dispatch(thunkAddToCart(payload));
    setIsAdded(true);
  };

  const handleBuy = async () => {
    await handleAdd();
    history.push("/cart");
  };

  useEffect(() => {
    const fetchItem = async () => {
      const res = await dispatch(thunkGetItem(id));
      if (res && !res.ok) {
        history.push("/");
      }
    };
    fetchItem();
  }, []);

  return Object.keys(item).length ? (
    <div className="all-item-page">
      <div className="item-page">
        <div className="item-page-info">
          <img src={item.image} alt="Item Image" />
          <div className="info-span">
            <h2>{item.name}</h2>
            <span>
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: item.rating >= 0.5 ? "#ffdd00" : "#ccc" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: item.rating >= 1.5 ? "#ffdd00" : "#ccc" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: item.rating >= 2.5 ? "#ffdd00" : "#ccc" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: item.rating >= 3.5 ? "#ffdd00" : "#ccc" }}
              />
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: item.rating >= 4.5 ? "#ffdd00" : "#ccc" }}
              />{" "}
              ({item.rating.toFixed(1)})
            </span>
            <p>{item.description}</p>
            <h4>Sold to you by {item.seller}</h4>
            <span className="price-style">
              <p
                style={
                  item.discount > 0
                    ? { textDecoration: "line-through", marginRight: "8px" }
                    : {}
                }
              >
                ${item.price.toFixed(2)}
              </p>
              {item.discount > 0 && (
                <p>
                  {" "}
                  On sale for $
                  {(item.price - item.price * (item.discount / 100)).toFixed(2)}
                  ! {item.discount}% off!
                </p>
              )}
            </span>
            {/* <p>{item.category}</p> */}
          </div>
        </div>
        {user ? (
          isSeller ? (
            <div className="item-page-sidebar">
              <>
                <h4>
                  This is your item. It is currently being sold for $
                  {(item.price - item.price * (item.discount / 100)).toFixed(2)}
                  . If you would like to change anything, please select an
                  option below.
                </h4>
                <span className="button-holder">
                  <button onClick={handleUpdate}>Update Item</button>
                  <OpenModalButton
                    buttonText="Delete Item"
                    modalComponent={<DeleteItem id={item.id} />}
                  />
                </span>
              </>
            </div>
          ) : (
            <div className="item-page-sidebar">
              <>
                <h3>Buy new:</h3>
                <h1>
                  $
                  {(item.price - item.price * (item.discount / 100)).toFixed(2)}
                </h1>
                <span>
                  <label>Quantity</label>
                  <select
                    onChange={(e) => setCount(e.target.value)}
                    value={count}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </span>
                <span className="button-holder">
                  <button onClick={handleAdd}>Add to Cart</button>
                  {isAdded && (
                    <div>
                      <p>
                        Item has been added to your cart! Would you like to go
                        to checkout?
                      </p>
                      <button style={{marginLeft: "0px"}} onClick={() => history.push("/cart")}>
                        Go to Checkout
                      </button>
                    </div>
                  )}
                  <button onClick={handleBuy}>Buy Now</button>
                </span>
              </>
            </div>
          )
        ) : null}
      </div>
        <ReviewContainer id={id}/>
    </div>
  ) : null;
}

export default ItemPage;
