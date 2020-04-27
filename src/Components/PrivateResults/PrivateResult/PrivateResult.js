import React from "react";
import classes from "./PrivateResult.module.css";
import Private from "../../../assets/Private.png";

const PrivateResult = (props) => {
  return (
    <div className={classes.Result_Wrapper} onClick={props.click}>
      <img src={Private}></img>
      <div className={classes.result}>
        <h3> Hosted by: {props.result.address_id.user}</h3>
        <p>
          {props.result.address_id.address_line1},{props.result.address_id.city}
          ,{props.result.address_id.state}
        </p>
        <p className={classes.comment}>{props.result.comment}</p>
      </div>
    </div>
  );
};

export default PrivateResult;
