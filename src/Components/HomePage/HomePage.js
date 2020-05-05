import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import NewYork from "../../assets/NewYork.jpg";
import NewOrleanIMG from "../../assets/NewOrleans.jpg";
import Los_AngelesIMG from "../../assets/Los_Angeles.jpg";
import WashingtonIMG from "../../assets/Washington.jpg";
import Las_VegasIMG from "../../assets/Las_Vegas.png";
import San_FranciscoIMG from "../../assets/San-Francisco.jpg";
import MiamiIMG from "../../assets/Miami.jpg";
import StayHomeBanner from "../../assets/Stay.jpg";
import { Media } from "reactstrap";

import Aux from "../../hoc/auxHOC/auxHOC";
import classes from "./HomePage.module.css";

const URLTOP5 = "https://www.airpnpbcs430w.info/User/Addresses/API/top5all/";

const HomePage = () => {
  const [top5, settop5] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(URLTOP5)
      .then((res) => {
        console.log(res);
        settop5(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Aux>
      <div className={classes.BannerContainer}>
        <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
          <Media
            className={classes.Banner}
            object
            src={StayHomeBanner}
            alt="Generic placeholder image"
          />
        </a>
        ,
      </div>
      <div className={classes.PageContainer}>
        <div className={classes.WelcomeMsg}>
          <h1>Hello, Welcome back {Cookies.get("Username")}</h1>
        </div>
        <Switch>
          <Route exact path="/" exact>
            <div className={classes.SectionTitle}>
              <p>Travel with a piece of mind Airpnp</p>
            </div>
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
            <div className={classes.SectionTitle}>
              <p>Travel with some of our top bathrooms on your side</p>
            </div>
            <div>
              {loading ? (
                <h1>Loading</h1>
              ) : (
                <div className={classes.HomePageItems}>
                  {top5.map((result) => (
                    <Link key={result.id} to={"/PrivateBathroom/" + result.id}>
                      <div className={classes.HomePageItem}>
                        <img src={MiamiIMG}></img>
                        <h3>{result.address_id.user}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Aux>
  );
};

export default HomePage;
