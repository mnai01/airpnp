import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./Components/SearchPage/SearchPage";
import HomePage from "./Components/HomePage/HomePage.";
import About from "./Components/CareerPath/CareerPath";
import ToolBar from "./Components/ToolBar/Toolbar";
import CareerPath from "./Components/CareerPath/CareerPath";
import GeoLocation from "./Components/GeoLocation/GeoLocation";

const Content = () => {
  return (
    <Router>
      <div>
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
            <GeoLocation />
            <SearchPage />
          </Route>
          <Route path="/About">
            <CareerPath />
          </Route>
          <Route path="/SearchPage">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Content;
