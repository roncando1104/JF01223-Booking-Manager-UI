import React, {useContext, useState} from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import AuthContext from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import SideNavbar from "./SideNavbar";
import {fi} from "date-fns/locale";

const Navbar = ({firstName, userId, setFirstName, setUserId}) => {
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/logout")
    setFirstName('')
    setUserId('')
  }

  const signin = async () => {
    setAuth({});
    navigate("/login")
    setFirstName('');
    setUserId('')
  }

  return (
      <>
        <SideNavbar firstName={firstName}/>
        <Nav>
          <div style={{marginLeft: "1rem",  width: "15rem", paddingTop: "5px"}}>
            <h3>{firstName !== '' ? "Hi! " + firstName : ''}</h3>
            <p style={{fontSize: "18px", width: "8rem", paddingTop: "5px"}}>{userId !== '' ? "User ID: " + userId : ''}</p>
          </div>
          <Bars/>
          <NavMenu>
            <NavLink to="/">
              Home
            </NavLink>
            <NavLink to="/about">
              About
            </NavLink>
            <NavLink to="/calendar-booking" activeStyle>
              Events
            </NavLink>
            <NavLink to="/annual" activeStyle>
              Reports
            </NavLink>
            <NavLink to="/team" activeStyle>
              Teams
            </NavLink>
            <NavLink to="/profile" activeStyle>
              My Profile
            </NavLink>
            <NavLink style={{marginRight: "1rem", marginLeft: "1.5rem"}} to="/sign-up" activeStyle>
              Sign Up
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn onClick={signin}>
            <NavBtnLink to={signin}>
              Sign In
            </NavBtnLink>
          </NavBtn>
          <NavBtn onClick={logout}>
            <NavBtnLink to={logout}>
              Sign Out
            </NavBtnLink>
          </NavBtn>
        </Nav>
      </>
  );
};

export default Navbar;