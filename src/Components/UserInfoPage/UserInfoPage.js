import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Aux from "../../hoc/auxHOC/auxHOC";
import classes from "./UserInfoPage.module.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const url =
  "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/User/API/getuser/";
let avgScore = 0;
let totalScore = 0;
let amountOfRatings = 0;
let bathroom = 0;
let temp;
let totalScoreForOneBathroom = [];
const UserInfoPage = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);

  if (bathrooms != null) {
    // console.log("Bathrooms in loop", bathrooms);
    bathrooms.map((results) => {
      // console.log("this is resule", results);
      let amountOfRatingsForOneBathroom = results.ratings.length;
      amountOfRatings += results.ratings.length;
      console.log("amountOfRatings ", amountOfRatings);
      let avgScoreForOneBathroom = 0;
      results.ratings.map((res) => {
        avgScoreForOneBathroom += res.score;
        console.log("score ", res.score);
        avgScore += +res.score;
        console.log("avgScore ", avgScore);
      });
      totalScoreForOneBathroom.push(
        avgScoreForOneBathroom / amountOfRatingsForOneBathroom
      );
      console.log(totalScoreForOneBathroom);
    });
    totalScore = avgScore / amountOfRatings;
  }

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    // axios
    // .get(
    //   "https://www.airpnpbcs430w.info/User/SecureGetUserFromToken/",
    //   config
    // )
    // .then((res) => {
    //   let arr = [];
    //   const result = res.data[0];
    //   console.log("THIS IS REQUEST WITH TOKEN HEADER--", res);
    //   setUserInfo(result);
    //   result.addresses.map((res) => {
    //     arr.push(...res.bathrooms);
    //   });
    //   setBathrooms(arr);
    // });

    axios
      .get(url + Cookies.get("Username"), config)
      .then((data) => {
        console.log(data);
        let arr = [];
        console.log(url + Cookies.get("Username"));
        const result = data.data[0];
        setUserInfo(result);
        result.addresses.map((res) => {
          arr.push(...res.bathrooms);
        });
        setBathrooms(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Aux>
      <div className={classes.userInfoDiv}>
        <div className={classes.userWrap}>
          <div className={classes.imgRounded}>
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="" />
          </div>
          <h2>
            {Cookies.get("Username")} ({totalScore.toFixed(2)})
          </h2>
          {userInfo ? (
            <Aux>
              <div>
                <p>First name: {userInfo.first_name}</p>
                <p>Last name: {userInfo.last_name}</p>
                <p>Address: {userInfo.home_address}</p>
                <p>Address: {userInfo.personalEmail}</p>
                {bathrooms ? (
                  <div>
                    {bathrooms.map((res) => {
                      return (
                        <p>
                          {res.address_id.address_line1} {res.address_id.city}{" "}
                          {res.address_id.state} {res.address_id.zip}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div></div>
            </Aux>
          ) : (
            <div>
              <h1>Loading...</h1>
            </div>
          )}
        </div>
        <div className={classes.formWrap}>
          <div>
            <h5>Update User Information</h5>
          </div>
          <Form>
            <FormGroup>
              <Label for="firstname">First name</Label>
              <Input type="text" name="firstname" />
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last name</Label>
              <Input type="text" name="lastname" />
            </FormGroup>
            <FormGroup>
              <Label for="address">Street Address</Label>
              <Input type="text" name="address" />
            </FormGroup>
            <FormGroup>
              <Label for="zip">Zip Code</Label>
              <Input type="text" name="zip" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input type="email" name="email" />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Primery Phone Number</Label>
              <Input type="number" name="phone" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    </Aux>
  );
};

export default UserInfoPage;
