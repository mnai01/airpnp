import React, { useState } from "react";
import ToolBar from "./Components/ToolBar/Toolbar";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import Backdrop from "./Components/Backdrop/Backdrop";

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
      <ToolBar drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={sideDraw} />
      {backdrop}
      {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
      {/* Did not do 41:11 UI nav video */}
    </Aux>
  );
};

export default Content;
