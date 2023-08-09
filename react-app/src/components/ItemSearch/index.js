import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItems } from "../../store/item";
import { useLocation } from "react-router-dom";
import Item from "../Item";
import "./itemSearch.css";

function ItemSearch() {
  const location = useLocation();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.allItems);
  const normalizedItems = [...Object.values(items)];

  useEffect(() => {
    if(!location.state?.search)
    dispatch(thunkGetItems())
  }, []);

  return (
    <>
      <div className="item-holder">
        {normalizedItems.length ? (
          normalizedItems.map((item) => {
            return <Item item={item} />;
          })
        ) : (
          <p>
            There are no results for this search. Please try a different search.
          </p>
        )}
      </div>
    </>
  );
}

export default ItemSearch;
