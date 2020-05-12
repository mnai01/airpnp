import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, FormGroup, Label } from "reactstrap";
import axios from "axios";
import loginImg from "./login.svg";

const URL =
  "https://cors-anywhere.herokuapp.com/www.airpnpbcs430w.info/User/register/";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");

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

  const changeHandlerAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const changeHandlerCity = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const changeHandlerState = (e) => {
    console.log(e.target.value);
    setState(e.target.value);
  };

  const changeHandlerZipcode = (e) => {
    console.log(e.target.value);
    setZipcode(e.target.value);
  };

  const registerHandler = () => {
    setMessage("Loading...");
    axios
      .post(URL, {
        username: String(username),
        personalEmail: String(email),
        first_name: String(firstname),
        last_name: String(lastname),
        home_address: String(address),
        home_state: String(state),
        home_city: String(city),
        home_zip: String(Zipcode),
        password: String(password),
        password2: String(password),
      })
      .then((res) => {
        setMessage("Successful");
        console.log(res);
      })
      .catch((err) => {
        setMessage("Error");
        console.log(err);
      });
  };

  return (
    <div className="base-container" ref={props.containerRef}>
      <AvForm onValidSubmit={registerHandler}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <FormGroup>
            <AvField
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={changeHandlerUsername}
              required
            />
            <AvField
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              onChange={changeHandlerEmail}
              required
            />

            <AvField
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={changeHandlerPassword}
              required
            />
            <AvField
              type="text"
              label="First Name"
              name="first-name"
              placeholder="First Name"
              onChange={changeHandlerFirstName}
              required
            />
            <AvField
              label="Last name"
              type="text"
              name="last-name"
              placeholder="Last Name"
              onChange={changeHandlerLastName}
              required
            />
            <AvField
              label="Address"
              type="text"
              name="Address"
              placeholder="Address"
              onChange={changeHandlerAddress}
              required
            />

            <AvField
              label="Zipcode"
              type="number"
              name="Zipcode"
              placeholder="Zipcode"
              onChange={changeHandlerZipcode}
              required
            />

            <AvField
              label="City"
              type="text"
              name="City"
              placeholder="City"
              onChange={changeHandlerCity}
              required
            />

            <AvField
              type="select"
              name="State"
              label="State"
              helpMessage="Please select a state!"
              onChange={changeHandlerState}
              required
            >
              <option value="" selected="selected">
                Select a State
              </option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </AvField>
          </FormGroup>
          <FormGroup>
            <Button>Submit</Button>
          </FormGroup>
        </div>
        <div className="footer"></div>
        <Label>{message}</Label>
      </AvForm>
    </div>
  );
};

export default Register;
