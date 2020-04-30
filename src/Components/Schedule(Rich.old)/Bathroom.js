import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import axios from "axios";
import Aux from "../../hoc/auxHOC/auxHOC";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import classes from "./Bathroom.module.css";

const URL = "https://www.airpnpbcs430w.info/Bathrooms/Ratings/API";

const Bathroom = (props) => {
  const [file, setFile] = useState();
  const [address, setAddress] = useState("");
  const [modal, setModal] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleToggleModale = () => setModal(!modal);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latlng);
    console.log("lat: " + latlng.lat + " " + "lng: " + latlng.lng);
  };

  const handlerFileSelected = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const fd = new FormData();
    fd.append("image", file, file.name);
    fd.append("data", data);
    let data = {
      title: "title",
      tagline: "tagline",
      slug: "slug",
      body: "body",
    };

    axios
      .post(
        URL,
        fd,
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress" +
                (progressEvent.loaded / progressEvent.total) * 100 +
                "%"
            );
          },
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Label for="AmountofBathrooms">Pick an address</Label>
              <Input
                type="select"
                name="selectMultiple"
                id="multipleBathrooms"
                mulitple
              >
                <option>Address 1</option>
                <option>Address 2</option>
                <option>Address 3</option>
                <option>Address 4</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Button onClick={handleToggleModale}>Add an address</Button>
            </FormGroup>

            <Modal isOpen={modal} toggle={handleToggleModale}>
              <ModalHeader toggle={handleToggleModale}>
                Address Adding
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="Address">Address</Label>

                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div className={classes.searchBox}>
                        <Input
                          {...getInputProps({ placeholder: "Type address" })}
                        />
                        <div>{loading ? <div>...loading</div> : null}</div>
                        {suggestions.map((suggestion) => {
                          const style = {
                            backgroundColor: suggestion.active
                              ? "#41b6e6"
                              : "#fff",
                          };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { style })}
                            >
                              {suggestion.description}
                              {console.log(suggestion)}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </PlacesAutocomplete>
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
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleToggleModale}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={handleToggleModale}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            {/* <FormGroup>
              <Label for="Address">Address</Label>

              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className={classes.searchBox}>
                    <Input
                      {...getInputProps({ placeholder: "Type address" })}
                    />
                    <div>{loading ? <div>...loading</div> : null}</div>
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                          {console.log(suggestion)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </PlacesAutocomplete>
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
            </FormGroup> */}

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
