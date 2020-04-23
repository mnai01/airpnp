import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "../ErroPage/ErroPage";
import axios from "axios";
import classes from "./PrivateResultPage.module.css";
import paper from "../../assets/toilet-paper.png";
let result;
let totalScore = 0;
let avgScore = 0;
let amountOfRatings;
let numOftoilets;
let numOfIcons;

const PrivateResultPage = (props) => {
  const [temp, setTemp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Result, setResult] = useState();
  let id = useLocation();
  id = id.pathname.replace("/room/", "");
  useEffect(() => {
    if (props.privResults.length === 0) {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/Bathrooms/API/" +
            id
        )
        .then((res) => {
          setResult(res.data[0]);
          setLoading(false);
          if (res == undefined || null) {
            setTemp(false);
          } else {
            setTemp(true);
          }
        })
        .catch((err) => {
          setTemp(false);
          console.log(err);
        });
    } else {
      setLoading(false);
      setTemp(true);
    }
  }, []);

  if (props.privResults.length === 0) {
    if (temp) {
      if (Result == undefined || null) {
        console.log("in here", Result);
        setTemp(false);
        return;
      }
      console.log("returnred", Result);
      result = Result;
      console.log("resultssss", result);
      totalScore = 0;
      avgScore = 0;
      amountOfRatings = result.ratings.length;
      numOftoilets = result.num_of_toilets;
      numOfIcons = [];
      for (var i = 0; i < numOftoilets; i++) {
        numOfIcons.push(
          <img className={classes.accessories} src={paper}></img>
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
      {loading ? (
        <div>LOADING</div>
      ) : (
        <div>
          {temp ? (
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
                <h3>Reviews</h3>
                {result.ratings.map((result) => {
                  return (
                    <div>
                      <hr />
                      <h2 className={classes.title}>{result.title}</h2>
                      <p>Score: {result.score}</p>
                      <p>{result.description}</p>
                    </div>
                  );
                })}
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
