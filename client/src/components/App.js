import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import AuthenticatedRoute from "../components/authentication/AuthenticatedRoute"
import "../assets/scss/main.scss";
import MenuBar from "./layout/MenuBar";
import CoinIndex from "./layout/CoinIndex";
import NewsIndex from "./layout/NewsIndex";
import getCurrentUser from "../services/getCurrentUser";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import TickerList from "./layout/TickerList";
import EditCoinList from "./layout/EditCoinList";
import CoinShowPage from "./layout/CoinShowPage";
import Profile from "./layout/Profile";
import NewsList from "./layout/NewsList";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <MenuBar />
      <Switch>
        <Route exact path="/">
          <TickerList user={currentUser}/>
          <NewsList />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/coins" component={CoinIndex} />
        <Route exact path="/news" component={NewsIndex} />
        <AuthenticatedRoute exact path="/login" component={SignInForm} user={currentUser} />
        <AuthenticatedRoute path="/profile" component={Profile} user={currentUser} />
        <Route path="/my-coins/edit" component={EditCoinList} user={currentUser}/>
        <Route exact path="/coins/:coinCode" component={CoinShowPage} />
      </Switch>
    </Router>
  );
};

export default hot(App);
