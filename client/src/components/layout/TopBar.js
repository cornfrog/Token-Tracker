import React from "react";
import { Link } from "react-router-dom";
import signedOutImagePath from "../../../public/imgs/signout-img.png"

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const signedOutImage = <img src={signedOutImagePath} className="profile-pic" />


  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="nav-bar-mobile">
      <header className="app-title">Token Tracker</header>
      <ul>{user ? authenticatedListItems : signedOutImage}</ul>
    </div>
  );
};

export default TopBar;
