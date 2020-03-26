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
  const [sideDraw, setsideDraw] = useState(false);

  const drawerToggleClickHandler = () => {
    setsideDraw(prevState => {
      return { sideDraw: !prevState.sideDraw };
    });
  };

  const backdropClickHandler = () => {
    setsideDraw(false);
  };

  let backdrop;
  if (sideDraw) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  return (
    <Aux>
      <Router>
        <ToolBar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDraw} />
        {backdrop}
        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        {/* Did not do 41:11 UI nav video */}
      </Router>
    </Aux>
  );
};

export default Content;
