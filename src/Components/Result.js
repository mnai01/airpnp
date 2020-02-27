import React from "react";
import "./Results.css";

const Result = props => {
  return (
    <div className="Result-Wrapper">
      <p>
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
