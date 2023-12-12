import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "../react-big-calendar-custom.css";
//import "react-big-calendar/lib/css/react-big-calendar.css"
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import axios from "../api/axios";
import {render} from "@testing-library/react";

const BOOKING_URL = '/booking-api/v1/available-dates/';

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

function CalendarBooking({accessToken}) {
  const [events, setEvents] = useState([])

  useEffect(() => {
   axios.get(BOOKING_URL + "all-dates",
      {
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        }
      }).then(res => {
        const info = res.data.info;
        //console.log(info)
        setEvents(info.map(eventInfo => ({
            title: "SOW Room 1: " + eventInfo.sowRoom1 +
                   "\nSOW Room 2: " + eventInfo.sowRoom2 +
                   "\n5th Room 1: " + eventInfo.room1 +
                   "\n5th Room 2: " + eventInfo.room2,
            allDay: true,
            start: eventInfo.availableDate,
            end: eventInfo.availableDate
        })))
  }).catch(err => console.log(err));
  }, []);

  // const info = [
  //   {
  //     "id": "20231207",
  //     "availableDate": "2023-12-07",
  //     "sowRoom1": "available",
  //     "sowRoom2": "available",
  //     "room1": "available",
  //     "room2": "available"
  //   },
  //   {
  //     "id": "20231208",
  //     "availableDate": "2023-12-08",
  //     "sowRoom1": "available",
  //     "sowRoom2": "available",
  //     "room1": "available",
  //     "room2": "available"
  //   }
  //   ]
  //
  //     const events = info.map(eventInfo => ({
  //         title: "SOW Room 1: " + eventInfo.sowRoom1 + "\nSOW Room 2: " + eventInfo.sowRoom2,
  //         start: eventInfo.availableDate,
  //         end: eventInfo.availableDate
  //     }));

    return (
        <div className="Calendar-Booking">
          <Calendar
              onSelectEvent={(data) => {
                console.log("onSelectEvent", data);//use this to show details of availabilities under calendar
                //use something like this -> const [data, setData] = useState([])
              }}
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{height: 480, margin: "50px"}}/>
        </div>
    );
  }

export default CalendarBooking;