import React from "react";
import Image from "next/image";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <Image
          width={70}
          height={70}
          alt="loader"
          src="/img/general/loading-animation.gif"
        />
      </div>
    </div>
  );
};

export default Loader;
