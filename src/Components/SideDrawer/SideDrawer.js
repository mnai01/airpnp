import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  let drawerClasses = ["SideDrawer"];
  if (props.show) {
    drawerClasses = ["SideDrawer open"];
  }

  const handleLogout = () => {
    Cookies.remove("Token");
    Cookies.remove("User");
    window.location.reload(false);
  };

  return (
    <nav className={drawerClasses}>
      <ul>
        <Router>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/SearchPage">SearchPage</Link>
          </li>
          {/* <li>
            <Link to="/Test">Test</Link>
          </li> */}
          <li>
            <Link to="/UserInfo">UserInfo</Link>
          </li>
          <li>
            <Link to="/HostBathroom">Host Bathroom</Link>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </Router>
      </ul>
    </nav>
  );
};

export default SideDrawer;
