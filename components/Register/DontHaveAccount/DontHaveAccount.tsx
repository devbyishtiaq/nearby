import React from "react";
import Link from "next/link";
import styles from "./DontHaveAccount.module.css";

interface DontHaveAccountProps {
  dontHaveAccount: string;
  signup: string;
}

const DontHaveAccount: React.FC<DontHaveAccountProps> = ({
  dontHaveAccount,
  signup,
}) => {
  return (
    <div className={styles.haveAccountText}>
      <p>
        {dontHaveAccount} <Link href="/register">{signup}</Link>
      </p>
    </div>
  );
};

export default DontHaveAccount;
