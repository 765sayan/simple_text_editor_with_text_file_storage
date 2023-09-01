import { useState } from "react";
import "../assets/ComponentCSS.css";
import { register } from "../services/authServices";
import { useNavigate } from "react-router-dom";

export default function RegisterComp(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { heading } = props;

  async function sendCredentials() {
    if (username !== "" && password !== "") {
      const credentials = { username: username, password: password };
      let res = await register(credentials);
      if (res.msg) {
        setMsg(res.msg);
        return 0;
      } else {
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
        <h1>Register</h1>

        <label htmlFor="registerusername" className="fileicon-label">
          username
        </label>
        <input
          id="registerusername"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          className="auth-input"
        ></input>

        <label htmlFor="registerpassword" className="fileicon-label">
          password
        </label>
        <input
          id="registerpassword"
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
