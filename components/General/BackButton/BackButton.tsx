import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./BackButton.module.css";

const BackButton: React.FC = () => {
    const router = useRouter();
  return (
    <button className={styles.backButton} onClick={() => router.back()}>
        <Image src="/img/general/left up.png" width={30} height={20} alt="Back" />
    </button>
  );
};

export default BackButton;
