import React, {useState} from "react";
import '../side-nav.css'
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const SideNavbar = ({firstName}) => {

  const navigate = useNavigate();
  //to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  //toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);

  }

  const handleAccountUpdate = () => {
    if (firstName === '' || firstName === 'JFCM') {
      //implement method here to advise user to login
      toast.error("Please login to your account");
    } else {
      navigate("/update-account")
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
  }

  const handleUpdateCredentials = () => {
    if (firstName === '' || firstName === 'JFCM') {
      //implement method here to advise user to login
      toast.error("Please login to your account");
    } else {
      navigate("/update-credentials")
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
  }

  const handleRequestNewToken = () => {
    if (firstName === '' || firstName === 'JFCM') {
      //implement method here to advise user to login
      toast.error("Please login to your account");
    } else {
      navigate("/request-new-token")
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
  }

  return (
      <>
        <ToastContainer />
      <div>
        <nav className="side-nav">
          <div className="burger-menu" onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
            <div className={burger_class}></div>
          </div>
        </nav>

        <div className={menu_class}>
          <div>
            <button onClick={handleAccountUpdate} style={{
              background: "none",
              borderWidth: "0",
              color: "whitesmoke",
              fontWeight: "bolder",
              fontSize: "25px",
              fontFamily: "Nunito",
              textShadow: "2px 2px 5px black"
            }}>Update Account
            </button>
          </div>
          <div>
            <button onClick={handleUpdateCredentials} style={{
              background: "none",
              borderWidth: "0",
              color: "whitesmoke",
              fontWeight: "bolder",
              fontSize: "25px",
              fontFamily: "Nunito",
              textShadow: "2px 2px 5px black"
            }}>Update Credentials
            </button>
          </div>
          <div>
            <button onClick={handleRequestNewToken} style={{
              background: "none",
              borderWidth: "0",
              color: "whitesmoke",
              fontWeight: "bolder",
              fontSize: "25px",
              fontFamily: "Nunito",
              textShadow: "2px 2px 5px black"
            }}>Get New Token
            </button>
          </div>
        </div>
      </div>
      </>
  )
}

export default SideNavbar;