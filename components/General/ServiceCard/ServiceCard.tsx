import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  linkDirection: string;
  linkText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imageSrc, title, linkDirection, linkText="" }) => {
  return (
    <div className={styles.container}>
        <Image src={imageSrc} width={30} height={30} alt={`${title} Image`} />
        <div>
            <h3 className="text-dark">{title}</h3>
            <Link href={linkDirection} className={styles.link} >
                {linkText} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    </div>
  );
};

export default ServiceCard;
