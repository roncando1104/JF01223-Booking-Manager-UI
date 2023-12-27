import React from "react";
import './App.css';
import {useState} from "react";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import CalendarBooking from "./components/CalendarBooking";
import FetchData from "./components/FetchData";
import Profile from "./components/Profile";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import FallbackPage from "./components/FallbackPage"
import Logout from "./components/logout";
import UpdateAccount from "./components/UpdateAccount";
import UpdateCredentials from "./components/UpdateCredentials";
import RequestNewToken from "./components/RequestNewToken";

function App() {

  const [firstName, setFirstName] = useState('JFCM')
  const [lastName, setLastName] = useState(' - Mandaluyong')
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [userData, setUserData] = useState([]);

  return (
<>
        <Navbar firstName={firstName} setFirstName={setFirstName} userId={userId} setUserId={setUserId}/>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes*/}
            <Route path="/" element={<Home firstName={firstName} userId={userId}/>} />
            <Route path="login" element={<Login setFirstName={setFirstName} setLastName={setLastName} setUserId={setUserId} setAccessToken={setAccessToken} setUserData={setUserData}/>} />
            <Route path="profile" element={<Profile firstName={firstName} userId={userId} accessToken={accessToken}/>} />
            <Route path="fetch-data" element={<FetchData accessToken={accessToken}/>} />
            <Route path="calendar-booking" element={<CalendarBooking accessToken={accessToken} firstName={firstName} lastName={lastName}/>} />
            <Route path="fallback-page" element={<FallbackPage/>} />
            <Route path="update-account" element={<UpdateAccount userData={userData} accessToken={accessToken}/>} />
            <Route path="update-credentials" element={<UpdateCredentials />} />
            <Route path="request-new-token" element={<RequestNewToken />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
</>
  );
}

export default App;
