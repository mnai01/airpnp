import React from "react";
import ErrorPage from "../ErroPage/ErroPage";
import classes from "./PrivateResultPage.module.css";
import paper from "../../assets/toilet-paper.png";

const PrivateResultPage = props => {
  if (props.privResults.length === 0) {
    return <ErrorPage />;
  } else {
    let result = props.privResults[0];
    let totalScore = 0;
    let avgScore = 0;
    let amountOfRatings = result.ratings.length;
    let numOftoilets = result.num_of_toilets;
    let numOfIcons = [];
    for (var i = 0; i < numOftoilets; i++) {
      numOfIcons.push(<img className={classes.accessories} src={paper}></img>);
    }
    result.ratings.map(result => {
      avgScore = avgScore + result.score;
      totalScore = avgScore / amountOfRatings;
    });

    return (
      <div>
        <p>
          Average Score: {totalScore.toFixed(2)} ({amountOfRatings})
        </p>
        <h3>Address</h3>
        <p>
          {result.address_id.address_line1}, {result.address_id.city},
          {result.address_id.state}
        </p>
        <p> {result.address_id.zip}</p>
        <h3>Details</h3>
        <div className={classes.numToiletsContainer}>
          <p>Number of toilets: </p>
          <div>
            {numOfIcons.map(result => {
              return result;
            })}
          </div>
        </div>

        <p>Shower: {result.has_shower.toString()}</p>
        <p>Bath: {result.has_shower.toString()}</p>
        <p>Sink: {result.has_shower.toString()}</p>
        <p>Fem Products: {result.has_fem_products.toString()}</p>
        <h3>Reviews</h3>
        {result.ratings.map(result => {
          return (
            <div>
              <hr />
              <p>{result.title}</p>
              <p>Score: {result.score}</p>
              <p>{result.description}</p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default PrivateResultPage;
