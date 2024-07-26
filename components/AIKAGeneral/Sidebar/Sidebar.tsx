import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import useTranslation from "next-translate/useTranslation";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  email?: string;
  username?: string;
  baseUrl?: string;
  profilePicture?: string;
  setSidebarHidden: (value: boolean) => void;
  sidebarHidden: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  email = "",
  username = "",
  baseUrl = "",
  profilePicture = "",
  sidebarHidden,
  setSidebarHidden,
}) => {
  const router = useRouter();
  const currentUrl = router.pathname;
  const { t } = useTranslation("common");
  // console.log(`${baseUrl}/media/profile_pictures/${profilePicture}`)

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Needed to include cookies in the request (if using cookies for auth)
      });
      if (response.ok) {
        // Redirect user to login page or perform other actions upon successful logout
        router.reload();
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed!");
    }
  };

  return (
    <>
      {sidebarHidden ? (
        <div className={styles.container}>
          <div className={styles.closeButton}>
            <button
              onClick={() => setSidebarHidden(!sidebarHidden)}
              className="d-flex ms-auto"
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ color: "#a5bbc8" }}
              />
            </button>
          </div>
          <div className={styles.nearbyLogo}>
            <Link href="/home">
              <Image
                src="/img/general/nearby.png"
                width={150}
                height={50}
                alt="Nearby Logo"
              />
            </Link>
          </div>
          <hr></hr>
          <Link href="/judicial-acts">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/judicial-acts" ? " " + styles.activeNav : "")
              }
            >
              <Image
                src="/img/AIKA/hammer.png"
                width={22}
                height={22}
                alt="Database of Judicial Acts"
              />
              <span>
                {t("database-of-judicial-acts-of-the-republic-of-kazakhstan")}
              </span>
            </div>
          </Link>
          <Link href="/creation-and-signing">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/creation-and-signing"
                  ? " " + styles.activeNav
                  : "")
              }
            >
              <Image
                src="/img/AIKA/arrow-right.png"
                width={22}
                height={22}
                alt="Creation and Signing"
              />
              <span>{t("creation-signing")}</span>
            </div>
          </Link>
          <Link href="/legislative-base">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/legislative-base"
                  ? " " + styles.activeNav
                  : "")
              }
            >
              <Image
                src="/img/AIKA/justice.png"
                width={22}
                height={22}
                alt="Justice Logo"
              />
              <span>{t("legislative-base-of-the-republic-of-kazakhstan")}</span>
            </div>
          </Link>
          <Link href="/government-body-responses">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/government-body-responses"
                  ? " " + styles.activeNav
                  : "")
              }
            >
              <Image
                src="/img/AIKA/box.png"
                width={22}
                height={22}
                alt="Documents"
              />
              <span>
                {t(
                  "database-of-responses-from-government-bodies-of-the-republic-of-kazakhstan",
                )}
              </span>
            </div>
          </Link>
          <Link href="/analysis-of-documents">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/analysis-of-documents"
                  ? " " + styles.activeNav
                  : "")
              }
            >
              <Image
                src="/img/AIKA/analysis.png"
                width={22}
                height={22}
                alt="Analysis"
              />
              <span>{t("analysis-of-documents-contracts-using-AI")}</span>
            </div>
          </Link>
          <Link href="/ai-ka">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/ai-ka" ? " " + styles.activeNav : "")
              }
            >
              <Image
                src="/img/AIKA/aika.png"
                width={22}
                height={22}
                alt="AIKA"
              />
              <span>{t("legal-consultant-AI-KA")}</span>
            </div>
          </Link>
          <Link href="/search-specialist">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/search-specialist"
                  ? " " + styles.activeNav
                  : "")
              }
            >
              <Image
                src="/img/AIKA/specialist.png"
                width={22}
                height={22}
                alt="Specialist"
              />
              <span>{t("search-for-specialists")}</span>
            </div>
          </Link>
          <Link href="/marketplace">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/marketplace" ? " " + styles.activeNav : "")
              }
            >
              <Image
                src="/img/AIKA/marketplace.png"
                width={22}
                height={22}
                alt="Marketplace"
              />
              <span>{t("marketplace")}</span>
            </div>
          </Link>
          <Link href="/account-settings">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/account-settings"
                  ? " " + styles.activeNav
                  : "")
              }
            >
              <Image
                src="/img/AIKA/user.png"
                width={22}
                height={22}
                alt="Account"
              />
              <span>{t("account-settings")}</span>
            </div>
          </Link>
          <Link href="/nearby-courses">
            <div
              className={
                styles.navContainer +
                (currentUrl === "/nearby-courses" ? " " + styles.activeNav : "")
              }
            >
              <Image src="/img/AIKA/job.png" width={22} height={22} alt="Job" />
              <span>{t("nearby-courses")}</span>
            </div>
          </Link>
          <hr></hr>
          <div className={styles.navContainer}>
            <div
              className={
                profilePicture
                  ? styles.profileImageWithImage
                  : styles.profileImage
              }
            >
              {profilePicture ? (
                <Image
                  src={
                    profilePicture.includes("/media/profile_pictures")
                      ? profilePicture
                      : `${baseUrl}/media/profile_pictures/${profilePicture}`
                  }
                  width={50}
                  height={50}
                  alt="Profile Picture"
                />
              ) : (
                <>{username ? username[0].toUpperCase() : "U"}</>
              )}
            </div>
            <div>
              <span>{username ? username : "User"}</span>
              <br></br>
              <span className={styles.emailText}>
                {email ? email : "Nearby"}
              </span>
            </div>
          </div>
          <Link href="#" onClick={handleLogout}>
            <div className={styles.navContainer}>
              <Image
                src="/img/AIKA/logout.png"
                width={22}
                height={22}
                alt="Logout"
              />
              <span>{t("logout")}</span>
            </div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
