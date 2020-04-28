import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
} from "reactstrap";
import axios from "axios";
import Aux from "../../hoc/auxHOC/auxHOC";

import classes from "./Bathroom.module.css";

const Bathroom = (props) => {
  const [file, setFile] = useState();

  const handlerFileSelected = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileUpload = () => {
    // const fd = new FormData();
    // fd.append("image", file, file.name);
    // axios
    //   .post(url, fd, {
    //     onUploadProgress: (progressEvent) => {
    //       console.log(
    //         "Upload Progress" +
    //           (progressEvent.loaded / progressEvent.total) * 100 +
    //           "%"
    //       );
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <Aux>
      <div className={classes.container}>
        <div className={classes.formWrap}>
          <Form>
            <FormGroup>
              <h1>Bathroom Registration</h1>
            </FormGroup>

            <FormGroup>
              <Label for="Address">Address</Label>
              <Input
                type="Address"
                placeholder="Enter Bathroom address"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>ZIP</Label>
              <Input type="number" placeholder="ZIP" requried />
            </FormGroup>

            <FormGroup>
              <Label>City</Label>
              <Input type="text" placeholder="City" required />
            </FormGroup>

            <FormGroup>
              <Label>State</Label>
              <Input type="text" placeholder="State" required></Input>
            </FormGroup>

            <FormGroup>
              <Label for="BathroomFeatures">
                Check all the apply for your residence:
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input type="checkbox" /> Sink
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input type="checkbox" /> Toliet Paper
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input type="checkbox" /> Shower
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input type="checkbox" /> Bath
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input type="checkbox" /> Feminine Products
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
              <input
                type="file"
                name="imageFile"
                id="ExampleFile"
                onChange={handlerFileSelected}
                required
              />
              <Button onClick={handleFileUpload}>Submit</Button>
            </FormGroup>
          </Form>
        </div>
        <div className={classes.formWrap2}>
          <Form>
            <FormGroup>
              <h1>Bathroom(s) Availability</h1>
            </FormGroup>
            <h5 for="StartTime">Monday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input
                  type="time"
                  value="22:00"
                  placeHolder="ex: 11:00 "
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>
            <h5 for="StartTime">Tuesday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input type="time" placeHolder="ex: 11:00 "></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>
            <h5 for="StartTime">Wednesday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input type="time" placeHolder="ex: 11:00 "></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>
            <h5 for="StartTime">Thursday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input type="time" placeHolder="ex: 11:00 "></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>
            <h5 for="StartTime">Friday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input type="time" placeHolder="ex: 11:00 "></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>
            <h5 for="StartTime">Saturday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input type="time" placeHolder="ex: 11:00 "></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>
            <h5 for="StartTime">Sunday</h5>
            <Row form>
              <FormGroup>
                <Label for="StartTime">Opening Time</Label>
                <Input type="time" placeHolder="ex: 11:00 "></Input>
              </FormGroup>
              <FormGroup>
                <Label for="EndTime">Closing Time</Label>
                <Input type="time" placeHolder="ex: 18:00 "></Input>
              </FormGroup>
            </Row>

            <FormGroup>
              <button>Submit</button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Aux>
  );
};

export default Bathroom;
