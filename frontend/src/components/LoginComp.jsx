import { useContext, useEffect, useState } from "react";
import "../assets/ComponentCSS.css";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { SetTokenContext, TokenContext } from "../App";

export default function LoginComp(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const token = useContext(TokenContext);
  const setToken = useContext(SetTokenContext);

  const { heading } = props;

  async function sendCredentials() {
    if (username !== "" && password !== "") {
      const credentials = { username: username, password: password };
      let res = await login(credentials);
      if (res.msg) {
        setMsg(res.msg);
        return 0;
      } else {
        setToken(`Bearer ${res.token}`);
        navigate("/");
      }
    } else {
      alert("set credentials");
    }
  }
  return (
    <>
      <div className="auth-page">
        <div style={{ margin: "8px" }}>{heading}</div>
        {msg === "" ? "" : <h2 className="fileicon-label">{msg}</h2>}
        <h1>Login</h1>

        <label htmlFor="loginusername" className="fileicon-label">
          username
        </label>
        <input
          id="loginusername"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          className="auth-input"
        ></input>

        <label htmlFor="loginpassword" className="fileicon-label">
          password
        </label>
        <input
          id="loginpassword"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        ></input>

        <input
          className="auth-btn"
          type="submit"
          onClick={sendCredentials}
        ></input>
      </div>
    </>
  );
}
