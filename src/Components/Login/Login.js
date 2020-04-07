import React, { useState } from "react";
import loginImg from "./login.svg";
import axios from "axios";

let url =
  "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/User/GetToken/";

const Login = (props) => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  const loginHandler = () => {
    axios
      .get(url + login + "/" + password)
      .then((res) => {
        console.log(res);
        props.Auth(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginChangeHandler = (e) => {
    console.log(e.target.value);
    setLogin(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <div className="header">Login</div>
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
              onChange={loginChangeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={passwordChangeHandler}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
