import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./Components/SearchPage/SearchPage";
import HomePage from "./Components/HomePage/HomePage.";
import About from "./Components/CareerPath/CareerPath";
import ToolBar from "./Components/ToolBar/Toolbar";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import Backdrop from "./Components/Backdrop/Backdrop";
import CareerPath from "./Components/CareerPath/CareerPath";
import GeoLocation from "./Components/GeoLocation/GeoLocation";
import Aux from "./hoc/auxHOC/auxHOC";

const Content = () => {
  const [top1, setTop1] = useState({
    lat: 39.8283,
    lng: -98.5795
  });

  return (
    <Aux>
      <Router>
        <nav>
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
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Test">
            <ToolBar />
            <SideDrawer />
            <Backdrop />
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

export default Content;
