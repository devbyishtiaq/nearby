import React from "react";
import Image from "next/image";
import styles from "./CustomOval.module.css";

interface OvalTickProps {
  size?: string;
  type?: string;
}

const OvalTick: React.FC<OvalTickProps> = ({
  size = "small",
  type = "success",
}) => {
  const getTypeClass = () => {
    switch (type) {
      case "success":
        return styles.successColor;
      case "warning":
        return styles.warningColor;
      case "danger":
        return styles.dangerColor;
      default:
        return "";
    }
  };

  const getImageSrc = () => {
    switch (type) {
      case "success":
        return "/img/general/tick.png";
      case "warning":
        return "/img/general/warning.png";
      case "danger":
        return "/img/general/cross.png";
      default:
        return "";
    }
  };

  return (
    <div
      className={`${size === "small" ? styles.container : styles.bigContainer} ${getTypeClass()}`}
    >
      <Image src={getImageSrc()} width={32} height={32} alt={type} />
    </div>
  );
};

export default OvalTick;
