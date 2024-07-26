import React from "react";
import { useState } from "react";
import Ruler from "../../General/Ruler/Ruler";
import EditorComponent from "../../General/Editor/Editor";

interface TextAreaProps {
  padding: any;
  setPadding: any;
  fileContent: string;
  setFileContent: (content: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  padding,
  setPadding,
  fileContent,
  setFileContent,
}) => {
  const minDifference = 2;
  const [range, setRange] = useState([2.5, 17.5]);
  const [verticalRange, setVerticalRange] = useState([2.5, 17.5]);

  const generateMarks = (min: any, max: any) => {
    const marks: any = {};
    for (let i = min; i <= max; i++) {
      marks[i] = i;
    }
    return marks;
  };

  const handlePaddingChange = (side: string, value: number) => {
    setPadding((prevPadding: any) => ({ ...prevPadding, [side]: value }));
  };

  const handleHorizontalSliderChange = (value: any) => {
    if (value[1] - value[0] >= minDifference) {
      setRange(value);
    }
  };

  const handleHorizontalSliderAfterChange = (value: any) => {
    const adjustedRightValue = 20 - value[1];
    handlePaddingChange("left", value[0]);
    handlePaddingChange("right", adjustedRightValue);
  };

  const handleVerticalSliderChange = (value: any) => {
    if (value[1] - value[0] >= minDifference) {
      setVerticalRange(value);
    }
  };

  const handleVerticalSliderAfterChange = (value: any) => {
    const adjustedTopValue = 20 - value[1];
    handlePaddingChange("top", value[0]);
    handlePaddingChange("bottom", adjustedTopValue);
  };

  return (
    <div className="ready-made">
      <div className="editor-content">
        <div className="horizontal-slider">
          <Ruler
            value={range}
            className="horizontal"
            onChange={handleHorizontalSliderChange}
            onChangeComplete={handleHorizontalSliderAfterChange}
          />
        </div>
        <div className="vertical-slider">
          <Ruler
            className="vertical"
            value={verticalRange}
            onChange={handleVerticalSliderChange}
            onChangeComplete={handleVerticalSliderAfterChange}
          />
          <EditorComponent
            padding={padding}
            fileContent={fileContent}
            setFileContent={setFileContent}
          />
        </div>
      </div>
    </div>
  );
};

export default TextArea;
