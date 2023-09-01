import { useNavigate } from "react-router-dom";
import fileIcon from "../assets/fileIcon.svg";
import { useContext, useEffect, useState } from "react";
import {
  deleteFilesFs,
  getAllFiles,
  getAllSharedFiles,
} from "../services/documentServices";
import LogoutComp from "../components/LogoutComp";
import { getFromLocalStorage } from "../utils/localStorageUtils";
import NavigationComp from "../components/NavigationComp";
import { TokenContext } from "../App";
import { SetTokenContext } from "../App";
import "../assets/ComponentCSS.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [fileNames, setFileNames] = useState([]);

  let fileNamesTemp = new Array();

  const [fileListState, setFileListState] = useState([]);

  const [createFileState, setCreateFileState] = useState(0);

  const [sharedFilesList, setSharedFilesList] = useState([]);

  const token = useContext(TokenContext);
  const setToken = useContext(SetTokenContext);

  function dateAndTimeFormatter(dateAndTimeString) {
    let date = dateAndTimeString.split("T")[0];
    let time = dateAndTimeString.split("T")[1];

    return `UTC ${date} ${time.split(".")[0]}`;
  }

  async function listOfFiles(authToken) {
    let res = await getAllFiles(authToken);
    if (res !== undefined) {
      if (!res.msg && res.msg !== "empty") {
        let listOfFilesTemp = res.listOfFileFs;
        listOfFilesTemp.map((element, index) => {
          let fileObject = {
            _id: element._id,
            _v: element._v,
            textData: element.textData,
            filename: element.filename,
            createdAt: dateAndTimeFormatter(element.createdAt),
            updatedAt: dateAndTimeFormatter(element.updatedAt),
            state: "0",
          };
          fileNamesTemp.push(fileObject);
        });
        setFileNames(fileNamesTemp);
        fileNamesTemp = new Array();
      }
    }
  }

  async function listOfSharedFiles(authToken) {
    let sharedFileNamesTemp = [];
    let res = await getAllSharedFiles(authToken);
    if (res !== undefined) {
      let listOfSharedFilesTemp = res.list;
      listOfSharedFilesTemp.map((element) => {
        let fileObject = {
          id: element.fileName.id,
          creator: element.primaryOwner.username,
          textData: element.fileName.textData,
          filename: element.fileName.filename,
          sharedAt: dateAndTimeFormatter(element.createdAt),
          updatedAt: dateAndTimeFormatter(element.fileName.updatedAt),
          state: "0",
        };
        sharedFileNamesTemp.push(fileObject);
      });
      setSharedFilesList(sharedFileNamesTemp);
      sharedFileNamesTemp = [];
    }
  }

  useEffect(() => {
    if (getFromLocalStorage("auth")) {
      if (getFromLocalStorage("auth").id) {
        let tokenValue = `Bearer ${getFromLocalStorage("auth").id}`;
        setToken(tokenValue);
        navigate("");
        listOfFiles(tokenValue);
        listOfSharedFiles(tokenValue);
      } else {
        setToken("");
        navigate("/auth");
      }
    } else {
      setToken("");
      navigate("/auth");
    }
  }, []);

  function filesToBeDeleted(filename) {
    let existingFile = false;

    for (let i = 0; i < fileListState.length; i++) {
      if (fileListState[i] === filename) {
        existingFile = true;
      }
    }

    if (existingFile === false) {
      const fileListTemp = [];
      fileListState.map((element, index) => {
        fileListTemp.push(element);
      });
      fileListTemp.push(filename);
      setFileListState(fileListTemp);
    } else {
      const fileList = fileListState.filter((element, index) => {
        if (element !== filename) {
          return element;
        }
      });

      setFileListState(fileList);
    }
  }

  function findElementInArray(array, element) {
    let value = array.find((e, i) => {
      if (e === element) {
        return e;
      }
    });

    return value;
  }

  function changeCss(e, element) {
    if (element.state === "1") {
      e.target.style.border = "none";
      e.target.style.boxShadow = "0px 0px 0px 0px";
      e.target.style.padding = "0px";
      element.state = "0";
    } else {
      e.target.style.border = "hidden";
      e.target.style.borderRadius = "10px";
      e.target.style.padding = "8px";
      e.target.style.boxShadow = "1px 1px 1px 1px";
      element.state = "1";
    }
  }

  function changeCssOnDoubleClick(e) {
    e.target.style.height = "10px";
    setInterval(() => {}, 2000);
  }

  function createFileCssChange(e) {
    if (createFileState === 1) {
      e.target.style.border = "none";
      e.target.style.boxShadow = "0px 0px 0px 0px";
      setCreateFileState(0);
    } else {
      e.target.style.border = "hidden";
      e.target.style.borderRadius = "10px";
      e.target.style.padding = "8px";
      e.target.style.boxShadow = "1px 1px 1px 1px";
      setCreateFileState(1);
    }
  }

  async function deleteFiles() {
    let res = await deleteFilesFs(fileListState, token);
    let listOfDeletedFiles = res.list;
    if (listOfDeletedFiles.length !== 0) {
      let newFilesArray = fileNames.filter((element, index) => {
        let value = findElementInArray(listOfDeletedFiles, element.filename);

        if (value === undefined) {
          return element;
        }
      });

      setFileNames(newFilesArray);
    } else {
    }
    let fileList = [];
    setFileListState(fileList);
  }

  return (
    <>
      <div className="btn-container">
        <NavigationComp routeToNavigateTo="edit" routeName="Edit" />
        <LogoutComp />
      </div>

      <div className="page-container">
        <>
          {sharedFilesList && sharedFilesList.length !== 0 ? (
            <div className="page">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "8px",
                }}
              >
                <h2
                  style={{
                    color: "#2874f0",
                    border: "hidden",
                    borderRadius: "10px",
                    boxShadow: "1px 1px 1px 1px",
                    padding: "8px",
                  }}
                >
                  Documents Shared With You By Others
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "8px",
                  }}
                >
                  {sharedFilesList.map((element, index) => {
                    if (element !== undefined) {
                      return (
                        <>
                          <div
                            key={index}
                            onClick={(e) => {
                              changeCss(e, element);
                            }}
                            onDoubleClick={(e) => {
                              navigate(`/edit?filename=${element.filename}`, {
                                state: {
                                  textData: element.textData,
                                  creator: element.creator,
                                  showSharedComp: 0,
                                },
                              });
                            }}
                            className="newfile-button"
                          >
                            <div className="fileicon-container-class">
                              <label
                                htmlFor="sharedFileIconImg"
                                className="fileicon-label"
                              >
                                {element.filename}
                              </label>
                              <img
                                id="sharedFileIconImg"
                                src={fileIcon}
                                width={200}
                                height={200}
                              ></img>
                            </div>
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
                                  color: "Green",
                                  border: "hidden",
                                  borderRadius: "4px",
                                  boxShadow: "1px 1px 1px 1px",
                                  maxWidth: "max-content",
                                  minWidth: "80px",
                                  margin: "8px",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "20px",
                                    color: "green",
                                    margin: "4px",
                                  }}
                                >
                                  {element.creator}
                                </p>
                              </div>
                              <div
                                style={{
                                  border: "solid",
                                  borderRadius: "10px",
                                  padding: "8px",
                                  borderWidth: "2px",
                                  color: "green",
                                }}
                              >
                                <p style={{ fontSize: "1.4vh" }}>
                                  shared at: {element.sharedAt}
                                </p>
                                <p style={{ fontSize: "1.4vh" }}>
                                  updated at: {element.updatedAt}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {fileListState.length >= 1 ? (
            <button className="delete-btn" onClick={deleteFiles}>
              <p className="btn-text">Delete Files</p>
            </button>
          ) : (
            ""
          )}

          <div className="page">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "8px",
              }}
            >
              <h2
                style={{
                  color: "#2874f0",
                  border: "hidden",
                  borderRadius: "10px",
                  boxShadow: "1px 1px 1px 1px",
                  padding: "8px",
                }}
              >
                Documents Created By You
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "8px",
                }}
              >
                <div
                  onClick={(e) => createFileCssChange(e)}
                  onDoubleClick={(e) => {
                    changeCssOnDoubleClick(e);
                    navigate(`/edit`, {
                      state: { textData: "", creator: "", showSharedComp: 0 },
                    });
                  }}
                  className="newfile-button"
                >
                  <div className="fileicon-container-class">
                    <label htmlFor="img" className="fileicon-label">
                      New File
                    </label>
                    <img id="img" src={fileIcon} width={200} height={200}></img>
                    <div style={{ margin: "4vh" }}></div>
                  </div>
                </div>
                {fileNames.map((element, index) => {
                  if (element !== undefined) {
                    return (
                      <>
                        <div
                          key={index}
                          onClick={(e) => {
                            filesToBeDeleted(element.filename);
                            changeCss(e, element);
                          }}
                          onDoubleClick={(e) => {
                            changeCssOnDoubleClick(e);
                            navigate(`/edit?filename=${element.filename}`, {
                              state: {
                                textData: "",
                                showSharedComp: 1,
                              },
                            });
                          }}
                          className="newfile-button"
                        >
                          <div className="fileicon-container-class">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <label htmlFor="img" className="fileicon-label">
                                {element.filename}
                              </label>
                              <img
                                id="img"
                                src={fileIcon}
                                width={200}
                                height={200}
                              ></img>
                              <div
                                style={{
                                  border: "solid",
                                  borderRadius: "10px",
                                  padding: "8px",
                                  borderWidth: "2px",
                                  color: "green",
                                  margin: "8px",
                                }}
                              >
                                <p style={{ fontSize: "1.4vh" }}>
                                  created at: {element.createdAt}
                                </p>
                                <p style={{ fontSize: "1.4vh" }}>
                                  updated at: {element.updatedAt}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
