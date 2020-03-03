import React from "react";
import classes from "./Result.module.css";

const Result = props => {
  return (
    <div className={classes.Result_Wrapper}>
      <p className={classes.result}>
        {props.result.name}
        <br></br>
        {props.result.street}
        <br></br>
        {props.result.city}
        <br></br>
        {props.result.state}
        <br></br>
      </p>
    </div>
  );
};

export default Result;
