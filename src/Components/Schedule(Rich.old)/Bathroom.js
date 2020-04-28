import React, { Fragment } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
} from "reactstrap";
import classes from "./Bathroom.module.css";

const Bathroom = (props) => {
  return (
    <Form>
      <div className={classes.userInfoDiv}>
        <div className={classes.formWrap}>
          <FormGroup>
            <p type="text" className={classes.Title}>
              Bathroom Registration
            </p>
          </FormGroup>
          <FormGroup>
            <Label for="Address">Address</Label>
            <input
              type="Address"
              className={classes.AddressLocation}
              placeholder="Enter Bathroom address"
              required
            />
            <br />
            <Label for="Zip">ZIP</Label>
            <input type="number" className="ZIP" placeholder="ZIP" requried />
            <br />
            <Label for="City">City</Label>
            <input type="text" className="City" placeholder="City" required />
            <br />
            <Label for="State">State</Label>
            <input
              type="text"
              className="State"
              placeholder="State"
              required
            ></input>
          </FormGroup>
          <FormGroup>
            <Label for="BathroomFeatures">
              Check all the apply for your residence:
              <br />
              <input type="checkbox" /> Sink
              <br />
              <input type="checkbox" /> Toliet Paper
              <br />
              <input type="checkbox" /> Shower
              <br />
              <input type="checkbox" /> Bath
              <br />
              <input type="checkbox" /> Feminine Products
            </Label>
          </FormGroup>

          <FormGroup>
            <Label for="AmountofBathrooms">
              How many bathrooms are available?
            </Label>
            <Input
              type="select"
              name="selectMultiple"
              id="multipleBathrooms"
              mulitple
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="BathroomImages">Upload Bathroom Picture Here:</Label>
            <br />
            <input type="file" name="imageFile" id="ExampleFile" required />
            <FormText color="muted"></FormText>
          </FormGroup>
        </div>
        <div className={classes.formWrap2}>
          <Form>
            <p className={classes.Title}>Your Bathroom(s) Availability</p>
            <Row form>
              <FormGroup>
                <label for="StartTime">Monday Opening Time</label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Monday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <Row form>
              <FormGroup>
                <label for="StartTime">Tuesday Opening Time</label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Tuesday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <Row form>
              <FormGroup>
                <label for="StartTime">Wednesday Opening Time</label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Wednesday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <Row form>
              <FormGroup>
                <label for="StartTime"> Thursday Opening Time </label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Thursday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <Row form>
              <FormGroup>
                <label for="StartTime">Friday Opening Time</label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Friday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <Row form>
              <FormGroup>
                <label for="StartTime">Saturday Opening Time</label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Saturday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <Row form>
              <FormGroup>
                <label for="StartTime">Sunday Opening Time</label>
                <input type="time" placeHolder="ex: 11:00 "></input>
              </FormGroup>
              <FormGroup>
                <label for="EndTime">Sunday Closing Time</label>
                <input type="time" placeHolder="ex: 18:00 "></input>
              </FormGroup>
            </Row>
            <FormGroup>
              <button>Submit</button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Form>
  );
};

export default Bathroom;
