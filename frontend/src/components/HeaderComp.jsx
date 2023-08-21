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

export default function HeaderComp(props) {
  const {
    setFontData,
    currentFontData,
    textArea,
    filename,
    setFileName,
    updateFile,
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
      const res = await updateFileData(filename, textData, authToken);
    } else {
      const res = await sendTextDataToBackend(filename, textData, authToken);

      if (res === "No Connection To Server") {
        alert("No Connection To Server");
      }
    }
  }

  return (
    <>
      <div id="header" className="header">
        <FileName filename={filename} setFileName={setFileName} />
        <button className="btn" onClick={downloadFile}>
          download
        </button>
        <button className="btn" onClick={(e) => saveData(e)}>
          Save
        </button>
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
