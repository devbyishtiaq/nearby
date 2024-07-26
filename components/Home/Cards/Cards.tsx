import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./Cards.module.css";
import ServiceCard from "../../General/ServiceCard/ServiceCard";

const Cards: React.FC = () => {
    const { t } = useTranslation("home-page");

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-4 my-3">
                    <Link href="/legislative-base">
                        <ServiceCard imageSrc="/img/AIKA/justice-green.png"
                            title={t("legislative-base")}
                            linkDirection="/legislative-base"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/government-body-responses">
                        <ServiceCard imageSrc="/img/AIKA/box-green.png"
                            title={t("government-response")}
                            linkDirection="/government-body-responses"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/judicial-acts">
                        <ServiceCard imageSrc="/img/AIKA/judicial-acts-green.png"
                            title={t("judicial-acts")}
                            linkDirection="/judicial-acts"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/creation-and-signing">
                        <ServiceCard imageSrc="/img/AIKA/creation-and-signing-green.png"
                            title={t("creation-signing")}
                            linkDirection="/creation-and-signing"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/analysis-of-documents">
                        <ServiceCard imageSrc="/img/AIKA/analysis-green.png"
                            title={t("analysis-of-documents")}
                            linkDirection="/analysis-of-documents"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/ai-ka">
                        <ServiceCard imageSrc="/img/AIKA/ai-green.png"
                            title={t("legal-consultant")}
                            linkDirection="/ai-ka"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/search-specialist">
                        <ServiceCard imageSrc="/img/AIKA/specialist-green.png"
                            title={t("specialists-search")}
                            linkDirection="/search-specialist"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/marketplace">
                        <ServiceCard imageSrc="/img/AIKA/marketplace-green.png"
                            title={t("marketplace")}
                            linkDirection="/marketplace"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
                <div className="col-12 col-md-4 my-3">
                    <Link href="/nearby-courses">
                        <ServiceCard imageSrc="/img/AIKA/course-green.png"
                            title={t("nearby-courses")}
                            linkDirection="/nearby-courses"
                            linkText={t("learn-more")} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cards;