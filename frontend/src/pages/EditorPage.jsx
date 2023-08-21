import { useContext, useEffect, useRef, useState } from "react";
import CenterComp from "../components/CenterComp";
import HeaderComp from "../components/HeaderComp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { readFile } from "../services/documentServices";
import { getFromLocalStorage } from "../utils/localStorageUtils";
import LogoutComp from "../components/LogoutComp";
import NavigationComp from "../components/NavigationComp";
import { TokenContext } from "../App";
import { SetTokenContext } from "../App";

export default function EditorPage() {
  const [fontData, setFontData] = useState({ fontFamily: "", fontSize: "" });
  const textArea = useRef(null);
  const [filename, setFileName] = useState("Untitled.txt");
  const [updateFile, setUpdateFile] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [fileData, setFileData] = useState("");

  const navigate = useNavigate();

  const token = useContext(TokenContext);
  const setToken = useContext(SetTokenContext);

  useEffect(() => {
    if (getFromLocalStorage("auth")) {
      if (getFromLocalStorage("auth").id) {
        let tokenValue = getFromLocalStorage("auth").id;
        setToken(`Bearer ${tokenValue}`);
        navigate("");
      } else {
        setToken("");
        navigate("/auth");
      }
    } else {
      setToken("");
      navigate("/auth");
    }

    setInterval(() => {}, 400);
  }, []);

  const fileName = searchParams?.get("filename");

  if (fileName !== undefined && fileName !== null) {
    let res = readFile(fileName, token);
    res.then((res) => {
      if (res !== "No Connection To Server") {
        setFileData(res.fileData);
        setFileName(fileName);
        setUpdateFile(true);
      }
    });
  }

  return (
    <>
      <div className="btn-container">
        <NavigationComp routeToNavigateTo="" routeName="Files" />
        <LogoutComp />
      </div>
      <HeaderComp
        setFontData={setFontData}
        currentFontData={fontData}
        textArea={textArea}
        filename={filename}
        setFileName={setFileName}
        updateFile={updateFile}
      />
      <CenterComp
        fontDataProp={fontData}
        textArea={textArea}
        fileData={fileData}
      />
    </>
  );
}
