import React from "react";
import Result from "./Result/Result";
import classes from "./Results.module.css";

const Results = props => {
  return (
    <div className={classes.results}>
      <ul>
        {props.results.map(result => (
          <Result
            className="result"
            key={result.id}
            result={result}
            click={() => props.click(result.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Results;
