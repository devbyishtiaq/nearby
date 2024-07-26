import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import Accordion from "../General/Accordion";
import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";
import ModalStyles from "./Faq.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendContactMessage } from "../../services/sendContactMessage";
import AlertBox from "../General/AlertBox/AlertBox";
import {
  faUser,
  faEnvelope,
  faPhone,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "30px 50px",
    marginRight: "-50%",
    borderRadius: "15px",
    transform: "translate(-50%, -50%)",
  },
};

const Faq: React.FC = () => {
  const { t } = useTranslation("index");
  const router = useRouter();
  const { locale = "ru" } = router;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [alertText, setAlertText] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("success");

  const handleContactSubmit = async () => {
    try {
      const contactResponse = await sendContactMessage(
        username,
        email,
        phone,
        comment,
        "index",
        locale,
      );
      setUsername("");
      setEmail("");
      setPhone("");
      setComment("");
      if (contactResponse["error"]) {
        setAlertText(contactResponse["error"]);
        setAlertType("danger");
      } else {
        setAlertText(contactResponse["status"]);
        setAlertType("success");
      }
      setAlertShow(true);
    } catch (error) {
      console.log("error in contact.");
      setAlertText("Please fill the inputs.");
      setAlertType("danger");
      setAlertShow(true);
    }
  };

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const items1 = [
    {
      uuid: 1,
      heading: `${t("acc__faq11h")}`,
      content: `${t("acc__faq11c")}`,
    },
    {
      uuid: 3,
      heading: `${t("acc__faq12h")}`,
      content: `${t("acc__faq12c")}`,
    },
    {
      uuid: 5,
      heading: `${t("acc__faq13h")}`,
      content: `${t("acc__faq13c")}`,
    },
  ];
  const items2 = [
    {
      uuid: 2,
      heading: `${t("acc__faq21h")}`,
      content: `${t("acc__faq21c")}`,
    },
    {
      uuid: 4,
      heading: `${t("acc__faq22h")}`,
      content: `${t("acc__faq22c")}`,
    },
  ];
  return (
    <div id="faq">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="d-flex mb-3">
          <h5 className="ms-2 text-dark">
            <b>{t("contact")}</b>
          </h5>
          <button onClick={closeModal} className="ms-auto">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div>
          <form className={ModalStyles.contact__container}>
            <div className={ModalStyles.form__content}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                placeholder={t("legal__placeholder__name")}
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <div className={ModalStyles.form__content}>
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type="email"
                  placeholder={t("legal__placeholder__email")}
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={ModalStyles.form__content}>
                <FontAwesomeIcon icon={faPhone} />
                <input
                  type="text"
                  placeholder={t("legal__placeholder__phone")}
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className={ModalStyles.form__content}>
              <FontAwesomeIcon icon={faPen} />
              <input
                type="text"
                placeholder={t("legal__placeholder__comment")}
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="btn__group d-flex justify-content-center">
              <a
                className="button btn__default"
                onClick={() => handleContactSubmit()}
              >
                {t("submit")}
              </a>
            </div>
          </form>
        </div>
      </Modal>
      <section className={styles.faq} id={styles.faq}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("faq__title1")}</span>
        </h2>
        <div
          className={`${styles.faq__container} ${styles.container} ${styles.grid}`}
        >
          <div className="acc__faq">
            <Accordion sections={items1} />
            <Accordion sections={items2} />
          </div>
          <div className={styles.faq__order}>
            <div className={styles.faq__content}>
              <h1 className={styles.intro__title}>{t("faq__title2")}</h1>
              <p>{t("faq__description")}</p>
              <div className="btn__group">
                <button className="button btn__default" onClick={openModal}>
                  {t("faq__btn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {alertShow && (
        <AlertBox
          label={alertText}
          type={alertType}
          setAlertShow={setAlertShow}
        />
      )}
    </div>
  );
};

export default Faq;
