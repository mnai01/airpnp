import React from "react";

const PrivateResultPage = props => {
  if (props.privResults.length === 0) {
    return <p>404</p>;
  } else {
    let result = props.privResults[0];
    return <p>{result.id}</p>;
  }
};

export default PrivateResultPage;
