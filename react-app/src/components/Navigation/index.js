import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CartModal from "../CartModal";
import OpenModalButton from "../OpenModalButton";

function Navigation({ isLoaded }) {
	const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        {isLoaded && useProfile && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
      {sessionUser && (
        <>
          <button>
            <NavLink exact to="/create">
              Create Item
            </NavLink>
          </button>
          <button>
            <NavLink exact to='/history'>
              Order History
            </NavLink>
          </button>
          <OpenModalButton
            buttonText="View Cart"
            onItemClick={closeMenu}
            modalComponent={<CartModal />}
          />
        </>
      )}
    </>
  );
}

export default Navigation;
