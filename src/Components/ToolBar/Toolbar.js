import React from "react";
import classes from "./Toolbar.module.css";
const Toolbar = () => {
  return (
    <header className={classes.toolbar}>
      <nav className={classes.toolbar_navigation}>
        <div></div>
        <div className={classes.toolbar_logo}>
          <a href="/">The Logo</a>
        </div>
        <div className={classes.spacer} />
        <div className={classes.toolbar_navigation_items}>
          <ul>
            <li>
              <a href="/">PRoducts</a>
            </li>
            <li>
              <a href="/">USers</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
