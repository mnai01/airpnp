import React from "react";
import classes from "./DrawToggleButton.module.css";

const DrawToggleButton = props => {
  return (
    <button className={classes.togglebutton}>
      <div className={classes.togglebutton_line}></div>
      <div className={classes.togglebutton_line}></div>
      <div className={classes.togglebutton_line}></div>
    </button>
  );
};

export default DrawToggleButton;
