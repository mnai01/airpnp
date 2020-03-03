import React from "react";
import classes from "./Result.module.css";

const Result = props => {
  return (
    <div className="Result-Wrapper">
      <p className="result">
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
