import React from "react";
import "./SideDrawer.css";

const SideDrawer = props => {
  let drawerClasses = ["SideDrawer"];
  if (props.show) {
    drawerClasses = ["SideDrawer open"];
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/About">About</a>
        </li>
        <li>
          <a href="/SearchPage">SearchPage</a>
        </li>
        <li>
          <a href="/Test">Test</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
