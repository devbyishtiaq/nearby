import React from "react";

import styles from "./UpdateConsent.module.css";

interface UpdateConsentProps {
  consentText: string;
}

const UpdateConsent: React.FC<UpdateConsentProps> = ({ consentText }) => {
  return (
    <div className={styles.updateConsentContainer}>
      <input type="checkbox" value="True" name="Update-consent" />
      <label>{consentText}</label>
    </div>
  );
};

export default UpdateConsent;
