import React from "react";
import Result from "./Result";
import classes from "./Results.module.css";

const Results = props => {
  console.log(props.results);
  return (
    <div className={classes.results}>
      <ul>
        {props.results.map(result => (
          <Result className="result" key={result.id} result={result} />
        ))}
      </ul>
    </div>
  );
};

export default Results;
