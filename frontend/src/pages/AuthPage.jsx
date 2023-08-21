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
      <div className="auth-page-container">
        <LoginComp />
        <RegisterComp />
      </div>
    </>
  );
}
