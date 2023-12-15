import React from "react";
import './App.css';
import {useState} from "react";
//import FetchData from "./components/FetchData";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import CalendarBooking from "./components/CalendarBooking";
import FetchData from "./components/FetchData";
import Profile from "./components/Profile";
import { Routes, Route } from "react-router-dom";

function App() {

  const [firstName, setFirstName] = useState('JFCM')
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes*/}
          <Route path="/" element={<Home firstName={firstName} userId={userId}/>} />
          <Route path="login" element={<Login setFirstName={setFirstName} setUserId={setUserId} setAccessToken={setAccessToken}/>} />
          <Route path="profile" element={<Profile firstName={firstName} userId={userId} accessToken={accessToken}/>} />
          <Route path="fetch-data" element={<FetchData accessToken={accessToken}/>} />
          <Route path="calendar-booking" element={<CalendarBooking accessToken={accessToken}/>} />
        </Route>
      </Routes>
  );
}

export default App;
