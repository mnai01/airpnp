import React, { useState } from "react";
import "../SideDrawer/DrawToggleButton";
import classes from "./Toolbar.module.css";
import DrawToggleButton from "../SideDrawer/DrawToggleButton";
import Cookies from "js-cookie";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import Result from "../Results/Result/Result";
import HomePage from "../HomePage/HomePage";
import AboutPage from "../AboutPage/About";
import Login from "../Auth/main";
import ErrorPage from "../ErroPage/ErroPage";
import UserInfoPage from "../UserInfoPage/UserInfoPage";
import PublicUserInfoPage from "../PublicUserInfoPage/PublicUserInfoPage";
import PrivateResultsPage from "../PrivateResultPage/PrivateResultPage";
import HostBathroomPage from "../HostBathroomPage/HostBathroomPage";
import Footer from "../Footer/Footer";

import Aux from "../../hoc/auxHOC/auxHOC";

const Toolbar = (props) => {
  const [top1, setTop1] = useState({
    lat: 38.8283,
    lng: -98.5795,
  });
  const [NYC, setNYC] = useState({
    lat: 40.7128,
    lng: -74.006,
  });
  const [NewOrleans, setNewOrleans] = useState({
    lat: 29.9511,
    lng: -90.0715,
  });
  const [LA, setLA] = useState({
    lat: 34.0522,
    lng: -118.2437,
  });
  const [DC, setDC] = useState({
    lat: 38.9072,
    lng: -77.0369,
  });
  const [LasVegas, setLasVegas] = useState({
    lat: 36.1699,
    lng: -115.1398,
  });
  const [SF, setSF] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [MI, setMI] = useState({
    lat: 25.7617,
    lng: -80.1918,
  });

  const [currentSelected, setSelected] = useState([]);

  const handleResultclicked = (bathroom) => {
    setSelected([bathroom]);
  };

  const handleLogout = () => {
    Cookies.remove("Token");
    Cookies.remove("User");
    window.location.reload(false);
  };

  return (
    <Aux>
      <Router>
        <header className={classes.toolbar}>
          <nav className={classes.toolbar_navigation}>
            <div className={classes.toolbar_toggleButton}>
              <DrawToggleButton click={props.drawerClickHandler} />
            </div>
            <div className={classes.toolbar_logo}>
              <a href="/">Airpnp</a>
            </div>
            <div className={classes.spacer} />
            <div className={classes.toolbar_navigation_items}>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/About">About</Link>
                </li>
                <li>
                  <Link to="/SearchPage">Search</Link>
                </li>
                {/* <li>
                  <Link to="/Test">Test</Link>
                </li> */}
                <li>
                  <Link to="/UserInfo">UserInfo</Link>
                </li>
                <li>
                  <Link to="/HostBathroom">Host Bathroom</Link>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/404" component={ErrorPage} />
          <Route exact path="/About" component={AboutPage} />

          <Route exact path="/SearchPage">
            <SearchPage cords={top1} zoom={5} handle={handleResultclicked} />
          </Route>

          <Route exact path="/Test">
            <Login />
          </Route>

          <Route exact path="/UserInfo">
            <UserInfoPage />
          </Route>

          <Route exact path="/PublicUserInfo/:name">
            <PublicUserInfoPage />
          </Route>

          <Route exact path="/HostBathroom">
            <HostBathroomPage />
          </Route>

          <Route exact path="/New_York">
            <SearchPage cords={NYC} zoom={13} handle={handleResultclicked} />
          </Route>

          <Route path="/New_Orleans">
            <SearchPage
              cords={NewOrleans}
              zoom={11}
              handle={handleResultclicked}
            />
          </Route>

          <Route path="/Los_Angeles">
            <SearchPage cords={LA} zoom={11} handle={handleResultclicked} />
          </Route>

          <Route path="/Washington_DC">
            <SearchPage cords={DC} zoom={11} handle={handleResultclicked} />
          </Route>

          <Route path="/Las_Vegas">
            <SearchPage
              cords={LasVegas}
              zoom={11}
              handle={handleResultclicked}
            />
          </Route>

          <Route path="/San_Francisco">
            <SearchPage cords={SF} zoom={11} handle={handleResultclicked} />
          </Route>

          <Route path="/Miami">
            <SearchPage cords={MI} zoom={11} handle={handleResultclicked} />
          </Route>

          <Router exact path="/PrivateBathrooms/:id">
            {console.log(currentSelected)}
            <PrivateResultsPage privResults={currentSelected} />
          </Router>

          <Router exact path="/PrivateBathroom/:id">
            {console.log(currentSelected)}
            <PrivateResultsPage privResults={currentSelected} />
          </Router>
          {/* section 11, 205
              each page for each result */}

          <Redirect to="/404" />
        </Switch>
      </Router>
      <Footer />
    </Aux>
  );
};

export default Toolbar;
