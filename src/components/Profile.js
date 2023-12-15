import {useLocation, useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios"

  const USER_URL = '/booking-api/v1/records/user/';
  const Profile = ({firstName, userId, accessToken}) => {

  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const logout = async () => {
    setAuth({});
    navigate("/")
  }
  const goback = async () => {
    setAuth({});
    navigate(from, {replace: true});
  }

  const response = axios.get(USER_URL + userId,
      {
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        }
      });

  console.log(response)

  return (
      <div>
        <h1>Profile</h1>
        <br />
        <p>Hi! {firstName}</p>
        <p>Your Id is {userId}</p>
        <br />
        <p>Go To Page 1</p>
        <br />
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
        <br />
        <div className="flexGrow">
          <button onClick={goback}>Go Back</button>
        </div>
      </div>
  )
}

export default Profile;