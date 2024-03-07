import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
import signedOutImagePath from "../../../public/imgs/signout-img.png"

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const [displayMenu, setDisplayState] = useState(false)

  const goToLogin = () => {
    return window.location.href = "/login"
  }

  const goToHomePage = () => {
    return window.location.href = "/"
  }

  const signedOutImage = <img src={signedOutImagePath} onClick={goToLogin} className="profile-pic" />

  const goToProfile = () => {
    return window.location.href = "/profile"
  }

  const showMenu = () => {
    setDisplayState(!displayMenu)
  }

  const profilePicture = <img src={signedOutImagePath} onClick={showMenu} className="profile-pic" />

  let menuClassName = "profile-menu"
  if (displayMenu) {
    menuClassName = "profile-menu-show"
  }

  return (
    <>
      <div className="app-top-bar">
        <header className="app-title" onClick={() => { goToHomePage() }}>Token Tracker</header>
        <ul>{user ? profilePicture : signedOutImage}</ul>
      </div>
      <div className={menuClassName}>
        <button onClick={goToProfile} className="menu-btn">My Profile</button>
        <SignOutButton />
      </div>
    </>
  );
};

export default TopBar;
