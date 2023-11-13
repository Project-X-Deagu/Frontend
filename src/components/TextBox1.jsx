import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export const StyledTextArea = styled.textarea`
  background-color: transparent;
  width: 90%;
  min-width: 200px;
  max-width: 800px;
  height: 25px;
  resize: none;
  overflow: hidden;
  border: 2px solid black;
  border-radius: 20px;
  outline: none;
  margin: 5px 0;
  padding: 10px 25px;
  font-family: "D2Coding", sans-serif;
  font-weight: normal;
  font-size: 20px;

  &:focus {
    background-color: white;
  }
`;

export const ImgButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export const TextBox1 = ({ onKeyPress }) => {
  const [list, setList] = useState([]);
  const [showText, setShowText] = useState(
    "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다."
  );
  const [inputText, setInputText] = useState("");

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    axios.get("/api/korean").then((res) => {
      setList(res.data);
      console.log(res);
    });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  };

  const handleKeyDown = (e) => {
    onKeyPress(e.key);

    if (e.key === "Tab") {
      e.preventDefault();

      const cursorPosition = e.target.selectionStart;
      const selectionEnd = e.target.selectionEnd;

      const lineStart = inputText.lastIndexOf("\n", cursorPosition - 1) + 1;
      const lineEnd = inputText.indexOf("\n", cursorPosition);

      const textBeforeLine = inputText.substring(0, lineStart);
      const textInLine = inputText.substring(
        lineStart,
        lineEnd !== -1 ? lineEnd : inputText.length
      );
      const textAfterLine = inputText.substring(
        lineEnd !== -1 ? lineEnd : inputText.length
      );

      const indentedTextInLine =
        textInLine.substring(0, cursorPosition - lineStart) +
        " ".repeat(4) +
        textInLine.substring(cursorPosition - lineStart);

      const indentedText = textBeforeLine + indentedTextInLine + textAfterLine;

      setInputText(indentedText);

      e.target.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleImgButtonClick();
    }
  };

  const handleImgButtonClick = () => {
    if (list.length > 0) {
      setShowText(list[getRandom(0, 51)].sentence);
      setInputText("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <ImgButton
        src="left-arrow.png"
        alt="Prev"
        onClick={handleImgButtonClick}
        style={{ marginRight: "10px" }}
      />
      <div
        style={{
          // display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyledTextArea
          name="showText"
          value={showText}
          onChange={() => {}}
          autoFocus
          readOnly
          style={{ marginBottom: "25px" }}
        />
        <StyledTextArea
          name="inputText"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
      <ImgButton
        src="right-arrow.png"
        alt="Next"
        onClick={handleImgButtonClick}
        style={{ marginLeft: "25px" }}
      />
    </div>
  );
};
