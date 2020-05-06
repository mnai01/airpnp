import React, { useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import axios from "axios";
import Aux from "../../hoc/auxHOC/auxHOC";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import classes from "./HostBathroomPage.module.css";

const URL = "https://www.airpnpbcs430w.info/Bathrooms/Create/";
const GET_ADDRESS = "https://www.airpnpbcs430w.info/User/Addresses/FromToken/";
const POST_ADDRESS = "https://www.airpnpbcs430w.info/User/Addresses/Create/";

const HostBathroomPage = (props) => {
  const [file, setFile] = useState();
  const [addressAutoComplete, setAddressAutoComplete] = useState("");
  const [addressSelected, setAddressSelected] = useState({ id: null });
  const [addressComponents, setAddressComponents] = useState({
    address2: null,
    number: 0,
    street: "default",
    city: "default",
    state: "default",
    zipcode: 0,
    country: "default",
  });
  const [addressList, setAddressList] = useState(null);
  const [modal, setModal] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [bathroomItems, setbathroomItems] = useState({
    sink: false,
    toiletPaper: false,
    shower: false,
    bath: false,
    femProducts: false,
  });
  const [amoutOfToilets, setAmoutOfToilets] = useState();
  const [mondayTimes, setMondayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  const [tuesdayTimes, setTuesdayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  const [wednesdayTimes, setWednesdayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  const [thursdayTimes, setThursdayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  const [fridayTimes, setFridayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  const [saturdayTimes, setSaturdayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  const [sundayTimes, setSundayTimes] = useState({
    open_time: "",
    close_time: "",
  });

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    console.log(GET_ADDRESS, config);
    axios
      .get(GET_ADDRESS, config)
      .then((res) => {
        let results;
        results = res.data;
        setAddressList(results);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    let data;
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    const fd = new FormData();
    // fd.append("image", file, file.name);
    data = {
      address_id: addressSelected.id,
      has_shower: bathroomItems.shower,
      has_bath: bathroomItems.bath,
      has_sink: bathroomItems.sink,
      num_of_toilets: amoutOfToilets,
      has_fem_products: bathroomItems.femProducts,
      has_toilet_paper: bathroomItems.toiletPaper,
    };
    fd.append("data", data);

    console.log(
      URL,
      fd,
      // {
      //   onUploadProgress: (progressEvent) => {
      //     console.log(
      //       "Upload Progress " +
      //         (progressEvent.loaded / progressEvent.total) * 100 +
      //         "%"
      //     );
      //   },
      // },
      config
    );
    axios
      .post(
        URL,
        fd,
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress " +
                (progressEvent.loaded / progressEvent.total) * 100 +
                "%"
            );
          },
        },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleModale = () => setModal(!modal);

  const handleAddAddAddress = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    let data = JSON.stringify({
      address_line1: addressAutoComplete,
      address_line2: String(addressComponents.address2),
      city: addressComponents.city,
      state: addressComponents.state,
      zip: addressComponents.zipcode,
      longitude: coordinates.lng,
      latitude: coordinates.lat,
    });

    axios
      .post(POST_ADDRESS, data, config)
      .then((res) => {
        console.log(res);
        handleToggleModale();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectedAutoCompleteAddress = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results[0]);
    const latlng = await getLatLng(results[0]);
    setAddressComponents({
      number: results[0].address_components[0].long_name,
      street: results[0].address_components[1].long_name,
      city: results[0].address_components[2].long_name,
      state: results[0].address_components[5].long_name,
      zipcode: results[0].address_components[7].long_name,
      country: results[0].address_components[6].long_name,
    });
    // results[0].address_components;
    setAddressAutoComplete(value);
    setCoordinates(latlng);
    console.log("lat: " + latlng.lat + " " + "lng: " + latlng.lng);
  };

  const handleAddressPicked = (event) => {
    const AddressIndex = addressList.findIndex((i) => {
      return i.address_line1 === event;
    });
    console.log(addressList[AddressIndex]);
    setAddressSelected(addressList[AddressIndex]);
  };

  const handleAddress2Change = (event) => {
    console.log(event);
    setAddressComponents((prevState) => {
      return { ...prevState, address2: event };
    });
  };

  const handleCityChange = (event) => {
    console.log(event);
    setAddressComponents((prevState) => {
      return { ...prevState, city: event };
    });
  };

  const handleStateChange = (event) => {
    console.log(event);
    setAddressComponents((prevState) => {
      return { ...prevState, state: event };
    });
  };

  const handleZipChange = (event) => {
    console.log(event);
    setAddressComponents((prevState) => {
      return { ...prevState, zipcode: event };
    });
  };

  const handlerFileSelected = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleBathroomItemsSink = (event) => {
    console.log(event);
    setbathroomItems((prevState) => {
      return { ...prevState, sink: !bathroomItems.sink };
    });
  };

  const handleBathroomItemsToiletPaper = (event) => {
    console.log(event);
    setbathroomItems((prevState) => {
      return { ...prevState, toiletPaper: !bathroomItems.toiletPaper };
    });
  };

  const handleBathroomItemsShower = (event) => {
    console.log(event);
    setbathroomItems((prevState) => {
      return { ...prevState, shower: !bathroomItems.shower };
    });
  };

  const handleBathroomItemsBath = (event) => {
    console.log(event);
    setbathroomItems((prevState) => {
      return { ...prevState, bath: !bathroomItems.bath };
    });
  };

  const handleBathroomItemsFemProd = (event) => {
    console.log(event);
    setbathroomItems((prevState) => {
      return { ...prevState, femProducts: !bathroomItems.femProducts };
    });
  };

  const handleAmountOfBathrooms = (event) => {
    console.log(event);
    setAmoutOfToilets(event);
  };

  const handleMondayTimeOpen = (event) => {
    console.log(event);
    setMondayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleMondayTimeClose = (event) => {
    console.log(event);
    setMondayTimes((prevState) => {
      return { ...prevState, close_time: event };
    });
  };

  const handleTuesdayTimeOpen = (event) => {
    console.log(event);
    setTuesdayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleTuesdayTimeClose = (event) => {
    console.log(event);
    setTuesdayTimes((prevState) => {
      return { ...prevState, close_time: event };
    });
  };
  const handleWednesdayTimeOpen = (event) => {
    console.log(event);
    setWednesdayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleWednesdayTimeClose = (event) => {
    console.log(event);
    setWednesdayTimes((prevState) => {
      return { ...prevState, close_time: event };
    });
  };
  const handleThursdayTimeOpen = (event) => {
    console.log(event);
    setThursdayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleThursdayTimeClose = (event) => {
    console.log(event);
    setThursdayTimes((prevState) => {
      return { ...prevState, close_time: event };
    });
  };
  const handleFridayTimeOpen = (event) => {
    console.log(event);
    setFridayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleFridayTimeClose = (event) => {
    console.log(event);
    setFridayTimes((prevState) => {
      return { ...prevState, close_time: event };
    });
  };
  const handleSaturdayTimeOpen = (event) => {
    console.log(event);
    setSaturdayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleSaturdayTimeClose = (event) => {
    console.log(event);
    setSaturdayTimes((prevState) => {
      return { ...prevState, close_time: event };
    });
  };
  const handleSundayTimeOpen = (event) => {
    console.log(event);
    setSundayTimes((prevState) => {
      return { ...prevState, open_time: event };
    });
  };

  const handleSundayTimeClose = (event) => {
    console.log(event);
    setSundayTimes((prevState) => {
      return { ...prevState, close_time: event };
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
                onChange={(e) => handleAddressPicked(e.target.value)}
                mulitple="true"
              >
                {addressList !== null ? (
                  <>
                    {console.log(addressList)}
                    {addressList !== "No Addresses for User" ? (
                      <>
                        {<option>Please Pick a bathroom...</option>}}
                        {addressList.map((res, i) => (
                          <option key={i}>{res.address_line1}</option>
                        ))}
                      </>
                    ) : (
                      <option>None please create an address</option>
                    )}
                  </>
                ) : (
                  <option>Connection Error</option>
                )}
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
                  <Label for="Address">Address 1</Label>

                  <PlacesAutocomplete
                    value={addressAutoComplete}
                    onChange={setAddressAutoComplete}
                    onSelect={handleSelectedAutoCompleteAddress}
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
                  <Label>Address 2</Label>
                  <Input
                    type="text"
                    placeholder="apt #"
                    onChange={(e) => handleAddress2Change(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    placeholder="Apt #"
                    value={addressComponents.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="text"
                    placeholder="State"
                    value={addressComponents.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    required
                  ></Input>
                </FormGroup>

                <FormGroup>
                  <Label>ZIP</Label>
                  <Input
                    type="text"
                    placeholder="ZIP"
                    value={addressComponents.zipcode}
                    onChange={(e) => handleZipChange(e.target.value)}
                    requried
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleAddAddAddress}>
                  Do Something
                </Button>
                <Button color="secondary" onClick={handleToggleModale}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>

            <FormGroup>
              <Label for="BathroomFeatures">
                Check all the apply for your residence:
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input
                  checked={bathroomItems.sink}
                  type="checkbox"
                  onChange={handleBathroomItemsSink}
                />
                Sink
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input
                  checked={bathroomItems.toiletPaper}
                  type="checkbox"
                  onChange={handleBathroomItemsToiletPaper}
                />
                Toliet Paper
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input
                  checked={bathroomItems.shower}
                  type="checkbox"
                  onChange={handleBathroomItemsShower}
                />
                Shower
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input
                  checked={bathroomItems.bath}
                  type="checkbox"
                  onChange={handleBathroomItemsBath}
                />
                Bath
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label for="BathroomFeatures">
                <Input
                  checked={bathroomItems.femProducts}
                  type="checkbox"
                  onChange={handleBathroomItemsFemProd}
                />
                Feminine Products
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
                onChange={(e) => console.log(e.target.value)}
                mulitple="true"
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
              <Button onClick={handleSubmit}>Submit</Button>
            </FormGroup>
          </Form>
        </div>
        <div className={classes.formWrap2}>
          <Form>
            <FormGroup>
              <h1>Bathroom(s) Availability</h1>
            </FormGroup>
            <h5>Monday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00"
                  onChange={(e) => handleMondayTimeOpen(e.target.value)}
                  value={mondayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleMondayTimeClose(e.target.value)}
                  value={mondayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>
            <h5>Tuesday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00 "
                  onChange={(e) => handleTuesdayTimeOpen(e.target.value)}
                  value={tuesdayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleTuesdayTimeClose(e.target.value)}
                  value={tuesdayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>
            <h5>Wednesday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00"
                  onChange={(e) => handleWednesdayTimeOpen(e.target.value)}
                  value={wednesdayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleWednesdayTimeClose(e.target.value)}
                  value={wednesdayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>
            <h5>Thursday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00 "
                  onChange={(e) => handleThursdayTimeOpen(e.target.value)}
                  value={thursdayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleThursdayTimeClose(e.target.value)}
                  value={thursdayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>
            <h5>Friday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00 "
                  onChange={(e) => handleFridayTimeOpen(e.target.value)}
                  value={fridayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleFridayTimeClose(e.target.value)}
                  value={fridayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>
            <h5>Saturday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00 "
                  onChange={(e) => handleSaturdayTimeOpen(e.target.value)}
                  value={saturdayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleSaturdayTimeClose(e.target.value)}
                  value={saturdayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>
            <h5>Sunday</h5>
            <Row form>
              <FormGroup>
                <Label>Opening Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 11:00 "
                  onChange={(e) => handleSundayTimeOpen(e.target.value)}
                  value={sundayTimes.open_time}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Closing Time</Label>
                <Input
                  type="time"
                  placeholder="ex: 18:00 "
                  onChange={(e) => handleSundayTimeClose(e.target.value)}
                  value={sundayTimes.close_time}
                ></Input>
              </FormGroup>
            </Row>

            <FormGroup>
              <Button>Submit</Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Aux>
  );
};

export default HostBathroomPage;
