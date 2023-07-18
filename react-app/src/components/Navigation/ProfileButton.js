import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = user ? "profile-dropdown" + (showMenu ? "" : " hidden") : "profile-dropdown-logged-out" + (showMenu ? "" : " hidden") ;

  return (
    <>
      <button className="" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>Hello, {user.first_name} {user.last_name}</p>
            <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button onClick={() => history.push('/login')}>Log In</button>
            <button onClick={() => history.push('/signup')}>Sign Up</button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
