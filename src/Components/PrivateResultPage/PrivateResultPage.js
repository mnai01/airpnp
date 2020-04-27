import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "../ErroPage/ErroPage";
import axios from "axios";
import classes from "./PrivateResultPage.module.css";
import paper from "../../assets/toilet-paper.png";
import Schedule from "../Schedule/Schedule";

let result;
let totalScore = 0;
let avgScore = 0;
let amountOfRatings;
let numOftoilets;
let numOfIcons;

const PrivateResultPage = (props) => {
  const [dataObtained, setDataObtained] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Result, setResult] = useState();
  let id = useLocation();
  id = id.pathname.replace("/PrivateBathroom/", "");

  useEffect(() => {
    // check if a result passed in from the parameters is empty, if so run the axios call to get that specific result
    if (props.privResults.length === 0) {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/Bathrooms/API/" +
            id
        )
        .then((res) => {
          setResult(res.data[0]);
          setLoading(false);
          // if we run an axios call and pull nothing then temp is true and bathroom id was invalid
          if (res == undefined || null) {
            setDataObtained(false);
          } else {
            setDataObtained(true);
          }
        })
        .catch((err) => {
          setDataObtained(false);
          console.log(err);
        });
      // if its not empty and we have the result then set loading to false and temp to true
    } else {
      setLoading(false);
      setDataObtained(true);
    }
  }, []);

  // if result in parameters is empty
  if (props.privResults.length === 0) {
    // if temp is true (which for here represents a successful axios return)
    if (dataObtained) {
      // if axios data is empty
      if (Result == undefined || null) {
        console.log("in here", Result);
        // temp to false
        setDataObtained(false);
        return;
      }
      // does it still run this code after all of that or does the return make it exit?
      console.log("returnred", Result);
      result = Result;
      console.log("resultssss", result);
      totalScore = 0;
      avgScore = 0;
      amountOfRatings = result.ratings.length;
      numOftoilets = result.num_of_toilets;
      numOfIcons = [];
      for (let i = 0; i < numOftoilets; i++) {
        numOfIcons.push(
          <img key={i} className={classes.accessories} src={paper}></img>
        );
      }
      result.ratings.map((result) => {
        avgScore = avgScore + result.score;
        totalScore = avgScore / amountOfRatings;
        console.log("RATINGINGI" + result);
      });
    }
  } else {
    result = props.privResults[0];
    totalScore = 0;
    avgScore = 0;
    amountOfRatings = result.ratings.length;
    numOftoilets = result.num_of_toilets;
    numOfIcons = [];
    for (var i = 0; i < numOftoilets; i++) {
      numOfIcons.push(<img className={classes.accessories} src={paper}></img>);
    }
    result.ratings.map((result) => {
      avgScore = avgScore + result.score;
      totalScore = avgScore / amountOfRatings;
      console.log("RATINGINGI" + result);
    });
  }
  return (
    <div>
      {/* If loading is true then display loading icon, else, check the temp condition */}
      {loading ? (
        <div>LOADING</div>
      ) : (
        <div>
          {/* if temp is true which means axios pulled a valid entry then display it, else, show the error page */}
          {dataObtained ? (
            <div className="resultPage">
              <div className={classes.resultBanner}></div>
              <div className={classes.resultDetails}>
                <p>
                  Average Score: {totalScore.toFixed(2)} ({amountOfRatings})
                </p>
                <h3>Address</h3>
                <p>
                  {result.address_id.address_line1}, {result.address_id.city},
                  {result.address_id.state}
                </p>

                <p> {result.address_id.zip}</p>
                <hr />
                <h3>Details</h3>
                <div className={classes.numToiletsContainer}>
                  <p>Number of toilets: </p>
                  <div>
                    {numOfIcons.map((result) => {
                      return result;
                    })}
                  </div>
                </div>

                <p>
                  Shower:{" "}
                  {result.has_shower ? (
                    <img className={classes.accessories} src={paper}></img>
                  ) : null}
                </p>
                <p>
                  Bath:{" "}
                  {result.has_shower ? (
                    <img className={classes.accessories} src={paper}></img>
                  ) : null}
                </p>
                <p>
                  Sink:{" "}
                  {result.has_shower ? (
                    <img className={classes.accessories} src={paper}></img>
                  ) : null}
                </p>
                <p>
                  Fem Products:{" "}
                  {result.has_fem_products ? (
                    <img className={classes.accessories} src={paper}></img>
                  ) : null}
                </p>
                <hr />
                <Schedule id={id} />
                <h3>Reviews</h3>
                {result.ratings.map((result, i) => (
                  <div key={i}>
                    <hr />
                    <h2 className={classes.title}>{result.title}</h2>
                    <p>Score: {result.score}</p>
                    <p>{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ErrorPage />
          )}
        </div>
      )}
    </div>
  );
};

export default PrivateResultPage;
