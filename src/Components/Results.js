import React from "react";
import Result from "./Result";

const Results = props => {
  console.log(props.results);
  return (
    <div className="results">
      {props.results.map(result => (
        <Result className="result" key={result.id} result={result} />
      ))}
    </div>
  );
};

export default Results;
