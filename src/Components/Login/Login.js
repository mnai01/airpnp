import React, { useState } from "react";
import loginImg from "./login.svg";
import axios from "axios";
import Cookies from "js-cookie";

let url = "https://www.airpnpbcs430w.info/User/login/";

const Login = (props) => {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);

  const loginHandler = () => {
    setStatus("Loading...");
    axios
      .post(url, { username: login, password: password })
      .then((res) => {
        console.log(res);
        props.Auth(res.data.token);
        console.log(Cookies.get("Token") == null);
        if (res.data.token === undefined) {
          setStatus(res.data);
        } else {
          setStatus("Success");
        }
        Cookies.set("Username", res.data.username, { expires: 7 });
        Cookies.set("Token", res.data.token, { expires: 7 });
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
      {typeof status !== "object" && <p>{status}</p>}
      <div className="footer">
        <button type="button" className="btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
