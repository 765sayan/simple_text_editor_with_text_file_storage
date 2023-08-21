import { useContext, useEffect, useState } from "react";
import "../assets/ComponentCSS.css";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { SetTokenContext, TokenContext } from "../App";

export default function LoginComp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const token = useContext(TokenContext);
  const setToken = useContext(SetTokenContext);

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
        {msg === "" ? "" : <h2 className="fileicon-label">{msg}</h2>}
        <h1>Login</h1>
        <label htmlFor="username" className="fileicon-label">
          username
        </label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          className="auth-input"
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
          onClick={sendCredentials}
        ></input>
      </div>
    </>
  );
}
