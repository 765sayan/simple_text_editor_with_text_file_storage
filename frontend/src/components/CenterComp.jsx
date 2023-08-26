import { useEffect, useState } from "react";
import "../assets/ComponentCSS.css";

export default function CenterComp(props) {
  const { fontDataProp, textArea, fileData } = props;
  const fontFeatures = {
    fontSize: "20",
  };

  const [scrollHeightState, setScrollHeightState] = useState(708);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        textArea.current.value += "   ";
      }
    });
  }, []);

  useEffect(() => {
    textArea.current.style.fontSize = `${fontFeatures.fontSize}px`;
  }, []);

  useEffect(() => {
    textArea.current.value = fileData;
  }, [fileData]);

  useEffect(() => {
    if (fontDataProp.fontSize !== textArea.current.style.fontSize) {
      textArea.current.style.fontSize = `${fontDataProp.fontSize}px`;
    }
  }, [fontDataProp]);

  function keyUpEventListener(e) {
    let scrollHeight = e.target.scrollHeight;

    if (scrollHeight > scrollHeightState) {
      e.target.style.height = `${scrollHeight}px`;
      setScrollHeightState(scrollHeight);
    }
  }

  return (
    <>
      <div className="center-comp">
        <div className="text-area-wrapper">
          <textarea
            id="textarea"
            ref={textArea}
            className="text-area-class"
            onKeyUp={(e) => {
              keyUpEventListener(e);
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}
