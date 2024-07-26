import React from "react";
import styles from "./CustomModal.module.css";
import { Modal, Button } from "react-bootstrap";
import useTranslation from "next-translate/useTranslation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CustomModalProps {
  show: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  actionBtnText: string;
  children: React.ReactNode;
  onActionPerform: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  title,
  children,
  onCancel,
  description,
  actionBtnText,
  onActionPerform,
}) => {
  const { t } = useTranslation("common");
  return (
    <Modal centered show={show} aria-labelledby="contained-modal-title-vcenter">
      <div className="p-3 d-flex justify-content-between">
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.para}>{description}</p>
        </div>
        <div className={styles.saveIcon} onClick={onCancel}>
          <FontAwesomeIcon icon={faXmark} style={{ color: "#536C73" }} />
        </div>
      </div>

      <div className="p-4">{children}</div>

      <div className="d-flex justify-content-end p-3 gap-3">
        <Button className={styles.cancelBtn} onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button className={`${styles.actionBtn}`} onClick={onActionPerform}>
          {actionBtnText}
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
