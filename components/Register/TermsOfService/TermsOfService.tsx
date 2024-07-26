import React from "react";

import styles from "./TermsOfService.module.css";

interface TermsOfServiceProps {
  termsOfServiceText: string;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  termsOfServiceText,
}) => {
  return (
    <div className={styles.termsOfServiceText}>
      <p dangerouslySetInnerHTML={{ __html: termsOfServiceText }}></p>
    </div>
  );
};

export default TermsOfService;
