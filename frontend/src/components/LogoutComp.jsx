import { useContext, useEffect, useState } from "react";
import "../assets/ComponentCSS.css";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { SetTokenContext } from "../App";

export default function LogoutComp() {
  const [username, setUserName] = useState("");
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const setToken = useContext(SetTokenContext);

  useEffect(() => {
    if (getFromLocalStorage("auth")) {
      const username = getFromLocalStorage("auth").username;
      setUserName(username);
    }
  }, []);

  function logout() {
    deleteFromLocalStorage("auth");
    setToken("Bearer ");
    navigate("/auth");
  }

  function setLogoutBtnAppearance() {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  }

  function navigateToEditUser() {
    navigate("/user");
  }

  return (
    <>
      <div className="logout-comp">
        <h2 onClick={setLogoutBtnAppearance} className="username-class">
          {username}
        </h2>
        {click === true ? (
          <div className="logout-comp-container">
            <button className="logout-btn" onClick={navigateToEditUser}>
              Edit Account
            </button>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="logout-btn-hidden" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </>
  );
}
