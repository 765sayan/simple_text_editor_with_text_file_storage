import { useEffect, useRef, useState } from "react";
import "../assets/ComponentCSS.css";

export default function FileName(props) {
  const { filename, setFileName } = props;
  const fileNameCompRef = useRef(null);
  const divCompRef = useRef(null);

  const [writeState, setWriteState] = useState(false);

  function setFileNameFunction(e) {
    setFileName(e.target.value);
  }

  function handleClickOutside(e) {
    if (fileNameCompRef !== null) {
      if (!fileNameCompRef.current.contains(e.target)) {
        setWriteState(false);
      } else {
        setWriteState(true);
      }
    }
  }

  useEffect(() => {
    divCompRef.current.addEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <>
      <div ref={divCompRef}>
        {/* <h4 className="filename-text">FileName: </h4> */}
        <div ref={fileNameCompRef} className="filename-class">
          {writeState === false ? (
            <h2
              onClick={() => setWriteState(true)}
              className="filename-heading"
            >
              {filename}
            </h2>
          ) : (
            <input
              onChange={setFileNameFunction}
              className="input-class"
              value={filename}
            ></input>
          )}
        </div>
      </div>
    </>
  );
}
