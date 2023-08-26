import LoginComp from "../components/LoginComp";
import "../assets/ComponentCSS.css";
import RegisterComp from "../components/RegisterComp";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getFromLocalStorage } from "../utils/localStorageUtils";
import { SetTokenContext } from "../App";

export default function AuthPage() {
  const navigate = useNavigate();
  const setToken = useContext(SetTokenContext);

  useEffect(() => {
    if (getFromLocalStorage("auth")) {
      if (getFromLocalStorage("auth").id) {
        let tokenValue = getFromLocalStorage("auth").id;
        setToken(`Bearer ${tokenValue}`);
        navigate("/");
      } else {
        navigate("");
      }
    } else {
      navigate("");
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ margin: "8px", color: "#6299f1" }}>
            Welcome To Text Editor App
          </h1>
          <h2 style={{ margin: "8px", color: "#2874f0" }}>Login Or Register</h2>
          <h4 style={{ margin: "8px", color: "#2874f0" }}>
            In this application you can store text files, edit them and share
            with others. Please open this application in a pc or laptop.
          </h4>
        </div>
        <div className="auth-page-container">
          <LoginComp heading="Login If You Already Have An Account" />
          <RegisterComp heading="Register If You Area New Here" />
        </div>
      </div>
    </>
  );
}
