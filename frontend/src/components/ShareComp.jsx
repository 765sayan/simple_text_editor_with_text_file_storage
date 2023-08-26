import { useEffect, useRef, useState } from "react";
import "../assets/ComponentCSS.css";
import {
  deleteSecondOwnerService,
  getShareDocumentService,
  shareDocumentService,
} from "../services/documentServices";
import { getFromLocalStorage } from "../utils/localStorageUtils";

export default function ShareComp(props) {
  const [shareState, setShareState] = useState(false);
  const [username, setUsername] = useState("");
  const [listOfShares, setListOfShares] = useState([]);
  const [listValue, setListValue] = useState("");
  const { filename } = props;

  const [shareResponse, setSharedResponse] = useState("");

  async function getShareDocumentsFunction(token) {
    if (filename && token) {
      let res = await getShareDocumentService(filename, token);
      if (res) {
        let listOfSharesTemp = res;
        listOfSharesTemp.push("");
        setListOfShares(listOfSharesTemp);
      }
    }
  }

  useEffect(() => {
    if (getFromLocalStorage("auth") && getFromLocalStorage("auth").id) {
      getShareDocumentsFunction(`Bearer ${getFromLocalStorage("auth").id}`);
    }
  }, []);

  async function deleteSecondOwner(secondaryOwner) {
    if (getFromLocalStorage("auth") && getFromLocalStorage("auth").id) {
      if (secondaryOwner !== "" && filename) {
        let res = await deleteSecondOwnerService(
          secondaryOwner,
          `Bearer ${getFromLocalStorage("auth").id}`,
          filename
        );
        if (res) {
          if (!res.msg) {
            let listTemp = res.list;
            listTemp.push("");
            setListOfShares(listTemp);
          }
        }
      }
    }
  }

  async function shareDocument() {
    if (
      username &&
      username !== "" &&
      getFromLocalStorage("auth") &&
      getFromLocalStorage("auth").id
    ) {
      let res = await shareDocumentService(
        filename,
        `Bearer ${getFromLocalStorage("auth").id}`,
        username
      );
      if (res === "File Shared") {
        // alert("File Shared");
        setShareState(false);
        setSharedResponse(res);
      } else {
        alert(res);
      }
    }
  }

  useEffect(() => {
    if (shareResponse === "File Shared") {
      if (getFromLocalStorage("auth") && getFromLocalStorage("auth").id) {
        getShareDocumentsFunction(`Bearer ${getFromLocalStorage("auth").id}`);
      }
    }
  }, [shareResponse]);

  return (
    <>
      {listOfShares && listOfShares.length !== 0 ? (
        <div
          className="sharecomp-class"
          style={{
            border: "hidden",
            boxShadow: "1px 1px 1px 1px",
            backgroundColor: "#6299f1",
            borderRadius: "4px",
            marginTop: "0",
            marginBottom: "0",
            marginRight: "20px",
            marginLeft: "4px",
            padding: "4px",
            width: "max-content",
          }}
        >
          <label
            style={{
              fontSize: "20px",
              margin: "4px",
              width: "140px",
            }}
          >
            Document Can Be Viewed By,
          </label>
          <select
            className="header-components font-size-class"
            onChange={(e) => setListValue(e.target.value)}
          >
            {listOfShares.map((element, index) => {
              if (element === "") {
                return (
                  <option className="header-components" key={index} value={""}>
                    None
                  </option>
                );
              } else {
                return (
                  <option
                    className="header-components"
                    key={index}
                    value={element._id}
                  >
                    {element.username}
                  </option>
                );
              }
            })}
          </select>
          &nbsp;&nbsp;
          <button
            style={{
              border: "hidden",
              borderRadius: "10px",
              boxShadow: "1px 1px 1px 1px",
              fontSize: "20px",
              backgroundColor: "#6299f1",
              padding: "4px",
            }}
            onClick={() => deleteSecondOwner(listValue)}
          >
            Remove
          </button>
        </div>
      ) : (
        ""
      )}
      {shareState === false ? (
        <>
          {}
          <button className="btn" onClick={() => setShareState(true)}>
            Share Document
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          ></input>
          {username !== "" ? (
            <input
              className="auth-btn"
              type="submit"
              onClick={shareDocument}
            ></input>
          ) : (
            <button className="auth-btn" onClick={() => setShareState(false)}>
              Cancel
            </button>
          )}
        </>
      )}
    </>
  );
}
