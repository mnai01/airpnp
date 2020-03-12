import React from "react";
import classes from "./SideDrawer.module.css";

const SideDrawer = () => {
  return (
    <nav className={classes.SideDrawer}>
      <ul>
        <li>
          <a href="/">test</a>
        </li>
        <li>
          <a href="/">test1</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
