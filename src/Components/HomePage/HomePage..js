import React, { useState } from "react";
import MainMenuMap from "../MainMenuMap/MainMenuMap";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import TileOverview from "../TileOverview/TileOverview";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";

import NewYork from "../../assets/NewYork.jpg";
import classes from "./HomePage.module.css";

const HomePage = props => {
  const [top1, setTop1] = useState({
    lat: 40.7128,
    lng: -74.006
  });
  const [top2, setTop2] = useState({
    lat: 34.0522,
    lng: -118.2437
  });
  const [top3, setTop3] = useState({
    lat: 41.8781,
    lng: -87.6298
  });
  return (
    <Switch>
      {/* <TileOverview /> */}
      <Route path="/" exact>
        <div className={classes.HomePageItems}>
          <Link to="/New_York">
            <div className={classes.HomePageItem}>
              <img src={NewYork}></img>
              <h3>New York</h3>
            </div>
          </Link>
          <br></br>
          <Link to="/Los_Angeles">
            <div className={classes.HomePageItem}>
              <img src={NewYork}></img>
              <h3>Los_Angeles</h3>
            </div>
          </Link>
          <br></br>
          <Link to="/Chicago">
            <div className={classes.HomePageItem}>
              <img src={NewYork}></img>
              <h3>Chicago</h3>
            </div>
          </Link>
          <br></br>
        </div>
      </Route>

      <Route path="/New_York">
        <SearchPage top1={top1} />
      </Route>

      <Route path="/Los_Angeles">
        <SearchPage top1={top2} />
      </Route>

      <Route path="/Chicago">
        <SearchPage top1={top3} />
      </Route>
    </Switch>
  );
};

export default HomePage;
