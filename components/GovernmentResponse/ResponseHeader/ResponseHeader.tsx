import React from "react";

import useTranslation from "next-translate/useTranslation";
import styles from "./ResponseHeader.module.css";

const ResponseHeader: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <div>
      <h5>
        {t(
          "database-of-responses-from-government-bodies-of-the-republic-of-kazakhstan",
        )}
      </h5>
    </div>
  );
};

export default ResponseHeader;
