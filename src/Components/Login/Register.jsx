import React, { useState } from "react";
import axios from "axios";
import loginImg from "./login.svg";

const URL =
  "https://cors-anywhere.herokuapp.com/www.airpnpbcs430w.info/User/register";

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
        home_zip: "11342",
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
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={changeHandlerUsername}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={changeHandlerEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="first name">First name</label>
            <input
              type="text"
              name="first-name"
              placeholder="first name"
              onChange={changeHandlerFirstName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last name">Last name</label>
            <input
              type="text"
              name="last-name"
              placeholder="last name"
              onChange={changeHandlerLastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={changeHandlerPassword}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={registerHandler}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
