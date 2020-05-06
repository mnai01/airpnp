import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import loginImg from "./login.svg";

const URL =
  "https://cors-anywhere.herokuapp.com/www.airpnpbcs430w.info/User/register/";

const Register = (props) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);

  const changeHandlerUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const changeHandlerEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const changeHandlerPassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const changeHandlerFirstName = (e) => {
    console.log(e.target.value);
    setFirstname(e.target.value);
  };

  const changeHandlerLastName = (e) => {
    console.log(e.target.value);
    setLastname(e.target.value);
  };

  const registerHandler = () => {
    axios
      .post(URL, {
        username: username,
        personalEmail: email,
        first_name: firstname,
        last_name: lastname,
        home_address: "Yo Mama ave 12231",
        home_state: "NY",
        home_city: "Lindenhurst",
        home_zip: 11342,
        password: String(password),
        password2: String(password),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <AvForm>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <AvField
              label="Username"
              type="text"
              name="username"
              placeholder="username"
              onChange={changeHandlerUsername}
              required
            />
            <AvField
              type="email"
              name="email"
              placeholder="email"
              label="Email"
              onChange={changeHandlerEmail}
              required
            />
            <AvField
              type="text"
              label="First Name"
              name="first-name"
              placeholder="first name"
              onChange={changeHandlerFirstName}
              required
            />
            <AvField
              label="Last name"
              type="text"
              name="last-name"
              placeholder="last name"
              onChange={changeHandlerLastName}
              required
            />
            <AvField
              label="Password"
              type="password"
              name="password"
              placeholder="password"
              onChange={changeHandlerPassword}
              required
            />
          </div>
        </div>
        <div className="footer">
          <Button type="button" className="btn" onClick={registerHandler}>
            Register
          </Button>
        </div>
      </AvForm>
    </div>
  );
};

export default Register;
