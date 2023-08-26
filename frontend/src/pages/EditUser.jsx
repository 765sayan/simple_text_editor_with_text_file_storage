import { useContext, useEffect, useState } from "react";
import "../assets/ComponentCSS.css";
import { SetTokenContext, TokenContext } from "../App";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../services/authServices";
import NavigationComp from "../components/NavigationComp";
import LogoutComp from "../components/LogoutComp";

export default function EditUser() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [defaultUser, setDefaultUser] = useState("");
  const setToken = useContext(SetTokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (getFromLocalStorage("auth") && getFromLocalStorage("auth").id) {
      let authToken = `Bearer ${getFromLocalStorage("auth").id}`;
      setAuthToken(authToken);
      if (getFromLocalStorage("auth").username) {
        setDefaultUser(getFromLocalStorage("auth").username);
      }
    } else {
      navigate("/");
    }
  }, []);

  async function updateInfo() {
    const data = {
      username: username,
      password: password,
    };
    if (authToken !== "") {
      let res = await updateUser(data, authToken);
      if (res) {
        deleteFromLocalStorage("auth");
        setToken("Bearer ");
        navigate("/auth");
      } else {
        navigate("");
      }
    }
  }

  async function delUser() {
    if (authToken !== "") {
      let res = await deleteUser(authToken);
      if (res === "User Deleted") {
        deleteFromLocalStorage("auth");
        setToken("Bearer ");
        navigate("/auth");
      } else {
        navigate("");
      }
    }
  }

  return (
    <>
      <div className="btn-container">
        <NavigationComp routeToNavigateTo="" routeName="Files" />
        <LogoutComp />
      </div>

      <div className="page-container">
        <button className="delete-btn" onClick={delUser}>
          <p className="btn-text">Delete Account</p>
        </button>

        <div className="page">
          <label htmlFor="username" className="fileicon-label">
            username
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            defaultValue={defaultUser}
          ></input>
          <label htmlFor="password" className="fileicon-label">
            password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          ></input>
          <input
            className="auth-btn"
            type="submit"
            onClick={updateInfo}
          ></input>
        </div>
      </div>
    </>
  );
}
