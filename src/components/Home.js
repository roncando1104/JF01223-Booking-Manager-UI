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
      <div>
        <h1>Home</h1>
        <br />
        <p>Hi! {firstName}</p>
        <p>Your Id is {userId}</p>
        <br />
        <Link to="/profile">Go To Page 1</Link>
        <br />
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
        <br />
        <div className="flexGrow">
          <button onClick={signin}>Login</button>
        </div>
      </div>
  )
}

export default Home;