import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "../react-big-calendar-custom.css";
import "react-datepicker/dist/react-datepicker.css"
import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import axios from "../api/axios";
import * as constants from "../constants/Constants"
import { Modal, Button } from "react-bootstrap";
import * as selection from "../constants/Selection";
import Select from 'react-select';

//import {render} from "@testing-library/react";
//import "react-big-calendar/lib/css/react-big-calendar.css"
//import "bootstrap/dist/css/bootstrap.css";

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

  const errRef = useRef();

  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");
  const [dateInfo, setDateInfo] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  //for modals
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingFailed, setBookingFailed] = useState(false);

  //for reservation request payload
  const [room, setRoom] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [activity, setActivity] = useState("");
  const [bookedBy, setBookedBy] = useState("");
  const [bookingID, setBookingID] = useState("");
  const [errorBookingMsg, setErrorBookingMsg] = useState("")
  //check if all fields are filled before enabling save button
  const areAllFieldsFilled = (date !== "") && (room !== "") && (groupName !== "") && (groupCode !== "") && (activity !== "") && (bookedBy !== "");

  //for Event Booking Modal. It will show the cancel confirmation modal
  const handleCancelConfirmation = () => {
    setCancelBooking(true)
  }
  //this will show the booking modal
  const handleShow = () => {
    setDate(format(new Date(), 'yyyy-MM-dd'))
    setShow(true)
  };
  //this will close the cancel and confirmation modal
  const handleClose = () => {
    setCancelBooking(false);
    setConfirm(false);
    setSuccess(false);
    setBookingFailed(false);
  };
  //upon hitting save button, it will show the confirmation modal
  const handleConfirmAction = () => {
    setConfirm(true)
  }
  //using the confirmation modal, it will handle saving of booking
  const handleSaveBooking = async (e) => {
    e.preventDefault();

    const data = {
      eventDate: format(date, 'yyyy-MM-dd'),
      room: room.value,
      groupName: groupName,
      groupCode: groupCode,
      activity: activity.value,
      bookedBy: bookedBy
    }

    try{
      const response = await axios.post(constants.ADD_RESERVATION_URL, data,
          {
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            }
          });

      const getResponseInfo = response.data.info;
      setBookingID(getResponseInfo.id);
      console.log("response", response)
    }catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrorBookingMsg('No Server Response');
        setBookingFailed(true);
      } else if (err.response?.status === 415) {
        setErrorBookingMsg(err.response.data.message);
        setBookingFailed(true);
      } else if (err.response?.status === 401) {
        setErrorBookingMsg(err.response.data.message);
        setBookingFailed(true);
      } else if (err.response?.status === 403) {
        setErrorBookingMsg(err.response.data.message);
        setBookingFailed(true);
      }
    }

    console.log("save", data);
    setRoom('')
    setGroupName('')
    setGroupCode('')
    setActivity('')
    setBookedBy('')

    setShow(false)
    setConfirm(false)
    setSuccess(true)
  };
  //upon hitting confirm button, it will close the main modal and cancel confirmation modal
  const handleCancelBooking = () => {
    setRoom('')
    setGroupName('')
    setGroupCode('')
    setActivity('')
    setBookedBy('')

    setCancelBooking(false)
    setShow(false)
  }

  const customStyles = {
    control: (provided: Record<string, unknown>) => ({
      ...provided,
      height: 52,
      borderWidth: '2px',
      borderStyle: 'inset',
      borderColor: 'rgb(118, 118, 118)',
      '&:hover': {
        border: '1px solid #ff8b67',
        boxShadow: '0px 0px 6px #ff8b67',
      },
      '&:focus': {
        border: '1px solid #ff8b67',
        boxShadow: '0px 0px 6px #ff8b67',
      },
    }),
  };

  useEffect(() => {
    setErrMsg('');
  }, [date]);

  // eslint-disable-next-line no-extend-native
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

function formatDate(date) {
  const options = {day: '2-digit', month: 'short', year: 'numeric'};
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  const [month, day, year] = formattedDate.split(' ');
  const monthName = month.toProperCase();

  return `${monthName} ${day} ${year}`;
}

  function getRoomName(room){
    if (room === 'room1') {
      return '5th Room 1'
    } else if (room === 'room2') {
      return '5th Room 2'
    } else if (room === 'room3') {
      return '5th Room 3'
    } else if (room === 'room4') {
      return '5th Room 4'
    } else if (room === 'sowRoom1') {
      return 'SOW Room 1'
    } else if (room === 'sowRoom2') {
      return 'SOW Room 2'
    } else {
      return ''
    }
  }

  useEffect(() => {
    axios.get(constants.GET_RESERVATION_URL + date,
        {
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          }
        }).then(res => {
          const eventInfo = res.data;
          setDateInfo(eventInfo);
          console.log(eventInfo)
    }).catch(err => {
      console.log(err)
      if (!err?.response) {
        setDateInfo([])
        setErrMsg('No Server Response');
      } else if (err.response.status === 404) {
        setDateInfo([])
        setErrMsg('No Data Found For That Date');
      } else if (err.response?.status === 415) {
        setDateInfo([])
        setErrMsg('Unsupported Media Type');
      } else if (err.response?.status === 401) {
        setDateInfo([])
        setErrMsg('Unauthorized');
      }  else if (err.response?.status === 403) {
        setDateInfo([])
        setErrMsg('NO DATE SELECTED');
      }
    })
  }, [date]); //added date to avoid infinite loop and unending execution of axios get request

  useEffect(() => {
   axios.get(constants.AVAILABILITY_URL,
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
            title: "SOW Room 1: " + eventInfo["sowRoom1"] +
                   "\nSOW Room 2: " + eventInfo["sowRoom2"] +
                   "\n5th Room 1: " + eventInfo["room1"] +
                   "\n5th Room 2: " + eventInfo["room2"],
            allDay: true,
            start: eventInfo["availableDate"],
            end: eventInfo["availableDate"]
        })))
  }).catch(err => console.log(err));
  }, []);

    return (
        <div className="Calendar-Booking">
          <div>
            <Calendar
                onSelectEvent={(data) => {
                  setDate(data.start);
                  console.log("onSelectEvent", data);
                }}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: 480, margin: "40px"}}/>
          </div>
          <div id="container">
            <p>Summary of Reservation(s) for Date: {date === ''
                ? 'NO DATE SELECTED' : formatDate(date)}</p>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
               aria-live="assertive">{errMsg}</p>
          </div>
          {dateInfo?.info?.map((info, index) => (
              <div key={index}>
                <p style={{fontWeight: "bold", marginBottom:0}}>Room: {getRoomName(
                    info["room"])}</p>
                <p style={{margin : 0, paddingTop:0}}>Booked By: {info["bookedBy"]}</p>
                <p style={{margin : 0, paddingTop:0}}>Group: {info["groupName"].toProperCase()}</p>
                <p style={{margin : 0, paddingTop:0}}>Date of Booking: {formatDate(info["bookingDate"])}</p>
                <p style={{margin : 0, paddingTop:0}}>Activity: {info["activity"].toProperCase()}</p>
                <p style={{margin : 0, paddingTop:0}}>Status: {info.status.replace(/_/g, ' ')}</p>
                <br/>
              </div>
          ))}
          <br/>
          <button onClick={handleShow}>New Event</button>
          {/*implement here the booking*/}
          <div>
            <Modal show={show} size={"lg"}>
            <Modal.Header>
              <Modal.Title>EVENT DETAILS</Modal.Title>
              <Button type={"button"} class="btn-close" onClick={handleCancelConfirmation}>x</Button>
            </Modal.Header>
              <Modal.Body>
                {/*Payload Field -> eventDate*/}
                <h5>Select Date:</h5>
                <div>
                  <DatePicker
                      dateFormat="yyyy-MM-dd"
                      placeholderText={"Event Date"}
                      style={{marginRight: "10px", outline: "none"}}
                      selected={new Date(date)}
                      onChange={(d) => setDate(d)}
                      minDate={new Date()}
                  />
                </div>
                <div style={{maxWidth: "15rem"}}>
                  {/*Payload Field -> room*/}
                  <h5 style={{marginTop: "8px"}}>Select Room:</h5>
                  <Select
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 10,
                        colors: {
                          ...theme.colors,
                          primary25: 'lightgreen',
                          primary: 'black',
                        },
                      })}
                      styles={customStyles}
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={selection.roomOption[0]}
                      isClearable
                      isSearchable
                      name="room"
                      options={selection.roomOption}
                      onChange={(roomType) => setRoom(roomType)}
                      value={room}
                  />
                </div>
                <div>
                  {/*Payload Field -> groupName*/}
                  <h5 style={{marginTop: "8px"}}>Group Name:</h5>
                  <input type={"text"} placeholder={"Group Name"}
                         style={{width: "40%", marginRight: "10px", outline: "none"}}
                         value={groupName}
                         onChange={(group) => setGroupName(group.target.value)}/>
                </div>
                <div>
                  {/*Payload Field -> groupCode*/}
                  <h5 style={{marginTop: "8px"}}>Group Code:</h5>
                  <input type={"text"} placeholder={"Group Code"}
                         style={{width: "40%", marginRight: "10px", outline: "none"}}
                         value={groupCode}
                         onChange={(code) => setGroupCode(code.target.value)}/>
                </div>
                <div style={{maxWidth: "15rem"}}>
                  {/*Payload Field -> activity*/}
                  <h5 style={{marginTop: "8px"}}>Select Activity:</h5>
                  <Select
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 10,
                        colors: {
                          ...theme.colors,
                          primary25: 'lightgreen',
                          primary: 'black',
                        },
                      })}
                      styles={customStyles}
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={selection.activityOption[0]}
                      isClearable
                      isSearchable
                      name="activity"
                      options={selection.activityOption}
                      onChange={(str) => setActivity(str)}
                      value={activity}
                  />
                </div>
                <div>
                  {/*Payload Field -> bookedBy*/}
                  <h5 style={{marginTop: "8px"}}>Booked By:</h5>
                  <input type={"text"} placeholder={"Client Name"}
                         style={{width: "40%", marginRight: "10px", outline: "none"}}
                         value={bookedBy}
                         onChange={(clientName) => setBookedBy(clientName.target.value)}/>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelConfirmation}>Cancel
                  Booking</Button>

                <Button variant="secondary"
                        onClick={handleConfirmAction}
                        disabled={!areAllFieldsFilled}
                        >Save</Button>
              </Modal.Footer>
            </Modal>

            {/*For confirmation*/}
            <Modal show={confirm} size={"sm"}>
              <Modal.Header>
                <Modal.Title>CONFIRMATION</Modal.Title>
              </Modal.Header>
              <Modal.Body>Save New Event?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveBooking}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>

            {/*For cancel booking*/}
            <Modal show={cancelBooking} size={"sm"}>
              <Modal.Header>
                <Modal.Title>Cancel Booking?</Modal.Title>
              </Modal.Header>
              <Modal.Body>You will lost all data</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCancelBooking}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>

            {/*For successful booking*/}
            <Modal show={success} size={"lg"}>
              <Modal.Header>
                <Modal.Title>Event Added Successfully</Modal.Title>
              </Modal.Header>
              <Modal.Body>Your Booking ID: {bookingID} </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/*For booking with error*/}
            <Modal show={bookingFailed} size={"lg"}>
              <Modal.Header>
                <Modal.Title>Failed Booking</Modal.Title>
              </Modal.Header>
              <Modal.Body>Error: {errorBookingMsg}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    );
}

export default CalendarBooking;