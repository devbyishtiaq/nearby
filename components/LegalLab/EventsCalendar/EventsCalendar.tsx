import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import styles from "./EventsCalendar.module.css";

interface EventsCalendarProps{
    baseUrl: string,
    }

const EventsCalendar: React.FC<EventsCalendarProps> = ({ baseUrl }) => {
  const { t } = useTranslation("legal-lab");
  const router = useRouter();
  const { locale } = router;
  const [eventList, setEventList] = useState<any>([]);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const getEventList = async () => {
    try {
      const response = await fetch("/api/events/get-online-meeting-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page }),
      });
      const data = await response.json();
      setEventList(data.events);
      setTotalElements(data.total);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    getEventList();
    }, [])

  useEffect(() => {
    if (page !== 1){
        getEventList();
        }
    }, [page])

  return (
    <>
      <section className={styles.parentDiv}>
        <h2 className={`section__title title__center`}>
          <span dangerouslySetInnerHTML={{ __html: t("events__title") }}></span>
        </h2>
        <p>{t("events__description")}</p>

        <div className={`${styles.eventsCalendar__container} grid`}>
          {eventList.map((event:any) =>{
              return (
                  <div className={styles.eventsCalendar__item}>
                      <img
                        src={`${baseUrl}/${event.picture}`}
                        alt={event.title}
                        className={styles.eventsCalendar__img}
                      />
                      <div className={styles.eventsCalendar__btn}>
                        <div className="btn__group">
                          <a href="#" className="button btn__light">
                            {event.meeting_time}
                          </a>
                        </div>
                      </div>
                      <p className={styles.eventsCalendar__title}>
                        {locale === "en"
                          ? event.title
                          : locale === "kz"
                          ? event.title_kz
                          : event.title_ru}
                      </p>
                      <p className={styles.eventsCalendar__description}>
                        {locale === "en"
                          ? event.description
                          : locale === "kz"
                          ? event.description_kz
                          : event.description_ru}
                      </p>
                      <div className="mb-3">
                        <a href={event.meeting_link} className="btn btn-outline-success">{t("meeting_link")}</a>
                      </div>
                      <span>
                        {locale === "en"
                          ? event.location
                          : locale === "kz"
                          ? event.location_kz
                          : event.location_ru}
                      </span>
                    </div>
                  )
              })}

        </div>
        {
            page * 3 < totalElements
            ?   <button className="button btn__default" onClick={() => setPage(page + 1)}>
                  {t("events__button")}
                </button>
            :   null
        }

      </section>
    </>
  );
};

export default EventsCalendar;
