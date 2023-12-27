import React, {useRef, useState, useEffect} from 'react'
import useAuth from "../hooks/useAuth";
import {Link, useNavigate, useLocation} from 'react-router-dom';

import axios from '../api/axios';
import {toast, ToastContainer} from "react-toastify";

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

const LOGIN_URL = '/booking-api/v1/auth/signin';

{/* path: localhost:3000/login */}
//export default function Login({setFirstName}) {
const Login = ({setFirstName, setUserId, setAccessToken, setUserData}) => {
  const {setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  useEffect(() => {
    userRef.current?.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleToggle = () => {
    if (type==='password'){
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response  = await axios.post(LOGIN_URL,
          JSON.stringify({'userName': user, 'password': pwd}),
          {
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
            }, withCredentials: true
          });
      //data retrievers being passed to App.js
      setUserData(response.data.info);
      setFirstName(response.data.info.firstName);
      setUserId(response.data.info.id);
      console.log(response.data.info);
      const accessToken = response?.data?.accessToken;
      setAccessToken(accessToken);
      const roles = response?.data?.roles;
      setAuth({user, pwd, roles, accessToken})
      setUser('');
      setPwd('')
      toast.success("Successful Login")
      navigate(from, {replace: true});
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        toast.error("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
        toast.error("Missing Username or Password")
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
        toast.error("Unauthorized")
      } else {
        setErrMsg('Login Failed');
        toast.error("Login Failed")
      }
      errRef.current?.focus();
    }
  }

  return (
      <>
        <ToastContainer />
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
           aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-login">Username:</label>
          <input
              className="creds"
              type="text"
              id="username-login"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
          />

          <label htmlFor="password-login">Password:</label>
          <div className="password-div">
            <div className="password-input-div">
              <input className="creds"
                     type={type}
                     id="password-login"
                     onChange={(e) => setPwd(e.target.value)}
                     value={pwd}
                     required
              />
            </div>
            <div className="eye-btn-div">
              <span className="flex justify-around items-center"
                    onClick={handleToggle}>
                  <Icon id="eye-btn" class="absolute mr-10" icon={icon} size={25}/>
            </span>
            </div>
          </div>
            <button className="creds-btn">Sign In</button>
        </form>
        <p>
        Need an account?<br/>
          <span className="line">
                    <Link to="/signup">Sign Up</Link>
                </span>
        </p>
      </section>
      </>
  )
}
export default Login