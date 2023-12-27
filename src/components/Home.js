import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../context/AuthProvider";

const Home = ({firstName, userId}) => {
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate("/")
  }

  const signin = async () => {
    setAuth({});
    navigate("login")
  }

  return (
      <div style={{width: "100%", height: "100%"}}>
        <h1>Home</h1>
        <br />
        <p>Hi! {firstName}</p>
        <p>Your Id is {userId}</p>
        <br />
        <Link to="/profile">Go To Profile</Link>
        <br />
        <br />
        <Link to="/calendar-booking">Go To Booking Page</Link>
      </div>
  )
}

export default Home;