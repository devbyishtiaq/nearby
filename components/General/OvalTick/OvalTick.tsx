import React from "react";
import styles from "./OvalTick.module.css";
import Image from "next/image";

interface OvalTickProps {
  size?: string;
  type?: string;
}

const OvalTick: React.FC<OvalTickProps> = ({
  size = "small",
  type = "success",
}) => {
  return (
    <div
      className={`${size === "small" ? styles.container : styles.bigContainer} ${type === "success" ? styles.successColor : styles.warningColor}`}
    >
      {type === "success" ? (
        <Image src="/img/general/tick.png" width={25} height={25} alt="Tick" />
      ) : (
        <Image src="/img/general/oops.png" width={25} height={25} alt="Tick" />
      )}
    </div>
  );
};

export default OvalTick;
