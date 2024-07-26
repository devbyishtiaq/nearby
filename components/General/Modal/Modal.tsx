// Modal.tsx
import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, toggleModal, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
