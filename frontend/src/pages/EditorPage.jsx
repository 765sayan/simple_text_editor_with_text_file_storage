import { useContext, useEffect, useRef, useState } from "react";
import CenterComp from "../components/CenterComp";
import HeaderComp from "../components/HeaderComp";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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

  const textDataFromHomePage = useLocation();
  useEffect(() => {
    if (getFromLocalStorage("auth")) {
      if (getFromLocalStorage("auth").id) {
        let tokenValue = getFromLocalStorage("auth").id;
        setToken(`Bearer ${tokenValue}`);

        if (
          fileName !== undefined &&
          fileName !== null &&
          textDataFromHomePage.state.textData === ""
        ) {
          let res = readFile(fileName, `Bearer ${tokenValue}`);
          res.then((res) => {
            if (res !== "No Connection To Server") {
              setFileData(res.fileData);
              setFileName(fileName);
              setUpdateFile(true);
            }
          });
        } else if (
          fileName !== undefined &&
          fileName !== null &&
          textDataFromHomePage.state.textData !== ""
        ) {
          setFileData(textDataFromHomePage.state.textData);
          setFileName(fileName);
          setUpdateFile(false);
        }
      } else {
        setToken("");
        navigate("/auth");
      }
    } else {
      setToken("");
      navigate("/auth");
    }
  }, []);

  const fileName = searchParams?.get("filename");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div className="btn-container">
          <NavigationComp routeToNavigateTo="" routeName="Files" />
          <LogoutComp />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "hidden",
            borderRadius: "10px",
            marginTop: "120px",
            marginLeft: "4px",
            marginRight: "4px",
            boxShadow: "1px 1px 1px 1px",
            minWidth: "98%",
            backgroundColor: "#ffff",
          }}
        >
          <HeaderComp
            setFontData={setFontData}
            currentFontData={fontData}
            textArea={textArea}
            filename={fileName ? fileName : filename}
            setFileName={setFileName}
            updateFile={updateFile}
            fileCreator={
              textDataFromHomePage && textDataFromHomePage.state
                ? textDataFromHomePage.state.creator
                : ""
            }
            showSharedComp={
              textDataFromHomePage && textDataFromHomePage.state
                ? textDataFromHomePage.state.showSharedComp
                : ""
            }
          />
          <CenterComp
            fontDataProp={fontData}
            textArea={textArea}
            fileData={fileData}
          />
        </div>
      </div>
    </>
  );
}
