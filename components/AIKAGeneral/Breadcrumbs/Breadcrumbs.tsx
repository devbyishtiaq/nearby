import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Breadcrumbs.module.css";

interface Url {
  urlName: string;
  urlLink: string;
}
interface BreadcrumbsProps {
  urlList: Url[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ urlList }) => {
  return (
    <div className={styles.container}>
      <Link href="/home">
        <Image
          src="/img/general/home.png"
          width={15}
          height={15}
          alt="Home icon"
        />
      </Link>
      {urlList.map((url) => (
        <>
          <Image
            src="/img/general/chevron-right.png"
            width={6}
            height={10}
            alt="Right icon"
            className="ms-3"
          />
          <Link href={url.urlLink}>
            <span className="ms-3">{url.urlName}</span>
          </Link>
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
