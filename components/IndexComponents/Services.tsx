import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Services: React.FC = () => {
  const { t } = useTranslation("index");
  return (
    <>
      <section className={styles.services} id={styles.services}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("services__title")}</span>
        </h2>

        <Tabs
          defaultIndex={0}
          onSelect={(index) => console.log("Selected Tab:", index + 1)}
        >
          <div className={`${styles.services__nav} service_nav`}>
            <TabList>
              <Tab>
                <label htmlFor={styles.tab1}>
                  <img
                    src="/img/services/services-nav1.svg"
                    alt="servicesNav1"
                    className={styles.icon}
                  />
                  <span>{t("services__tab1")}</span>
                </label>
              </Tab>
              <Tab>
                <label htmlFor={styles.tab2}>
                  <img
                    src="/img/services/services-nav2.svg"
                    alt="servicesNav2"
                    className={styles.icon}
                  />
                  <span>{t("services__tab2")}</span>
                </label>
              </Tab>
              <Tab>
                <label htmlFor={styles.tab3}>
                  <img
                    src="/img/services/services-nav3.svg"
                    alt="servicesNav3"
                    className={styles.icon}
                  />
                  <span>{t("services__tab3")}</span>
                </label>
              </Tab>
            </TabList>
          </div>
          <div
            className={`${styles.services__container} ${styles.container} ${styles.grid}`}
          >
            <TabPanel>
              <div id={styles.serviceTab1} className={styles.services__group}>
                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services11.svg" alt="services11" />
                      <p className={styles.services__title}>
                        {t("services__item11")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services12.svg" alt="services12" />
                      <p className={styles.services__title}>
                        {t("services__item12")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services13.svg" alt="services13" />
                      <p className={styles.services__title}>
                        {t("services__item13")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services14.svg" alt="services14" />
                      <p className={styles.services__title}>
                        {t("services__item14")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services15.svg" alt="services15" />
                      <p className={styles.services__title}>
                        {t("services__item15")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services16.svg" alt="services16" />
                      <p className={styles.services__title}>
                        {t("services__item16")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services17.svg" alt="services17" />
                      <p className={styles.services__title}>
                        {t("services__item17")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/servicesAll.svg" alt="servicesAll" />
                      <p className={styles.services__title}>
                        {t("services__itemAll")}
                      </p>
                  </Link>
                </div>

              </div>
            </TabPanel>

            <TabPanel>
              <div id={styles.serviceTab3} className={styles.services__group}>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services11.svg" alt="services21" />
                      <p className={styles.services__title}>
                        {t("services__item21")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services12.svg" alt="services22" />
                      <p className={styles.services__title}>
                        {t("services__item22")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services13.svg" alt="services23" />
                      <p className={styles.services__title}>
                        {t("services__item23")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services14.svg" alt="services24" />
                      <p className={styles.services__title}>
                        {t("services__item24")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services15.svg" alt="services25" />
                      <p className={styles.services__title}>
                        {t("services__item25")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services16.svg" alt="services26" />
                      <p className={styles.services__title}>
                        {t("services__item26")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services17.svg" alt="services27" />
                      <p className={styles.services__title}>
                        {t("services__item27")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/servicesAll.svg" alt="servicesAll" />
                      <p className={styles.services__title}>
                        {t("services__itemAll")}
                      </p>
                  </Link>
                </div>

              </div>
            </TabPanel>

            <TabPanel>
              <div id={styles.serviceTab2} className={styles.services__group}>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services31.svg" alt="services31" />
                      <p className={styles.services__title}>
                        {t("services__item31")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services32.svg" alt="services32" />
                      <p className={styles.services__title}>
                        {t("services__item32")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services33.svg" alt="services33" />
                      <p className={styles.services__title}>
                        {t("services__item33")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services34.svg" alt="services34" />
                      <p className={styles.services__title}>
                        {t("services__item34")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services35.svg" alt="services35" />
                      <p className={styles.services__title}>
                        {t("services__item35")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services36.svg" alt="services36" />
                      <p className={styles.services__title}>
                        {t("services__item36")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/services37.svg" alt="services37" />
                      <p className={styles.services__title}>
                        {t("services__item37")}
                      </p>
                  </Link>
                </div>

                <div className={styles.services__item}>
                  <Link href="/register">
                      <img src="/img/services/servicesAll.svg" alt="servicesAll" />
                      <p className={styles.services__title}>
                        {t("services__itemAll")}
                      </p>
                  </Link>
                </div>

              </div>
            </TabPanel>
          </div>
        </Tabs>
      </section>
    </>
  );
};

export default Services;
