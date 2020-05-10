import React, { useEffect, useState } from "react";
import axios from "axios";
import Aux from "../../hoc/auxHOC/auxHOC";
import Cookies from "js-cookie";
import classes from "./PublicUserInfoPage.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
} from "reactstrap";

const url =
  "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/User/API/getuser/";
let avgScore = 0;
let totalScore = 0;
let amountOfRatings = 0;
let bathroom = 0;
let temp;
let totalScoreForOneBathroom = [];

const PublicUserInfoPage = (props) => {
  // needed because if your in mobile view
  // and open the menu window the reviews/scoores/double
  avgScore = 0;
  totalScore = 0;
  amountOfRatings = 0;
  bathroom = 0;
  temp = null;
  totalScoreForOneBathroom = [];

  const [userInfo, setUserInfo] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [modal, setModal] = useState(false);
  let userName = useLocation().pathname.replace("/PublicUserInfo/", "");
  console.log(userName);

  const toggle = () => setModal(!modal);

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
    // if user goes back to the back before a refresh
    // these numbers need to reset
    // Needed to reset the scores back to 0 every time
    // the page is re-rendered. if not it will just keep adding
    // creating a much higher total each re-render
    avgScore = 0;
    totalScore = 0;
    amountOfRatings = 0;
    bathroom = 0;
    temp = null;
    totalScoreForOneBathroom = [];

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    axios
      .get(url + userName, config)
      .then((data) => {
        console.log(data);
        let arr = [];
        console.log(url + userName);
        const result = data.data[0];
        console.log("result", result);
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

          <hr />
          <div class={classes.iconWrap}>
            <i class="fas fa-home"></i>
            <p>Lives in </p>
            {userInfo ? (
              <span>{userInfo.home_address}</span>
            ) : (
              <Spinner size="sm" color="primary" />
            )}
          </div>
          <div class={classes.iconWrap}>
            <i class="far fa-comment-dots"></i>
            <p>{amountOfRatings} reviews</p>
          </div>
          <div class={classes.iconWrap}>
            <i class="fas fa-check-circle"></i>
            <p>Verified</p>
          </div>
          <hr />
          <h4 className={classes.userName}>
            {userName} ({totalScore.toFixed(2)}) provided
          </h4>
          <div>
            <div className={classes.iconWrap}>
              <i class="far fa-check-circle"></i>
              <p>Government ID</p>
            </div>
            <div className={classes.iconWrap}>
              <i class="far fa-check-circle"></i>
              <p>Selfie</p>
            </div>
            <div className={classes.iconWrap}>
              <i class="far fa-check-circle"></i>
              <p>Email Address</p>
            </div>
            <div className={classes.iconWrap}>
              <i class="far fa-check-circle"></i>
              <p>Phone Number</p>
            </div>
          </div>
        </div>
        <div className={classes.rightSection}>
          <h1>
            Hi, I'm{" "}
            {userInfo ? (
              <span>{userName}</span>
            ) : (
              <Spinner size="sm" color="primary" />
            )}
          </h1>
          <h3>Bathrooms</h3>
          <hr />
          {/* <div className={classes.imgTextWrap}>
            <div className={classes.bathroomRounded}>
              <img
                src="https://media.brstatic.com/2019/07/07162544/Untitled17.jpeg"
                alt=""
              />
            </div>
            <p>Bathroom name</p>
          </div> */}
          <div className={classes.imgTextWrap}>
            {bathrooms != null ? (
              bathrooms.map((e) => (
                <>
                  <Link key={e.id} to={"/PrivateBathroom/" + e.id}>
                    <p>{e.address_id.city}</p>
                  </Link>
                </>
              ))
            ) : (
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            )}
          </div>
          <hr />
          <div className={classes.reviewSection}>
            <h4>{amountOfRatings} Reviews</h4>
            <div className={classes.review}>
              {bathrooms != null ? (
                <>
                  {bathrooms.length != 0 &&
                    bathrooms.map((result, i) => (
                      <>
                        {result.ratings.length != 0 &&
                          result.ratings.map((ratings, j) => (
                            <div key={j}>
                              <hr />
                              <Link
                                key={result.id}
                                to={"/PrivateBathroom/" + result.id}
                              >
                                <h4 className={classes.title}>
                                  {ratings.title}
                                </h4>
                              </Link>
                              <p>Score: {ratings.score}</p>
                              <p>{ratings.description}</p>
                            </div>
                          ))}
                      </>
                    ))}
                </>
              ) : (
                <Spinner style={{ width: "3rem", height: "3rem" }} />
              )}
            </div>
            {/* <div className={classes.review}>
              <h6>March 2019</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                eius error iure obcaecati, in dolorum aspernatur ut ipsa
                inventore velit quos voluptatum architecto quisquam cumque quis
                voluptates exercitationem tempore labore?
              </p>
              <div className={classes.imgTextWrap}>
                <div className={classes.smallImgRounded}>
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/woman_9-512.png"
                    alt=""
                  />
                </div>
                <p>Shelly, Portland, OR</p>
              </div>
            </div>
            <hr />
            <div className={classes.review}>
              <h6>March 2019</h6>
              <p>Great Guest!</p>
              <div className={classes.imgTextWrap}>
                <div className={classes.smallImgRounded}>
                  <img
                    src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
                    alt=""
                  />
                </div>
                <p>Shelly, Portland, OR</p>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
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
            </ModalBody>
          </Modal>
        </div>
      </div>
    </Aux>
  );
};

export default PublicUserInfoPage;

// {userInfo ? (
//   <Aux>
//     <div>
//       <p>First name: {userInfo.first_name}</p>
//       <p>Last name: {userInfo.last_name}</p>
//       <p>Address: {userInfo.home_address}</p>
//       <p>Address: {userInfo.personalEmail}</p>
//       {bathrooms ? (
//         <div>
//           {bathrooms.map((res) => {
//             return (
//               <p>
//                 {res.address_id.address_line1} {res.address_id.city}{" "}
//                 {res.address_id.state} {res.address_id.zip}
//               </p>
//             );
//           })}
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//     <div></div>
//   </Aux>
// ) : (
//   <div>
//     <h1>Loading...</h1>
//   </div>
// )}
