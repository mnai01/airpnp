import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "../SearchPage/SearchPage";
import axios from "axios";

import NewYork from "../../assets/NewYork.jpg";
import classes from "./HomePage.module.css";

const top5Url =
  "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/User/Addresses/API/top5all/";
let newResults = [];

const HomePage = props => {
  const [TF, setTF] = useState(false);
  const [top, setTop] = useState({
    lat0: null,
    lng0: null,

    lat1: 40.7128,
    lng1: -74.006,

    lat2: 40.7128,
    lng2: -74.006,

    lat3: 40.7128,
    lng3: -74.006,

    lat4: 40.7128,
    lng4: -74.006
  });
  const [top2, setTop2] = useState({
    lat: 34.0522,
    lng: -118.2437
  });
  const [top3, setTop3] = useState({
    lat: 41.8781,
    lng: -87.6298
  });
  const [top4, setTop4] = useState({
    lat: 41.8781,
    lng: -87.6298
  });
  const [top5, setTop5] = useState({
    lat: 41.8781,
    lng: -87.6298
  });

  const handler = () => {
    setTF(!TF);
  };

  useEffect(() => {
    console.log("[useEffect] Called");
    axios
      .get(top5Url)
      .then(data => {
        newResults = data.data;
        console.log(newResults);

        newResults.map((result, i) => {
          let latx = "lat" + i;
          let lngx = "lng" + i;

          setTop(prevState => {
            return {
              ...prevState,
              latx: result.address_id.latitude,
              lngx: result.address_id.longitude
            };
          });
        });
        console.log(top);
        setTF(true);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Switch>
      {/* <TileOverview /> */}
      <Route path="/" exact>
        <div className={classes.HomePageItems}>
          <Link to="/Top1">
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
          {TF
            ? newResults.map((result, i) => {
                let name = "/Top" + i;
                return (
                  <Link to={name}>
                    <div className={classes.HomePageItem}>
                      <img src={NewYork}></img>
                      <h3>{result.address_id.city}</h3>
                    </div>
                  </Link>
                );
              })
            : console.log("false")}
          <p onClick={handler}>onClick</p>
        </div>
      </Route>
      <Route path="/Top0">
        <SearchPage lat={top.lat0} lng={top.lng0} />
      </Route>
      <Route path="/Top1">
        <SearchPage lat={top.lat1} lng={top.lng1} />
      </Route>
      <Route path="/Top2">
        <SearchPage lat={top.lat2} lng={top.lng2} />
      </Route>
      <Route path="/Top3">
        <SearchPage lat={top.lat3} lng={top.lng3} />
      </Route>
      <Route path="/Top4">
        <SearchPage lat={top.lat4} lng={top.lng4} />
      </Route>
    </Switch>
  );
};

export default HomePage;
