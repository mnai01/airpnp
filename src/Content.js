import React, { useState } from "react";
import ToolBar from "./Components/ToolBar/Toolbar";
import SideDrawer from "./Components/SideDrawer/SideDrawer";
import Backdrop from "./Components/Backdrop/Backdrop";
import MainLogReg from "./Components/Auth/main";
import Aux from "./hoc/auxHOC/auxHOC";

const Content = () => {
  const [sideDraw, setsideDraw] = useState(false);
  const [Auth, setAuth] = useState({
    Auth: false,
    token: null,
  });

  const setAuthHandler = (token) => {
    if (token == null) {
      return;
    }
    setAuth((prevState) => {
      return { Auth: true, token: token };
    });
  };

  const drawerToggleClickHandler = () => {
    setsideDraw((prevState) => {
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
      {Auth.Auth ? (
        <div>
          <ToolBar drawerClickHandler={drawerToggleClickHandler} />
          <SideDrawer show={sideDraw} />
          {backdrop}
        </div>
      ) : (
        <MainLogReg Auth={setAuthHandler} />
      )}
      {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
      {/* Did not do 41:11 UI nav video */}
    </Aux>
  );
};

export default Content;
