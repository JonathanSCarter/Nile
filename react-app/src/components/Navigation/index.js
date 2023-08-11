import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CartButton from "../CartButton";
import { thunkGetQueriedItems, thunkGetItems } from "../../store/item";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  const route = pathname.split("/")[1];
  const [useProfile, setUseProfile] = useState(true);

  useEffect(() => {
    if (route === "login" || route === "signup") setUseProfile(false);
    else setUseProfile(true);
  }, [route]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleSearch = () => {
    dispatch(thunkGetQueriedItems(query)).then(() => {
      history.push("/", { search: true });
    });
  };

  const handleItems = () => {
    dispatch(thunkGetItems());
  };

  return (
    <div className="big-navbar">
        <div className="navbar">

      <button className="logo-in-navbar" onClick={handleItems}>
        <NavLink exact to="/" className="logo">
          Nile
        </NavLink>
      </button>
      <div className="user-links">
        {isLoaded && useProfile && <ProfileButton user={sessionUser} />}
        {sessionUser && (
          <>
            <button>
              <NavLink className="header-link" exact to="/create">
                Create Item
              </NavLink>
            </button>
            <button>
              <NavLink className="header-link" exact to="/cart">
                Go to Checkout
              </NavLink>
            </button>
            <button>
              <NavLink className="header-link" exact to="/history">
                Order History
              </NavLink>
            </button>
            <CartButton />
          </>
        )}
        {!useProfile && !sessionUser && (
          <button style={{ cursor: "default" }}>
            {/* This button has no text and no functionality */}
          </button>
        )}
      </div>
        </div>
        <div className="search-div">

      <span className="search-span">
        <input
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ></input>
        <button onClick={handleSearch}>Search</button>
      </span>
          </div>
    </div>
  );
}

export default Navigation;
