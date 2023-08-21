import { useNavigate } from "react-router-dom";
import fileIcon from "../assets/fileIcon.svg";
import { useContext, useEffect, useState } from "react";
import { deleteFilesFs, getAllFiles } from "../services/documentServices";
import LogoutComp from "../components/LogoutComp";
import { getFromLocalStorage } from "../utils/localStorageUtils";
import NavigationComp from "../components/NavigationComp";
import { TokenContext } from "../App";
import { SetTokenContext } from "../App";
import "../assets/ComponentCSS.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [fileNames, setFileNames] = useState([""]);

  // let fileList = new Array();

  let fileNamesTemp = new Array();

  const [fileListState, setFileListState] = useState([]);

  const [createFileState, setCreateFileState] = useState(0);

  const token = useContext(TokenContext);
  const setToken = useContext(SetTokenContext);

  async function listOfFiles(authToken) {
    let res = await getAllFiles(authToken);
    if (res !== undefined) {
      let listOfFilesTemp = res.listOfFileFs;
      listOfFilesTemp.map((element, index) => {
        let fileObject = {
          _id: element._id,
          _v: element._v,
          textData: element.textData,
          filename: element.filename,
          state: "0",
        };
        fileNamesTemp.push(fileObject);
      });
      setFileNames(fileNamesTemp);
      fileNamesTemp = new Array();
    }
  }

  useEffect(() => {
    if (getFromLocalStorage("auth")) {
      if (getFromLocalStorage("auth").id) {
        let tokenValue = `Bearer ${getFromLocalStorage("auth").id}`;
        setToken(tokenValue);
        navigate("");
        listOfFiles(tokenValue);
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
    // let existingFile = fileList.find((e, i) => {
    //   if (e === filename) {
    //     return e;
    //   }
    // });

    // if (existingFile === undefined) {
    //   fileList.push(filename);
    // } else {
    //   fileList = fileList.filter((element, index) => {
    //     if (element !== filename) {
    //       return element;
    //     }
    //   });
    // }

    // fileNames.map((element, index) => {
    //   if (element.state === "0") {
    //     fileList.push(filename);
    //   } else {
    //     fileList = fileList.filter((e, i) => {
    //       if (element.filename !== e) {
    //         return e;
    //       }
    //     });
    //   }
    // });
    // let existingFile = fileListState.find((e, i) => {
    //   if (e === filename) {
    //     return e;
    //   }
    // });

    let existingFile = false;

    for (let i = 0; i < fileListState.length; i++) {
      if (fileListState[i] === filename) {
        existingFile = true;
      }
    }

    if (existingFile === false) {
      // fileListState.push(filename);
      // const fileListTemp = fileListState.copyWithin(0, 0, fileListState.length);
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
      element.state = "0";
    } else {
      e.target.style.border = "hidden";
      e.target.style.borderRadius = "10px";
      // e.target.style.borderColor = "#2874f0";
      // e.target.style.borderWidth = "2px";
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
      // e.target.style.borderColor = "#2874f0";
      // e.target.style.borderWidth = "2px";
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
      let noFile = new Array();

      let fileObject = {
        _id: 0,
        _v: 0,
        textData: "",
        filename: "No File",
        state: "0",
      };
      noFile.push(fileObject);
      setFileNames(noFile);
    }
    fileList = [];
    setFileListState(fileList);
  }

  return (
    <>
      {fileNames.length === 0 ? (
        ""
      ) : (
        <>
          <div className="btn-container">
            <NavigationComp routeToNavigateTo="edit" routeName="Edit" />
            <LogoutComp />
          </div>

          <div className="page-container">
            {fileListState.length >= 1 ? (
              <button className="delete-btn" onClick={deleteFiles}>
                <p className="btn-text">Delete Files</p>
              </button>
            ) : (
              ""
            )}
            <div className="page">
              <div
                onClick={(e) => createFileCssChange(e)}
                onDoubleClick={(e) => {
                  changeCssOnDoubleClick(e);
                  navigate(`/edit`);
                }}
                className="newfile-button"
              >
                <div className="fileicon-container-class">
                  <label htmlFor="img" className="fileicon-label">
                    New File
                  </label>
                  <img id="img" src={fileIcon} width={200} height={200}></img>
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
                          navigate(`/edit?filename=${element.filename}`);
                        }}
                        className="newfile-button"
                      >
                        <div className="fileicon-container-class" key={index}>
                          <label
                            htmlFor="img"
                            className="fileicon-label"
                            key={index}
                          >
                            {element.filename}
                          </label>
                          <img
                            id="img"
                            src={fileIcon}
                            width={200}
                            height={200}
                          ></img>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
