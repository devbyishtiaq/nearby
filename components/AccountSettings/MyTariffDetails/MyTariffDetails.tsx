import React from "react";
import styles from "./MyTariffDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";

interface MyTariffDetailsProps{
    email: string,
    telephone: string,
    paymentAmount: string,
    expirationDate: string,
    paymentMethod: string,
    isPaid: boolean,
    startSubscription: () => void,
    cancelSubscription: () => void,
    lastPaymentDate: string,
}

const MyTariffDetails: React.FC<MyTariffDetailsProps> = ({ email, telephone, paymentAmount,
    expirationDate, paymentMethod, isPaid, startSubscription, cancelSubscription, lastPaymentDate }) => {

    const { t } = useTranslation("account-settings");
    return (
        <div className="row mt-5">
            <div className="col-md-4">
                <p><b>{t("my-tariff-title")}</b></p>
                <p className={styles.headerDesc}>{t("my-tariff-subtitle")}</p>
            </div>
            <div className={`col-md-5 p-3 ${styles.border}`}>
                <div className="mt-3">
                    <label className="mb-2 text-muted">{t("Email")}</label>
                    <div className="input-group">
                        <span className="input-group-text bg-white text-muted" id="basic-addon1">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <input type="text" className="form-control border-start-0" value={email}
                            disabled />
                    </div>
                </div>

                <div className="mt-3">
                    <label className="mb-2 text-muted">{t("telephone")}</label>
                    <div className="input-group">
                        <span className="input-group-text bg-white text-muted" id="basic-addon1">
                            <FontAwesomeIcon icon={faPhoneVolume} />
                        </span>
                        <input type="text" className="form-control border-start-0" value={telephone} disabled/>
                    </div>
                </div>

                <div className="mt-3">
                    <label className="mb-2 text-muted">{t("Subscription Amount")}</label>
                    <input type="text" className="form-control" value={paymentAmount} disabled />
                </div>

                <div className="d-flex">
                    <div className="mt-3 me-2">
                        <label className="mb-2 text-muted">{t("Subscription Date")}</label>
                        <div className="input-group">
                            <input type="text" className="form-control border-end-0"
                                value={lastPaymentDate} disabled/>
                            <span className="input-group-text bg-white text-muted" id="basic-addon1">
                                <FontAwesomeIcon icon={faCalendar} />
                            </span>
                        </div>
                    </div>
                    <div className="mt-3 me-2">
                        <label className="mb-2 text-muted">{t("Expiry Date")}</label>
                        <div className="input-group">
                            <input type="text" className="form-control border-end-0" value={expirationDate}
                                disabled/>
                            <span className="input-group-text bg-white text-muted" id="basic-addon1">
                                <FontAwesomeIcon icon={faCalendar} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    {
                        isPaid
                        ?   <button className="btn btn-light"
                                onClick={cancelSubscription}>{t("cancel-subscriptions")}</button>
                        :   <button className="btn btn-success"
                                onClick={startSubscription}>{t("subscribe-now")}</button>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default MyTariffDetails;