import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import AlertBox from "../../General/AlertBox/AlertBox";
import useTranslation from "next-translate/useTranslation";
import styles from "./Contact.module.css";

interface ContactProps {
  username: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  comment: string;
  setComment: (value: string) => void;
  handleContactSubmit: () => void;
  alertType: string;
  alertText: string;
  alertShow: boolean;
  setAlertShow: (alertShow: boolean) => void;
}

const Contact: React.FC<ContactProps> = ({
  username,
  setUsername,
  email,
  setEmail,
  phone,
  setPhone,
  comment,
  setComment,
  handleContactSubmit,
  alertType,
  alertText,
  alertShow,
  setAlertShow,
}) => {
  const { t } = useTranslation("legal-design");

  return (
    <section className={styles.parentDiv} id="legal-design-contact">
      <div className={styles.contact__container}>
        <span>{t("legal__contact__small")}</span>
        <h2 className={styles.contact__title}>{t("legal__contact__title")}</h2>
        <p className={styles.contact__desc}>
          {t("legal__contact__description")}
        </p>
      </div>
      <form className={styles.contact__container}>
        <div className={styles.form__content}>
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
          <div className={styles.form__content}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              placeholder={t("legal__placeholder__email")}
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form__content}>
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
        <div className={styles.form__content}>
          <FontAwesomeIcon icon={faPen} />
          <input
            type="text"
            placeholder={t("legal__placeholder__comment")}
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="btn__group">
          <a
            className="button btn__default"
            onClick={() => handleContactSubmit()}
          >
            {t("submit")}
          </a>
        </div>
      </form>
      {alertShow && (
        <AlertBox
          label={alertText}
          type={alertType}
          setAlertShow={setAlertShow}
        />
      )}
    </section>
  );
};

export default Contact;
