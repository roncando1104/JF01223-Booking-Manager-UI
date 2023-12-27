import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios"
import * as util from "../util/utilities"

const USER_URL = '/booking-api/v1/records/user/';
const Profile = ({firstName, userId, accessToken}) => {
  const to = "/fallback-page";

  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userFullName, setUserFullName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [clusterGrp, setClusterGrp] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [simbahay, setSimbahay] = useState('');
  const [status, setStatus] = useState('');
  const [userName, setUserName] = useState('');


  const logout = async () => {
    setAuth({});
    navigate("/")
  }
  const goback = async () => {
    setAuth({});
    navigate(from, {replace: true});
  }

  // eslint-disable-next-line no-extend-native
  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  useEffect(() => {
    axios.get(USER_URL + userId,
        {
          headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          }
        }).then(res => {
          console.log("userData", res.data.info);
          const userDetails = res.data.info;
          setUserFullName(firstName + " " + userDetails["middleName"].substring(0, 1) + ". " + userDetails.lastName);
          setBirthdate(userDetails["birthday"]);
          setClusterGrp(userDetails["cluster"]);
          setContactNum(userDetails["contactNumber"]);
          setEmail(userDetails["emailAdd"]);
          setAddress(userDetails.address);
          setRole(userDetails.role);
          setSimbahay(userDetails["simbahayName"]);
          setStatus(userDetails.status);
          setUserName(userDetails.userName);
    }).catch(err => {
      console.log("error", err);
      if (!err?.response) {
        console.log("error-4XX", err.response);
      } else if (err.response?.status === 403) {
        navigate(to, {replace: true})
        console.log("error-403", err.response);
      }
    });
  }, []);

  return (
      <>
        <div className="user-details-display-top">
          <div className="user-details">
            <h5>Name :</h5>
            <p style={{fontSize: "2rem", fontWeight: "bold"}}>{userFullName}</p>
            <div className="birthday-label">
              <h5 style={{paddingTop: "0.5rem"}}>Birthdate :</h5>
            </div>
            <div className="birthday-value">
              <p>{util.formatDate(birthdate)}</p>
            </div>
          </div>
          <div className="photo" >
            <img className="avatar" src=".." alt=".."/>
          </div>
        </div>
        <div className="user-details-display-bottom">
          <h3 style={{marginTop: "1rem", marginLeft: "1rem"}}>User Details</h3>
          <div style={{
            width: "50rem",
            height: "25rem",
            marginLeft: "1rem",
            marginTop: "1rem"
          }}>
            <h6>Address: </h6>
            <p className="contact-details">{address}</p>
            <div className="contactNum">
              <h6 style={{marginTop: "8px"}}>Contact Number: </h6>
              <p className="contact-details">
                {util.formatPhoneNumber(contactNum)}</p>
            </div>
            <div className="emailAdd">
              <h6 style={{marginTop: "8px"}}>Email Address: </h6>
              <p className="contact-details">{email}</p>
            </div>

            <h4 style={{marginTop: "1rem", fontWeight: "bolder"}}>Groups:</h4>
            <h6 style={{marginTop: "8px"}}>Cluster Group: </h6>
            <p className="field-group">{clusterGrp.replace('-', ' ')}</p>
            <h6 style={{marginTop: "8px"}}>Simbahay Group: </h6>
            <p className="field-group">{simbahay}</p>

            <h4 style={{marginTop: "1rem"}}>Other Details:</h4>
            <h6 style={{marginTop: "8px"}}>Role: </h6>
            <p className="field-group">{util.formatRole(role)}</p>
            <h6 style={{marginTop: "8px"}}>Status: </h6>
            <p className="field-group">{status}</p>

          </div>
        </div>
      </>
  )
}

export default Profile;