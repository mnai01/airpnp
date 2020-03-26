import React, { useState } from "react";
import "../SideDrawer/DrawToggleButton";
import classes from "./Toolbar.module.css";
import DrawToggleButton from "../SideDrawer/DrawToggleButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import HomePage from "../HomePage/HomePage.";
import CareerPath from "../CareerPath/CareerPath";
import Aux from "../../hoc/auxHOC/auxHOC";

const Toolbar = props => {
  const [top1, setTop1] = useState({
    lat: 38.8283,
    lng: -98.5795
  });
  return (
    <Aux>
      <Router>
        <header className={classes.toolbar}>
          <nav className={classes.toolbar_navigation}>
            <div className={classes.toolbar_toggleButton}>
              <DrawToggleButton click={props.drawerClickHandler} />
            </div>
            <div className={classes.toolbar_logo}>
              <a href="/">The Logo</a>
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
                  <Link to="/SearchPage">SearchPage</Link>
                </li>
                <li>
                  <Link to="/Test">Test</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <Switch>
          <Route path="/Test">
            <SearchPage top1={top1} />
          </Route>
          <Route path="/About">
            <CareerPath />
          </Route>
          <Route path="/SearchPage">
            <SearchPage top1={top1} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Aux>
  );
};

export default Toolbar;
