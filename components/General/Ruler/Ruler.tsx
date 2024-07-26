import React from "react";
import Slider from "rc-slider";
import styles from "./Ruler.module.css";

interface RulerProps {
  value: number[];
  className?: string;
  onChange: (value: number[]) => void;
  onChangeComplete: (value: number[]) => void;
}

const Ruler: React.FC<RulerProps> = ({
  value,
  onChange,
  className,
  onChangeComplete,
}) => {
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i <= 100; i++) {
      ticks.push(
        <div
          key={i}
          className={`${styles.tick} ${i % 5 === 0 ? styles.bigTick : ""} ${className && styles[className]}`}
        >
          {i % 5 === 0 && (
            <span
              className={`${styles.tickLabel} ${className && styles[className]}`}
            >
              {i / 5}
            </span>
          )}
        </div>,
      );
    }
    return ticks;
  };

  const handleOnChange = (value: any) => {
    onChange(value);
  };

  const handleAfterChange = (value: any) => {
    if (onChangeComplete) {
      onChangeComplete(value);
    }
  };

  return (
    <div className={className && styles[className]}>
      {renderTicks()}
      <Slider
        range
        min={0}
        max={20}
        step={0.25}
        value={value}
        onChange={handleOnChange}
        className={styles.rulerSlider}
        railStyle={{ display: "none" }}
        trackStyle={{ display: "none" }}
        reverse={className === "vertical"}
        vertical={className === "vertical"}
        onChangeComplete={handleAfterChange}
        handleStyle={{
          backgroundImage: `url("/img/general/${className === "vertical" ? "ver-thumb-img.svg" : "hor-thumb-img.svg"}")`,
        }}
      />
    </div>
  );
};

export default Ruler;
