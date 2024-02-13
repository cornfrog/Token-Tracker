import React from "react";
// import { Redirect } from "react-router-dom";
import signedOutImagePath from "../../../public/imgs/signout-img.png"

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const goToLogin = () => {
    return window.location.href = "/login"
  }

  const goToHomePage = () => {
    return window.location.href = "/"
  }

  const signedOutImage = <img src={signedOutImagePath} onClick={() => {goToLogin()}} className="profile-pic" />

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="nav-bar-mobile">
      <header className="app-title" onClick={() => {goToHomePage()}}>Token Tracker</header>
      <ul>{user ? authenticatedListItems : signedOutImage}</ul>
    </div>
  );
};

export default TopBar;
