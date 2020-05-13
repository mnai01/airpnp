import React, { useState, useEffect, useCallback, useRef } from "react";
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
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import classes from "./HostBathroomPage.module.css";

const URL = "https://www.airpnpbcs430w.info/Bathrooms/Create/";
const GET_ADDRESS = "https://www.airpnpbcs430w.info/User/Addresses/FromToken/";
const POST_ADDRESS = "https://www.airpnpbcs430w.info/User/Addresses/Create/";
const POST_TIME = "https://www.airpnpbcs430w.info/Bathrooms/CreateTimeSlot/";

const HostBathroomPage = (props) => {
  const imgRef = useRef(null);
  const [image, setImage] = useState();
  const [croppedImage, setCropped] = useState(null);
  const [imageURL, setImageURL] = useState();
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [finishedCrop, setFinishedCrop] = useState(false);
  const [postStatus, setPostStatus] = useState("");
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
  const [amoutOfToilets, setAmoutOfToilets] = useState(1);
  const [mondayTimes, setMondayTimes] = useState({
    day: "Monday",
    open_time: "",
    close_time: "",
  });

  const [tuesdayTimes, setTuesdayTimes] = useState({
    day: "Tuesday",
    open_time: "",
    close_time: "",
  });

  const [wednesdayTimes, setWednesdayTimes] = useState({
    day: "Wednesday",
    open_time: "",
    close_time: "",
  });

  const [thursdayTimes, setThursdayTimes] = useState({
    day: "Thursday",
    open_time: "",
    close_time: "",
  });

  const [fridayTimes, setFridayTimes] = useState({
    day: "Friday",
    open_time: "",
    close_time: "",
  });

  const [saturdayTimes, setSaturdayTimes] = useState({
    day: "Saturday",
    open_time: "",
    close_time: "",
  });

  const [sundayTimes, setSundayTimes] = useState({
    day: "Sunday",
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
        console.log(res);
        setAddressList(results);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("catch");
      });
  }, [modal]);

  const handleSubmit = () => {
    let data;
    let config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    const fd = new FormData();

    if (croppedImage !== null) {
      fd.append("image1", croppedImage, croppedImage.name);
    } else {
      console.log("croppedImage is null");
    }

    fd.set("address_id", addressSelected.id);
    fd.set("has_shower", bathroomItems.shower);
    fd.set("has_bath", bathroomItems.bath);
    fd.set("has_sink", bathroomItems.sink);
    fd.set("num_of_toilets", amoutOfToilets);
    fd.set("has_fem_products", bathroomItems.femProducts);
    fd.set("has_toilet_paper", bathroomItems.toiletPaper);

    console.log(fd);
    for (var pair of fd.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    let configData = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      configData.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    setPostStatus("Sending...");
    axios
      .post(
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
      )
      .then((res) => {
        setPostStatus("Successful!");
        let newBathroomID = res.data.id;

        if (mondayTimes.open_time !== "" && mondayTimes.close_time !== "") {
          let mondayData = {
            bathroom_id: newBathroomID,
            week_day: mondayTimes.day,
            open_time: mondayTimes.open_time + ":00",
            close_time: mondayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, mondayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              console.log(POST_TIME, mondayData, configData);
              console.log(e);
            });
        }
        if (tuesdayTimes.open_time !== "" && tuesdayTimes.close_time !== "") {
          let tuedayData = {
            bathroom_id: newBathroomID,
            week_day: tuesdayTimes.day,
            open_time: tuesdayTimes.open_time + ":00",
            close_time: tuesdayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, tuedayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              setPostStatus(e);
              console.log(e);
            });
        }
        if (
          wednesdayTimes.open_time !== "" &&
          wednesdayTimes.close_time !== ""
        ) {
          let wednesdayData = {
            bathroom_id: newBathroomID,
            week_day: wednesdayTimes.day,
            open_time: wednesdayTimes.open_time + ":00",
            close_time: wednesdayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, wednesdayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (thursdayTimes.open_time !== "" && thursdayTimes.close_time !== "") {
          let thursdayData = {
            bathroom_id: newBathroomID,
            week_day: thursdayTimes.day,
            open_time: thursdayTimes.open_time + ":00",
            close_time: thursdayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, thursdayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (fridayTimes.open_time !== "" && fridayTimes.close_time !== "") {
          let fridayData = {
            bathroom_id: newBathroomID,
            week_day: fridayTimes.day,
            open_time: fridayTimes.open_time + ":00",
            close_time: fridayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, fridayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (saturdayTimes.open_time !== "" && saturdayTimes.close_time !== "") {
          let saturdayData = {
            bathroom_id: newBathroomID,
            week_day: saturdayTimes.day,
            open_time: saturdayTimes.open_time + ":00",
            close_time: saturdayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, saturdayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        if (sundayTimes.open_time !== "" && sundayTimes.close_time !== "") {
          let sundayData = {
            bathroom_id: newBathroomID,
            week_day: sundayTimes.day,
            open_time: sundayTimes.open_time + ":00",
            close_time: sundayTimes.close_time + ":00",
          };
          axios
            .post(POST_TIME, sundayData, configData)
            .then((e) => {
              console.log(e);
            })
            .catch((e) => {
              console.log(e);
            });
        }
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
    let number;
    let street;
    let city;
    let state;
    let zipcode;
    let country;

    if (results[0].address_components[0] === undefined) {
      number = "undefined";
    } else {
      number = results[0].address_components[0].long_name;
    }
    if (results[0].address_components[1] === undefined) {
      street = "undefined";
    } else {
      street = results[0].address_components[1].long_name;
    }
    if (results[0].address_components[2] === undefined) {
      city = "undefined";
    } else {
      city = results[0].address_components[2].long_name;
    }
    if (results[0].address_components[5] === undefined) {
      state = "undefined";
    } else {
      state = results[0].address_components[5].long_name;
    }
    if (results[0].address_components[7] === undefined) {
      zipcode = "undefined";
    } else {
      zipcode = results[0].address_components[7].long_name;
    }
    if (results[0].address_components[6] === undefined) {
      country = "undefined";
    } else {
      country = results[0].address_components[6].long_name;
    }

    setAddressComponents({
      number: number,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
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

  const handlerImageSelected = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, "newFile.jpeg");
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    setCropped(croppedImage);
  };

  const makeid = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        reader.readAsDataURL(blob);
        blob.name = fileName;
        window.URL.revokeObjectURL(imageURL);
        setImageURL(window.URL.createObjectURL(blob));
      }, "croppedURL.jpg");

      reader.onloadend = () => {
        dataURLtoFile(reader.result, "croppedURL" + makeid(7) + ".jpg");
        console.log("croppedURL" + makeid(7) + ".jpg");
      };
    });
  };

  const handleFinishedCrop = () => {
    setFinishedCrop(!finishedCrop);
    console.log(croppedImage);
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

  const checkTimes = () => {
    if (
      (mondayTimes.open_time === "" || mondayTimes.close_time === "") &&
      (tuesdayTimes.open_time === "" || tuesdayTimes.close_time === "") &&
      (wednesdayTimes.open_time === "" || wednesdayTimes.close_time === "") &&
      (thursdayTimes.open_time === "" || thursdayTimes.close_time === "") &&
      (fridayTimes.open_time === "" || fridayTimes.close_time === "") &&
      (saturdayTimes.open_time === "" || saturdayTimes.close_time === "") &&
      (sundayTimes.open_time === "" || sundayTimes.close_time === "")
    ) {
      return <h4>Please set atleast one Availability time</h4>;
    } else {
      return <Button onClick={handleSubmit}>Submit</Button>;
    }
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
                    {String(addressList) !== "No addresses for this user" ? (
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
                  <>
                    <option>Connection Error</option>
                    {console.log(addressList)}
                  </>
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
                  Save Address
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
                onChange={(e) => handleAmountOfBathrooms(e.target.value)}
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
                accept="image/*"
                id="ExampleFile"
                onChange={handlerImageSelected}
                required
              />
              <hr />
            </FormGroup>
          </Form>
          <div>
            {finishedCrop ? (
              <h1>Result</h1>
            ) : (
              <ReactCrop
                src={image}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={makeClientCrop}
              />
            )}
            {imageURL !== undefined ? (
              <img src={imageURL} alt="preview" />
            ) : (
              console.log("none")
            )}
          </div>
          <Button onClick={handleFinishedCrop}>Finished cropping</Button>
        </div>

        <div className={classes.formWrap2}>
          <hr />
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
            <Label>{postStatus}</Label>
            <FormGroup>
              {addressSelected.id === null || undefined ? (
                <h3>To Submit please pick an address</h3>
              ) : (
                checkTimes()
              )}
              {/* <Button onClick={handleSubmit}>Submit</Button> */}
            </FormGroup>
          </Form>
        </div>
      </div>
    </Aux>
  );
};

export default HostBathroomPage;
