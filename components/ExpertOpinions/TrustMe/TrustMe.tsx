import React, { useState } from "react";
import YoutubeVideo from "../../General/YoutubeVideo/YoutubeVideo";

import styles from "./TrustMe.module.css";

interface TrustMeProps {
  title: string;
  description: string;
}

const TrustMe: React.FC<TrustMeProps> = ({ title, description }) => {
  const videoList = [
    "YVibcaVhU0s",
    "4lrLWWPjvUM",
    "Rw6OwMyC-Hk",
    "Qms8ZluAFTg",
  ];
  const [currentVideoID, setCurrentVideoID] = useState<number>(0);

  function nextVideoFunc() {
    setCurrentVideoID((prevID) =>
      prevID === videoList.length - 1 ? 0 : prevID + 1,
    );
  }

  function prevVideoFunc() {
    setCurrentVideoID((prevID) =>
      prevID === 0 ? videoList.length - 1 : prevID - 1,
    );
  }

  return (
    <div className={styles.parentDiv}>
      <div className={styles.trust__container}>
        <h1>{title}</h1>
        <p>{description}</p>
        <YoutubeVideo videoId={videoList[currentVideoID]} />
        <div className={styles.trust__nav}>
          <span onClick={prevVideoFunc}>
            <img src="/img/guide/guide-arrow.svg" alt="previous" />
          </span>
          <span onClick={nextVideoFunc}>
            <img src="/img/guide/guide-arrow.svg" alt="next" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustMe;
