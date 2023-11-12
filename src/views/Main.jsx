import React, { useState } from "react";
import { Logo } from "../components/Logo";
import { TextBoxArea } from "../components/TextBoxArea.jsx";
import { Keymap } from "../components/Keymap";
// import { Keymap } from "../components/KoreanKeymap";
import { KeymapArea } from "../css/style.js";

function Main() {
  const [keyColor, setKeyColor] = useState("white");
  const [isCategoryVisible, setCategoryVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryHover = (hovered) => {
    setCategoryVisible(hovered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleKeyPress = (key) => {
    if (key >= "a" && key <= "z") {
      setKeyColor("var(--bg-blue)");
    } else {
      setKeyColor("white");
    }
  };

  return (
    <div>
      {/* 상단 네비게이션 바 */}
      <Logo
        onLogoHover={handleCategoryHover}
        onCategorySelect={handleCategorySelect}
      />
      {/* 인풋 창 */}
      <TextBoxArea
        selectedCategory={selectedCategory}
        handleKeyPress={handleKeyPress}
      />
      {/* 키보드 레이아웃 */}
      <KeymapArea>
        <Keymap keyColor={keyColor}></Keymap>
      </KeymapArea>
    </div>
  );
}

export default Main;
