import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "../ErroPage/ErroPage";
import Cookies from "js-cookie";
import axios from "axios";
import classes from "./PrivateResultPage.module.css";
import paper from "../../assets/toilet-paper.png";
import shower from "../../assets/shower.png";
import basin from "../../assets/basin.png";
import bath from "../../assets/bathing.png";
import { Link } from "react-router-dom";
import Schedule from "../Schedule/Schedule";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
let result;
let totalScore = 0;
let avgScore = 0;
let amountOfRatings;
let numOftoilets;
let numOfIcons;

const POST_RATING_URL =
  "https://www.airpnpbcs430w.info/Bathrooms/Ratings/Create/";

const PrivateResultPage = (props) => {
  const [userScore, setScore] = useState(1);
  const [userTitle, setUserTitle] = useState("");
  const [userReview, setUserReview] = useState("");
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

  const handleAddRating = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    let data = {
      bathroom_id: id,
      description: userReview,
      title: userTitle,
      score: userScore,
    };
    axios
      .post(POST_RATING_URL, data, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTitleChange = (e) => {
    setUserTitle(e);
  };

  const handleSetScore = (e) => {
    setScore(e);
  };

  const handleSetUserReview = (e) => {
    setUserReview(e);
  };

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
                <Link to={"/PublicUserInfo/" + result.address_id.user}>
                  <h4>Owner: {result.address_id.user}</h4>
                </Link>
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
                    <img className={classes.accessories} src={shower}></img>
                  ) : (
                    <i class="fas fa-ban"></i>
                  )}
                </p>
                <p>
                  Bath:{" "}
                  {result.has_bath ? (
                    <img className={classes.accessories} src={bath}></img>
                  ) : (
                    <i class="fas fa-ban"></i>
                  )}
                </p>
                <p>
                  Sink:{" "}
                  {result.has_sink ? (
                    <img className={classes.accessories} src={basin}></img>
                  ) : (
                    <i class="fas fa-ban"></i>
                  )}
                </p>
                <p>
                  Fem Products:{" "}
                  {result.has_fem_products ? (
                    <img className={classes.accessories} src={paper}></img>
                  ) : (
                    <i class="fas fa-heart"></i>
                  )}
                </p>
                <hr />
                <Schedule id={id} />
                <hr />
                <Form>
                  <FormGroup>
                    <h3>Title</h3>
                    <Input
                      type="text"
                      placeholder="Title"
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="AmountofBathrooms">Score</Label>
                    <Input
                      type="select"
                      name="selectMultiple"
                      id="multipleBathrooms"
                      onChange={(e) => handleSetScore(e.target.value)}
                      mulitple="true"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>

                  <h3>Reviews</h3>
                  <FormGroup>
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      onChange={(e) => handleSetUserReview(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button onClick={handleAddRating}>Submit Review</Button>
                  </FormGroup>
                </Form>

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
