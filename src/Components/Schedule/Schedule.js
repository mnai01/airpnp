import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import Cookies from "js-cookie";

import DatePicker, { setHours, setMinutes } from "react-datepicker";
import axios from "axios";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
let excludeTime = [];
let d = new Date();
let OpHour;
let OpMinute;
let ClHour;
let ClMinute;
let DsYear;
let DsMonth;
let DsDays;
let DsHour;
let DsMinute;
let dateSelected;
const Schedule = (props) => {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [postMessage, setPostMessage] = useState("");
  const [days, setDays] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noDatePicked, setNoDatePicked] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedDay, setselectedDay] = useState();
  const [unavailable, setUnavailable] = useState({});
  const [selectedData, setselectedData] = useState({
    open_time_hr: 0,
    open_time_min: 0,
    close_time_hr: 0,
    close_time_min: 0,
  });
  let id = useLocation();
  id = id.pathname.replace("/PrivateBathroom/", "");
  const OPEN_CLOSE_URL =
    "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/Bathrooms/DaysAvailable/" +
    id;

  const APPOINTMENT_URL =
    "https://cors-anywhere.herokuapp.com/https://www.airpnpbcs430w.info/Bathrooms/Appointments/" +
    id;

  const REGISTER_URL =
    "https://www.airpnpbcs430w.info/Bathrooms/ReserveBathroom/";

  useEffect(() => {
    axios
      .get(OPEN_CLOSE_URL)
      .then((res) => {
        setDays(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(APPOINTMENT_URL)
      .then((res) => {
        setUnavailable(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (days !== null) {
      days.map((res) => {
        // sets hours avaibale for the day selected
        // it takes the day selected by the user and then matches it with the
        // week_day variable in the days state. This days states hold 7 days
        // each day with a time of open and closing.
        // once mapped, if the day selected equals the day in days state
        //  Monday(user) ===  Monday(hosts) then take the hosts hours for that monday
        if (res.week_day === selectedDay) {
          if (res.timesAvailable !== null) {
            OpHour = res.timesAvailable.open_time.substring(0, 2);
            OpMinute = res.timesAvailable.open_time.substring(3, 5);
            ClHour = res.timesAvailable.close_time.substring(0, 2);
            ClMinute = res.timesAvailable.close_time.substring(3, 5);
            console.log("TImes ava", OpHour, OpMinute, ClHour, ClMinute);
            setselectedData({
              open_time_hr: OpHour,
              open_time_min: OpMinute,
              close_time_hr: ClHour,
              close_time_min: ClMinute,
            });
          } else {
            setselectedData({
              open_time_hr: 0,
              open_time_min: 0,
              close_time_hr: 0,
              close_time_min: 0,
            });
          }
        }
      });
      excludeTime = [];
      let month = date.getMonth();
      let day = date.getDate();
      if (date.getMonth() < 10) {
        month = String("0" + (date.getMonth() + 1));
      }
      if (date.getDate() < 10) {
        day = String("0" + date.getDate());
      }
      if (date.getHours() == 0) {
        DsHour = "00";
      } else {
        DsHour = date.getHours();
      }
      if (date.getMinutes() == 0) {
        DsMinute = "00";
      } else {
        DsMinute = date.getMinutes();
      }
      DsYear = String(date.getFullYear());
      DsMonth = month;
      DsDays = day;
      console.log("TIMERHE", DsHour, DsMinute);
      dateSelected = DsYear + DsMonth + DsDays;
      // checks if there are scheduled times for that bathroom
      if (unavailable.length !== 0) {
        console.log(unavailable.length);
        // maps each day in the scheduled table
        unavailable.map((res) => {
          // console.log(dateSelected);
          // console.log(res.date.substring(0, 10).replace(/\-/g, ""));

          // checks if any appointments match the current dateSelected
          // have to format each date to make the comparison possible
          if (res.date.substring(0, 10).replace(/\-/g, "") === dateSelected) {
            // have to format each time to make the comparison possible
            let appointmentsTime = res.date
              .substring(11, 19)
              .replace(/\:/g, "");
            let appointmentHour = appointmentsTime.substring(0, 2);
            let appointmentMinute = appointmentsTime.substring(2, 4);
            // pushes all the existing appointments to the Datepicker exclude so no one can pick it
            excludeTime.push(d.setHours(appointmentHour, appointmentMinute));
          }
        });
      }
    }
  }, [date]);

  const handleChange = (date) => {
    if (date === null) {
      setNoDatePicked(true);
      return;
    } else {
      setNoDatePicked(false);
    }
    setDate(date);
    setselectedDay(DAYS[date.getDay()]);
    console.log(date.getFullYear());
  };

  const handleSchedule = () => {
    if (date === null) {
      setNoDatePicked(true);
      return;
    } else {
      setNoDatePicked(false);
    }

    console.log(
      DsYear +
        "-" +
        DsMonth +
        "-" +
        DsDays +
        "T" +
        DsHour +
        ":" +
        DsMinute +
        ":" +
        "00"
    );
    let Token = null;
    if (Cookies.get("Token")) {
      Token = `Token ${Cookies.get("Token")}`;
    }

    let data = JSON.stringify({
      bathroom_id: String(id),
      week_day: String(DAYS[date.getDay()]),
      open_time: String(OpHour + ":" + OpMinute + ":" + "00"),
      how_long: String("00:15:00"),
      date: String(
        DsYear +
          "-" +
          DsMonth +
          "-" +
          DsDays +
          "T" +
          DsHour +
          ":" +
          DsMinute +
          ":" +
          "00"
      ),
    });
    console.log(data);
    axios
      .post(REGISTER_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: String(Token),
        },
      })
      .then((res) => {
        if (
          res.data === "Time is unavailable" ||
          res.data === "Time slot is taken" ||
          res.data === "Bathroom does not exist" ||
          res.data === "User does not exist"
        ) {
          setPostMessage(res.data);
        } else {
          setPostMessage("Your registration has been confirmed");
        }
        console.log(res.data);
      })
      .catch((err) => {
        setPostMessage(err.message);
        console.log(err.message);
      });
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <h4 type="text" className="Title">
            Reserve the Bathroom
          </h4>
        </FormGroup>

        {noDatePicked ? (
          <FormGroup>
            <Label type="text" className="Title">
              NO DATE PICKED
            </Label>
          </FormGroup>
        ) : (
          <FormGroup>
            <Label type="text" className="Title">
              please pick a date
            </Label>
          </FormGroup>
        )}

        <FormGroup>
          <FormGroup>
            <Label type="text" className="Title">
              {postMessage}
            </Label>
          </FormGroup>

          <DatePicker
            selected={date}
            onChange={(date) => handleChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            excludeTimes={excludeTime}
            minTime={d.setHours(
              selectedData.open_time_hr,
              selectedData.open_time_min
            )}
            maxTime={d.setHours(
              selectedData.close_time_hr,
              selectedData.close_time_min
            )}
            dateFormat="MM d, yyyy H:mm"
          />

          {loading ? (
            <div>loading</div>
          ) : (
            <div>
              {days.map((res, i) => (
                <div key={i}>
                  <div>
                    {res.timesAvailable === null ? (
                      <div>
                        <p>No times for {res.week_day}</p>
                      </div>
                    ) : (
                      <>
                        {res.week_day} {res.timesAvailable.open_time}{" "}
                        {res.timesAvailable.close_time}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </FormGroup>
        <FormGroup>
          <Button onClick={handleSchedule}>Request</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Schedule;
