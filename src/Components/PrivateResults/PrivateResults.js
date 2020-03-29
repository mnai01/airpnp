import React from "react";
import PrivateResult from "./PrivateResult/PrivateResult";
import classes from "./PrivateResults.module.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const PrivateResults = props => {
  return (
    <div className={classes.results}>
      <ul>
        {props.privResults.map(result => (
          <Link to={"/" + result.id}>
            <PrivateResult
              className="result"
              key={result.id}
              result={result}
              click={() => props.click(result.id)}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default PrivateResults;
