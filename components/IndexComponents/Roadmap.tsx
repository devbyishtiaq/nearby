import React from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Roadmap: React.FC = () => {
  const { t } = useTranslation("index");

  return (
    <>
      <section className={styles.roadmap} id={styles.roadmap}>
        <h2 className={styles.section__title}>
          <span>{t("roadmap__title")}</span>
        </h2>

        <Tabs
          defaultIndex={0}
          onSelect={(index) => console.log("Selected Tab:", index + 1)}
        >
          <div
            className={`${styles.roadmap__container} ${styles.container} ${styles.grid}`}
          >
            <div className={`${styles.roadmap__nav} roadmap__nav__global`}>
              <TabList>
                <Tab>
                  <label htmlFor={styles.roadmapTab1}>
                    <span>2024 Q3</span>
                  </label>
                </Tab>
                <Tab>
                  <label htmlFor={styles.roadmapTab2}>
                    <span>2024 Q4</span>
                  </label>
                </Tab>
                <Tab>
                  <label htmlFor={styles.roadmapTab3}>
                    <span>2025</span>
                  </label>
                </Tab>
                <Tab>
                  <label htmlFor={styles.roadmapTab4}>
                    <span>2026</span>
                  </label>
                </Tab>
              </TabList>
            </div>
            <div className={styles.roadmap__content}>
              <TabPanel>
                <h3 className={styles.roadmap__title}>2024 Q3</h3>
                <div className={styles.roadmap__items}>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item11")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item12")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item13")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item14")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item15")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item16")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item17")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item18")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item19")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item20")}</span>
                  </div>
                </div>
                <div className="btn__group">
                  <Link href="/login" className="button btn__default">
                    {t("get-started")}
                  </Link>
                </div>
              </TabPanel>

              <TabPanel>
                <h3 className={styles.roadmap__title}>2024 Q4</h3>
                <div className={styles.roadmap__items}>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item21")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item22")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item23")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item24")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item25")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item26")}</span>
                  </div>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item27")}</span>
                  </div>
                </div>
                <div className="btn__group">
                  <Link href="/login" className="button btn__default">
                    {t("get-started")}
                  </Link>
                </div>
              </TabPanel>

              <TabPanel>
                <h3 className={styles.roadmap__title}>2025</h3>
                <div className={styles.roadmap__items}>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item31")}</span>
                  </div>
                </div>
                <div className="btn__group">
                  <Link href="/login" className="button btn__default">
                    {t("get-started")}
                  </Link>
                </div>
              </TabPanel>

              <TabPanel>
                <h3 className={styles.roadmap__title}>2026</h3>
                <div className={styles.roadmap__items}>
                  <div className={styles.roadmap__item}>
                    <span>{t("roadmap__item41")}</span>
                  </div>
                </div>
                <div className="btn__group">
                  <Link href="/login" className="button btn__default">
                    {t("get-started")}
                  </Link>
                </div>
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </section>
    </>
  );
};

export default Roadmap;
