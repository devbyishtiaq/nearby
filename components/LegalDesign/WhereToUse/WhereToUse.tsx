import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useTranslation from "next-translate/useTranslation";
import styles from "./WhereToUse.module.css";

const WhereToUse: React.FC = () => {
  const { t } = useTranslation("legal-design");

  return (
    <>
      <section className="whereToUse" id={styles.whereToUse}>
        <h2 className={`section__title title__center`}>
          <span>{t("legal__whereToUse__title")}</span>
        </h2>

        <Tabs
          defaultIndex={0}
          onSelect={(index) => console.log("Selected Tab:", index + 1)}
        >
          <div className={styles.whereToUse__nav}>
            <TabList>
              <Tab>
                <label htmlFor={styles.tab1}>
                  {t("legal__whereToUse__tab1")}
                </label>
              </Tab>
              <Tab>
                <label htmlFor={styles.tab2}>
                  {t("legal__whereToUse__tab2")}
                </label>
              </Tab>
              <Tab>
                <label htmlFor={styles.tab3}>
                  {t("legal__whereToUse__tab3")}
                </label>
              </Tab>
              <Tab>
                <label htmlFor={styles.tab4}>
                  {t("legal__whereToUse__tab4")}
                </label>
              </Tab>
            </TabList>
          </div>
          <div className={`${styles.whereToUse__container} container grid`}>
            <TabPanel>
              <div
                id={styles.whereToUseTab1}
                className={styles.whereToUse__group}
              >
                <img src="/img/legal-design/agreements-intent.jpeg" alt="whereToUse1" />
              </div>
            </TabPanel>

            <TabPanel>
              <div
                id={styles.whereToUseTab2}
                className={styles.whereToUse__group}
              >
                <img src="/img/legal-design/agreements-intent.jpeg" alt="whereToUse1" />
              </div>
            </TabPanel>

            <TabPanel>
              <div
                id={styles.whereToUseTab3}
                className={styles.whereToUse__group}
              >
                <img src="/img/legal-design/legal.jpeg" alt="whereToUse1" />
              </div>
            </TabPanel>

            <TabPanel>
              <div
                id={styles.whereToUseTab4}
                className={styles.whereToUse__group}
              >
                <img src="/img/legal-design/legal.jpeg" alt="whereToUse1" />
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </section>
    </>
  );
};

export default WhereToUse;
