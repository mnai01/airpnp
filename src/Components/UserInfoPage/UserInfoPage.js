import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Aux from "../../hoc/auxHOC/auxHOC";

import classes from "./UserInfoPage.module.css";

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
      <div>
        <h1>
          {Cookies.get("Username")} ({totalScore})
        </h1>
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
    </Aux>
  );
};

export default UserInfoPage;
