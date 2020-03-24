import React, { useState } from "react";
import MainMenuMap from "../MainMenuMap/MainMenuMap";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import TileOverview from "../TileOverview/TileOverview";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";

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
    <div>
      {/* <TileOverview /> */}
      <div>
        <Link to="/New_York">New_York</Link>
        <br></br>
        <Link to="/Los_Angeles">Los_Angeles</Link>
        <br></br>
        <Link to="/Chicago">Chicago</Link>
        <br></br>
      </div>
      {/* <MainMenuMap /> */}
      <Route path="/New_York">
        <SearchPage top1={top1} />
      </Route>

      <Route path="/Los_Angeles">
        <SearchPage top1={top2} />
      </Route>

      <Route path="/Chicago">
        <SearchPage top1={top3} />
      </Route>
    </div>
  );
};

export default HomePage;
