import React, { useState } from "react";
import MainMenuMap from "../MainMenuMap/MainMenuMap";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import { HashRouter  as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";

import NewYork from "../../assets/NewYork.jpg";
import NewOrleanIMG from "../../assets/NewOrleans.jpg";
import Los_AngelesIMG from "../../assets/Los_Angeles.jpg";
import WashingtonIMG from "../../assets/Washington.jpg";
import Las_VegasIMG from "../../assets/Las_Vegas.png";
import San_FranciscoIMG from "../../assets/San-Francisco.jpg";
import MiamiIMG from "../../assets/Miami.jpg";

import Aux from "../../hoc/auxHOC/auxHOC";
import classes from "./HomePage.module.css";

const HomePage = props => {
  // const [NYC, setNYC] = useState({
  //   lat: 40.7128,
  //   lng: -74.006
  // });
  // const [NewOrleans, setNewOrleans] = useState({
  //   lat: 29.9511,
  //   lng: -90.0715
  // });
  // const [LA, setLA] = useState({
  //   lat: 34.0522,
  //   lng: -118.2437
  // });
  // const [DC, setDC] = useState({
  //   lat: 38.9072,
  //   lng: -77.0369
  // });
  // const [LasVegas, setLasVegas] = useState({
  //   lat: 36.1699,
  //   lng: -115.1398
  // });
  // const [SF, setSF] = useState({
  //   lat: 37.7749,
  //   lng: -122.4194
  // });
  // const [MI, setMI] = useState({
  //   lat: 25.7617,
  //   lng: -80.1918
  // });
  return (
    <Aux>
      {/* Removed this being wrapped in a switch */}
      <div className={classes.SectionTitle}>
        <p>Travel with a piece of mind Airpnp</p>
      </div>

      <Switch>
        {/* <TileOverview /> */}
        <Route exact path="/" exact>
          <div className={classes.HomePageItems}>
            <Link to="/New_York">
              <div className={classes.HomePageItem}>
                <img src={NewYork}></img>
                <h3>New York</h3>
              </div>
            </Link>

            <Link to="/New_Orleans">
              <div className={classes.HomePageItem}>
                <img src={NewOrleanIMG}></img>
                <h3>New Orleans</h3>
              </div>
            </Link>

            <Link to="/Los_Angeles">
              <div className={classes.HomePageItem}>
                <img src={Los_AngelesIMG}></img>
                <h3>Los Angeles</h3>
              </div>
            </Link>

            <Link to="/Washington_DC">
              <div className={classes.HomePageItem}>
                <img src={WashingtonIMG}></img>
                <h3>Washington DC</h3>
              </div>
            </Link>
            <Link to="/Las_Vegas">
              <div className={classes.HomePageItem}>
                <img src={Las_VegasIMG}></img>
                <h3>Las Vegas</h3>
              </div>
            </Link>
            <Link to="/San_Francisco">
              <div className={classes.HomePageItem}>
                <img src={San_FranciscoIMG}></img>
                <h3>San Francisco</h3>
              </div>
            </Link>
            <Link to="/Miami">
              <div className={classes.HomePageItem}>
                <img src={MiamiIMG}></img>
                <h3>Miami</h3>
              </div>
            </Link>
          </div>
        </Route>

        {/* <Route exact path="/New_York">
          <SearchPage cords={NYC} zoom={13} />
        </Route>

        <Route path="/New_Orleans">
          <SearchPage cords={NewOrleans} zoom={11} />
        </Route>

        <Route path="/Los_Angeles">
          <SearchPage cords={LA} zoom={11} />
        </Route>

        <Route path="/Washington_DC">
          <SearchPage cords={DC} zoom={11} />
        </Route>

        <Route path="/Las_Vegas">
          <SearchPage cords={LasVegas} zoom={11} />
        </Route>

        <Route path="/San_Francisco">
          <SearchPage cords={SF} zoom={11} />
        </Route>

        <Route path="/Miami">
          <SearchPage cords={MI} zoom={11} />
        </Route> */}
      </Switch>
    </Aux>
  );
};

export default HomePage;
