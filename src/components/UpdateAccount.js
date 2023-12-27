import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import * as util from "../util/utilities";

import {Icon} from "react-icons-kit";
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import axios from "../api/axios";
import * as constants from "../constants/Constants";
import format from "date-fns/format";

const UpdateAccount = ({userData, accessToken}) => {

  const locales = {
    "en-US": require("date-fns/locale/en-US")
  }

  //console.log("update-account", userData)
  const userRef = useRef();

  const [date, setDate] = useState("");
  const [id, setId] = useState(userData.id);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [middleName, setMiddleName] = useState(userData["middleName"]);
  const [lastName, setLastName] = useState(userData.lastName);
  const [address, setAddress] = useState(userData.address);
  const [birthday, setBirthday] = useState("");
  const [contactNum, setContactNum] = useState(userData["contactNumber"]);
  const [emailAdd, setEmailAdd] = useState(userData["emailAdd"]);
  const [clusterGrp, setClusterGrp] = useState(userData["cluster"]);
  const [clusterCode, setClusterCode] = useState(userData["clusterCode"])
  const [simbahay, setSimbahay] = useState(userData["simbahayName"]);
  const [simbahayCode, setSimbahayCode] = useState(userData["simbahayCode"])
  const [role, setRole] = useState(userData.role);
  const [status, setStatus] = useState(userData.status);
  const [userName, setUserName] = useState(userData.userName);
  const [oldPassword, setOldPassword] = useState(userData["plainPassword"]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const [typePassword, setTypePassword] = useState('password');
  const [iconPassword, setIconPassword] = useState(eyeOff);
  const [typeNewPassword, setTypeNewPassword] = useState('password');
  const [iconNewPassword, setIconNewPassword] = useState(eyeOff);
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');
  const [iconConfirmPassword, setIconConfirmPassword] = useState(eyeOff);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  //this has a bug
  function formatPhoneNumber(str) {
    // const updatedContactNum = str.length === 11 ? setContactNum("(+63)" + str.substring(1, 4)
    //     + "-" + str.substring(4, 7) + "-"
    //     + str.substring(
    //         7, 11)) : toast.warning("Only 11 digits for Phone number");
    //
    // return updatedContactNum;

    //format: (+63)917-111-2222
    //This will accept both format of (+63)917-111-2222 & 09171112222
    //When asking to input contact number, it will only accept numbers
    //Then it will format to the match regex
    const match = str.match(/^(\(\+63\))(\d{3})-(\d{3})-(\d{4})$/);

    if(str.length === 11 || (str.length === 17 && match)) {
      if(str.length === 11) {
        setContactNum("(+63)" + str.substring(1, 4)
            + "-" + str.substring(4, 7) + "-"
            + str.substring(
                7, 11));
        return true;
      }else {
        setContactNum(str);
        return true
      }
    } else {
      toast.warning("Only 11 digits for Phone number");
      setContactNum('');
      return false;
    }
  }

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    //checkPasswordFieldIsMatch();

    const data = {
      firstName : firstName,
      middleName : middleName,
      lastName : lastName,
      emailAdd : emailAdd,
      contactNumber : contactNum,
      address : address,
      birthday : format(birthday, 'yyyy-MM-dd'),
      role : role,
      status : status,
      cluster : clusterGrp,
      clusterCode : clusterCode,
      simbahayName : simbahay,
      simbahayCode : simbahayCode,
      userName : userName,
      password : oldPassword,
      newPassword : newPassword
    }

      if(!formatPhoneNumber(contactNum)){
        toast.error("error on contact number")
        setContactNum('');
      } else  if (oldPassword === newPassword) {
        toast.error("New password cannot be same with old one");
      } else if (newPassword !== confirmPassword) {
        toast.error("Password mismatch")
      } else {
        try {
          const response = await axios.put(constants.UPDATE_URL + id, data,
          {
            headers : {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            }
          });

          setFirstName('');
          setMiddleName('');
          setLastName('');
          setEmailAdd('');
          setContactNum('');
          setAddress('');
          setBirthday('');
          setRole('');
          setStatus('');
          setClusterGrp('');
          setClusterCode('');
          setSimbahay('');
          setSimbahayCode('');
          setUserName('');
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          //navigate to success page

          const getResponseInfo = response.data.info;
          console.log("response", getResponseInfo)
          toast.success("successful update")
        } catch (err) {
          console.log(err)
          if (!err?.response) {
            //do something
            toast.error("Internal Server Error")
          } else if (err.response?.status === 403) {
            toast.error("Update Forbidden")
          } else if (err.response?.status === 415 || 401) {
            toast.error("Header Error or Data not found")
          }
        }
      }
  }

  function filterNumericEntry( event ) {
    if ( event.which !== 0 && event.which !== 8 ) {
      if (event.which < 48 || event.which > 57) {
        toast.warning("Only numbers are allowed")
      }
    }
  }

  const handleTogglePassword = () => {
    if (typePassword === 'password'){
      setIconPassword(eye);
      setTypePassword('text')
    } else {
      setIconPassword(eyeOff)
      setTypePassword('password')
    }
  }

  const handleToggleNewPassword = () => {
    if (typeNewPassword === 'password'){
      setIconNewPassword(eye);
      setTypeNewPassword('text')
    } else {
      setIconNewPassword(eyeOff)
      setTypeNewPassword('password')
    }
  }

  const handleConfirmPasswordToggle = () => {
    if (typeConfirmPassword === 'password'){
      setIconConfirmPassword(eye);
      setTypeConfirmPassword('text')
    } else {
      setIconConfirmPassword(eyeOff)
      setTypeConfirmPassword('password')
    }
  }

  const handleCancelUpdate = () => {
    toast.warning("cancelling all entries")
  }

  return (
      <>
        <div style={{width: "100%", height: "100%"}}>
          <div>
            <h2 style={{
              alignContent: "center",
              marginBottom: "100rem",
              textShadow: "2px 2px 5px rgb(105,105,105)"
            }}
            >UPDATE ACCOUNT </h2>
          </div>
          <div style={{
            backgroundColor: "rgb(245,245,245)",
            height: "50rem",
            width: "60rem",
            marginTop: "-99.5rem",
            marginLeft: "8rem",
            marginRight: "8rem",
            borderRadius: "8px"
          }}>
            <form onSubmit={handleUpdateAccount}>

              {/*----FullName----*/}
              <p className="personal-details-label">PERSONAL DETAILS</p>
              <div className="name-label">
                <label htmlFor="firstname">FIRST NAME</label>
                <label htmlFor="middlename">MIDDLE NAME</label>
                <label htmlFor="lastname">LAST NAME</label>
              </div>

              <div className="name-input">
                <div id="fullname"
                     style={{width: "30rem", marginLeft: "-3rem"}}>
                  <input type="text"
                         id="firstname"
                         ref={userRef}
                         autoComplete="off"
                         onChange={(e) => setFirstName(e.target.value)}
                         value={firstName}
                         required
                         placeholder="firstname"
                  />
                </div>
                <div id="fullname" style={{
                  width: "20rem",
                  marginLeft: "440px",
                  marginTop: "-43px"
                }}>
                  <input type="text"
                         id="middlename"
                         autoComplete="off"
                         onChange={(e) => setMiddleName(e.target.value)}
                         value={middleName}
                         required
                         placeholder="middlename"
                  />
                  {/*<label id="name-label" htmlFor="middlename" style={{color: "black", width: "30rem", marginLeft: "-14rem"}}>Middle Name</label>*/}
                </div>
                <div id="fullname" style={{
                  width: "20rem",
                  marginLeft: "840px",
                  marginTop: "-43px"
                }}>
                  <input type="text"
                         id="lastname"
                         autoComplete="off"
                         onChange={(e) => setLastName(e.target.value)}
                         value={lastName}
                         required
                         placeholder="lastname"
                  />
                  {/*<label id="name-label" htmlFor="lastname" style={{color: "black", width: "30rem", marginLeft: "-13rem"}}>Last Name</label>*/}
                </div>
              </div>
              {/*---Birth-&_-Contact---*/}
              <div className="birth-contact-label">
                <label htmlFor="birthday">BIRTHDAY</label>
                <label htmlFor="contact-num">CONTACT NUMBER</label>
                <label htmlFor="email">EMAIL</label>
              </div>
              <div className="birth-contact-input">
                <div id="birth-contact">
                  <DatePicker id="birthday"
                              dateFormat="yyyy-MM-dd"
                              placeholderText="birthday"
                              selected={birthday}
                              onChange={(d) => setBirthday(d)}
                              required
                              showYearDropdown
                              dateFormatCalendar="MMMM"
                              yearDropdownItemNumber={100}
                              scrollableYearDropdown
                  />
                </div>
                <div id="birth-contact">
                  <input type="text"
                         id="contact-num"
                         autoComplete="off"
                         onChange={(e) => setContactNum(e.target.value)}
                         value={contactNum}
                         placeholder="contact"
                         required
                         onKeyPress={filterNumericEntry}
                         style={{fontSize: "18px"}}
                  />
                </div>
                <div id="birth-contact">
                  <input type="text"
                         id="email"
                         autoComplete="off"
                         onChange={(e) => setEmailAdd(e.target.value)}
                         value={emailAdd}
                         placeholder="email"
                         required
                  />
                </div>
              </div>
              {/*----Address----*/}
              <div className="address-label">
                <label htmlFor="address">ADDRESS</label>
              </div>
              <div className="address-input">
                <input type="text"
                       id="address"
                       autoComplete="off"
                       onChange={(e) => setAddress(e.target.value)}
                       value={address}
                       placeholder="address"
                       required
                />
              </div>

              {/*---Groups---*/}
              <p className="group-details-label">GROUPS</p>
              <div className="cluster-label">
                <label htmlFor="cluster-grp">CLUSTER GROUP</label>
                <label htmlFor="cluster-code">CLUSTER CODE</label>
              </div>
              <div className="cluster-input">
                <div id="cluster-grp-code">
                  <input type="text"
                         id="cluster-grp"
                         autoComplete="off"
                         onChange={(e) => setClusterGrp(e.target.value)}
                         value={clusterGrp}
                         placeholder="cluster"
                         required
                  />
                </div>
                <div id="cluster-grp-code">
                  <input type="text"
                         id="cluster-code"
                         autoComplete="off"
                         onChange={(e) => setClusterCode(e.target.value)}
                         value={clusterCode}
                         placeholder="cluster code"
                         required
                  />
                </div>
              </div>
              <div className="cluster-label">
                <label htmlFor="simbahay-grp">SIMBAHAY GROUP</label>
                <label htmlFor="simbahay-code">SIMBAHAY CODE</label>
              </div>
              <div className="cluster-input">
                <div id="cluster-grp-code">
                  <input type="text"
                         id="simbahay-grp"
                         autoComplete="off"
                         onChange={(e) => setSimbahay(e.target.value)}
                         value={simbahay}
                         placeholder="cluster"
                         required
                  />
                </div>
                <div id="cluster-grp-code">
                  <input type="text"
                         id="simbahay-code"
                         autoComplete="off"
                         onChange={(e) => setSimbahayCode(e.target.value)}
                         value={simbahayCode}
                         placeholder="cluster code"
                         required
                  />
                </div>
              </div>

              {/*---Others---*/}
              <p className="group-details-label">OTHER INFOS</p>
              <div className="cluster-label">
                <label htmlFor="role">ROLE</label>
                <label htmlFor="status">STATUS</label>
              </div>
              <div className="role-status-input">
                <div id="role-info">
                  <input type="text"
                         id="role"
                         autoComplete="off"
                         onChange={(e) => setRole(e.target.value)}
                         value={util.formatRole(role)}
                         placeholder="role"
                         required
                  />
                </div>
                <div id="status-info">
                  <input type="text"
                         id="status"
                         autoComplete="off"
                         onChange={(e) => setStatus(e.target.value)}
                         value={status}
                         placeholder="status"
                         required
                  />
                </div>
              </div>
              <div className="credential-label">
                <label htmlFor="user">USERNAME</label>
                <label htmlFor="old-password">OLD PASSWORD</label>
              </div>
              <div className="credential-input">
                <div id="username-info">
                  <input type="text"
                         id="user"
                         autoComplete="off"
                         onChange={(e) => setUserName(e.target.value)}
                         value={userName}
                         placeholder="username"
                         required
                  />
                </div>
                <div className="old-password-update-acct-div">
                  <div id="old-password-info">
                    <input type={typePassword}
                           id="old-password"
                           autoComplete="off"
                           onChange={(e) => setOldPassword(e.target.value)}
                           value={oldPassword}
                           placeholder="old password"
                           required
                    />
                  </div>
                  <div className="eye-btn-for-acct-update-div">
                    <span className="flex justify-around items-center"
                          onClick={handleTogglePassword}>
                      <Icon id="eye-btn-for-acct-update" class="absolute mr-10"
                            icon={iconPassword} size={25}/>
                    </span>
                  </div>
                </div>

                {/*<div className="password-confirm-update-acct-div">*/}
                {/*  <div id="confirm-password-info">*/}
                {/*    <input type={typeConfirmPassword}*/}
                {/*           id="confirm-password"*/}
                {/*           autoComplete="off"*/}
                {/*           onChange={(e) => setConfirmPassword(e.target.value)}*/}
                {/*           value={confirmPassword}*/}
                {/*           placeholder="confirm password"*/}
                {/*           required*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*  <div className="eye-btn-for-acct-update-password-confirm-div">*/}
                {/*    <span className="flex justify-around items-center"*/}
                {/*          onClick={handleConfirmPasswordToggle}>*/}
                {/*      <Icon id="eye-btn-for-acct-update-password-confirm"*/}
                {/*            class="absolute mr-10" icon={iconConfirmPassword}*/}
                {/*            size={25}/>*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>

              <div className="credential-label">
                <label htmlFor="new-password">NEW PASSWORD</label>
                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
              </div>

              <div className="credential-input-2">
                <div className="new-password-update-acct-div">
                  <div id="new-password-info">
                    <input type={typeNewPassword}
                           id="new-password"
                           autoComplete="off"
                           onChange={(e) => setNewPassword(e.target.value)}
                           value={newPassword}
                           placeholder="new password"
                           required
                    />
                  </div>
                  <div className="eye-btn-for-acct-update-div">
                    <span className="flex justify-around items-center"
                          onClick={handleToggleNewPassword}>
                      <Icon id="eye-btn-for-acct-update" class="absolute mr-10"
                            icon={iconNewPassword} size={25}/>
                    </span>
                  </div>
                </div>
                <div className="new-password-confirm-update-acct-div">
                  <div id="confirm-password-info">
                    <input type={typeConfirmPassword}
                           id="confirm-password"
                           autoComplete="off"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           value={confirmPassword}
                           placeholder="confirm password"
                           required
                    />
                  </div>
                  <div className="eye-btn-for-acct-update-password-confirm-div">
                    <span className="flex justify-around items-center"
                          onClick={handleConfirmPasswordToggle}>
                      <Icon id="eye-btn-for-acct-update-password-confirm"
                            class="absolute mr-10" icon={iconConfirmPassword}
                            size={25}/>
                    </span>
                  </div>
                </div>
              </div>

              {/*--Buttons--*/}
              <div className="update-button">
                <button type="button" className="cancel"
                        onClick={handleCancelUpdate}>Cancel
                </button>
                <button className="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </>
  )
}

export default UpdateAccount;