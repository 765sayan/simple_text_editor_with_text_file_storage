import { useContext, useEffect, useState } from "react";
import { DOWNLOAD_DOCUMENT_FILE_URL } from "../apiUrls/documentApiUrls";
import "../assets/ComponentCSS.css";

import {
  downloadFileService,
  sendTextDataToBackend,
  updateFileData,
} from "../services/documentServices";
import FileName from "./FileName";
import { TokenContext } from "../App";
import fileDownload from "js-file-download";
import ShareComp from "./ShareComp";

export default function HeaderComp(props) {
  const {
    setFontData,
    currentFontData,
    textArea,
    filename,
    setFileName,
    updateFile,
    fileCreator,
    showSharedComp,
  } = props;

  const [authToken, setAuthToken] = useState("");

  const token = useContext(TokenContext);
  useEffect(() => {
    if (token !== "") {
      setAuthToken(token);
    }
  }, [token]);

  const listOfFontSizes = ["10", "18", "20", "28", "40", "65", "70"];

  function setFontSize(e) {
    let fontSize = e.target.value;
    setFontData({ ...currentFontData, fontSize: fontSize });
  }

  async function downloadFile() {
    let tokenToBeSent = "";
    if (authToken) {
      tokenToBeSent = authToken;
    } else {
      return "";
    }

    let res = await downloadFileService(filename, tokenToBeSent);
    fileDownload(res.textdata, filename);
  }

  async function saveData(e) {
    const textData = textArea.current.value;
    if (updateFile === true) {
      if (textData !== "") {
        const res = await updateFileData(filename, textData, authToken);
      } else {
        const res = await updateFileData(filename, "", authToken);
      }
    } else {
      if (textData !== "" || textData !== undefined) {
        const res = await sendTextDataToBackend(filename, textData, authToken);
      }

      if (res === "No Connection To Server") {
        alert("No Connection To Server");
      }
    }
  }

  return (
    <>
      <div id="header" className="header">
        {fileCreator ? (
          <h2
            style={{
              border: "solid",
              borderColor: "#2874f0",
              borderRadius: "10px",
              backgroundColor: "#fff",
              fontSize: "20px",
              minWidth: "100px",
              maxWidth: "120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px",
              marginRight: "20px",
              marginLeft: "20px",
            }}
          >
            <h4>Creator: </h4>
            <h8 style={{ color: "#6299f1" }}>{fileCreator}</h8>
          </h2>
        ) : (
          ""
        )}
        <FileName filename={filename} setFileName={setFileName} />
        {showSharedComp && showSharedComp === 1 ? (
          <button className="btn" onClick={downloadFile}>
            download
          </button>
        ) : (
          ""
        )}
        {showSharedComp && showSharedComp === 1 ? (
          <button className="btn" onClick={(e) => saveData(e)}>
            Save Updates
          </button>
        ) : (
          <button className="btn" onClick={(e) => saveData(e)}>
            Create File
          </button>
        )}
        {showSharedComp && showSharedComp === 1 ? (
          <ShareComp filename={filename} />
        ) : (
          ""
        )}
        <div className="font-components-class">
          <label className="header-components font-size-label-class">
            Font Size
          </label>
          <select
            className="header-components font-size-class"
            onChange={(e) => setFontSize(e)}
            defaultValue={20}
          >
            {listOfFontSizes.map((element, index) => {
              return (
                <option className="header-components" key={index}>
                  {element}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}
