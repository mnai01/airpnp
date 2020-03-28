import React from "react";
import classes from "./Result.module.css";
import Public from "../../../assets/Public.png";

const Result = props => {
  return (
    <div className={classes.Result_Wrapper} onClick={props.click}>
      <img src={Public}></img>
      <div className={classes.result}>
        <h3> {props.result.name}</h3>
        <p>
          {props.result.street},{props.result.city},{props.result.state}
        </p>
        <p className={classes.comment}>{props.result.comment}</p>
      </div>
    </div>
  );
};

export default Result;
