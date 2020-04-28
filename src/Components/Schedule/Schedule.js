import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";
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
  const [excludeTime1, setexcludeTime1] = useState(null);
  const [days, setDays] = useState(null);
  const [loading, setLoading] = useState(true);
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
    "Bathrooms/ReserveBathroom/<int:bathroom_id>/<str:week_day>/<open_time>/<date>/<how_long>/";

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
          if (res.timesAvailable.length !== 0) {
            OpHour = res.timesAvailable[0].open_time.substring(0, 2);
            OpMinute = res.timesAvailable[0].open_time.substring(3, 5);
            ClHour = res.timesAvailable[0].close_time.substring(0, 2);
            ClMinute = res.timesAvailable[0].close_time.substring(3, 5);
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
      if (date.getMonth() < 10) {
        month = String("0" + (date.getMonth() + 1));
      }
      DsYear = String(date.getFullYear());
      DsMonth = month;
      DsDays = String(date.getDate());
      dateSelected = DsYear + DsMonth + DsDays;
      // checks if there are scheduled times for that bathroom
      if (unavailable.length !== 0) {
        console.log(unavailable.length);
        // maps each day in the scheduled table
        unavailable.map((res) => {
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
    setDate(date);
    setselectedDay(DAYS[date.getDay()]);
    console.log(date.getFullYear());
  };

  const handleSchedule = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (Cookies.get("Token")) {
      config.headers["Authorization"] = `Token ${Cookies.get("Token")}`;
    }

    axios
      .post(REGISTER_URL, {
        bathroom_id: id,
        week_day: DAYS[days.getDay()],
        Authorization: Cookies.get("Token"),
        open_time: OpHour + ":" + OpMinute + ":" + "00",
        how_long: 15,
        date: DsYear + "-" + DsMonth + "-" + DsDays,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p type="text" className="Title">
        Reserve the Bathroom
      </p>
      <DatePicker
        selected={date}
        onChange={(date) => handleChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
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
                {res.timesAvailable.map((innerRes, ind) => (
                  <div key={ind}>
                    {res.week_day} {innerRes.open_time} {innerRes.close_time}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Button>Request</Button>
    </div>
  );
};

export default Schedule;
