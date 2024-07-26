import React from "react";
import Link from "next/link";
import styles from "./AlreadyHaveAccount.module.css";

interface AlreadyHaveAccountProps {
  alreadyHaveAccountText: string;
  loginText: string;
}

const AlreadyHaveAccount: React.FC<AlreadyHaveAccountProps> = ({
  alreadyHaveAccountText,
  loginText,
}) => {
  return (
    <div className={styles.haveAccountText}>
      <p>
        {alreadyHaveAccountText} <Link href="/login">{loginText}</Link>
      </p>
    </div>
  );
};

export default AlreadyHaveAccount;
