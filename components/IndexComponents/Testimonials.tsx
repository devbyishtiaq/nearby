import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { InstagramEmbed } from "react-social-media-embed";
import useTranslation from "next-translate/useTranslation";
import styles from "./IndexComponents.module.css";

const Testimonials: React.FC = () => {
  const { t } = useTranslation("index");
  const router = useRouter();
  const { locale = "ru" } = router;
  const [currentTestimonialNumber, setCurrentTestimonialNumber] = useState<number>(1);
  const testimonials: any = {
      1: {
            img: "/img/testimonials/Gw.png",
            url: "https://www.instagram.com/reel/C5gX1j-Cj5f/?igsh=eTJ5NzcweTUyaGw=",
            testimonialEn: "Nearby is another additional feature to expand my knowledge, and there should be clarity here. With Nearby, you will understand which direction to move in.",
            testimonialKz: "Nearby-менің білімімді кеңейтудің тағы бір қосымша мүмкіндік және мұнда айқындық болуы керек. Nearby көмегімен сіз қай бағытта жүру керектігін түсінесіз.",
            testimonialRu: "Nearby-еще одна дополнительная возможность расширить мои знания, и здесь должна быть ясность. С Nearby Вы поймете, в каком направлении двигаться.",
            personEn: "Aida Kaumenova",
            personKz: "Аида Кауменова",
            personRu: "Аида Кауменова",
            titleEn: "Designer",
            titleKz: "Дизайнер",
            titleRu: "Дизайнер",
          },
      2: {
        img: "/img/testimonials/Zn.png",
        url: "https://www.instagram.com/reel/C5TT13Wsu3S/?igsh=OGhpb3pndjNrb3Zn",
        testimonialEn: "Now I have particular tool that I use, that I want to share with other expats like myself, because it’s just useful. And as this tool appeared to be called Nearby.kz, I find it,  you can go inside, you can search all of the laws in Republic of Kazakhstan, and you just basicly ask it a question it spits it  back out to you in English, a language you understand.",
        testimonialKz: "Енді менде өзім қолданатын және Мен сияқты басқа эмигранттармен бөліскім келетін арнайы құрал бар, өйткені бұл жай ғана пайдалы. Және бұл құрал Nearby.kz. деп аталады. Сіз ішке кіріп, Қазақстан Республикасының барлық заңдарын көре аласыз және оған сізге ағылшын тілінде яғни сіз түсінетін тілде жауап беретін сұрақ қоя аласыз.",
        testimonialRu: "Теперь у меня есть особый инструмент, которым я пользуюсь и которым хочу поделиться с другими эмигрантами, такими же, как я, потому что он просто полезен. И поскольку этот инструмент, называется Nearby.kz. Вы можете зайти внутрь и просмотреть все законы Республики Казахстан, вы просто задаете ему вопрос, который он выдает вам на английском языке, на языке, который вы понимаете.",
        personEn: "Furuk Hakin Hunter",
        personKz: "Фурук Хакин Хантер",
        personRu: "Фурук Хакин Хантер",
        titleEn: "Businessman",
        titleKz: "Кәсіпкер",
        titleRu: "Предприниматель",
      },
      3: {
        img: "/img/testimonials/Mx.png",
        url: "https://www.instagram.com/reel/C50yYlkoiDK/?igsh=c3lwcHJoNW5kZHMx",
        testimonialEn: "We decided to use Nearby, and since then we have no problems with the law and the government. We created our company in a few minutes and continue to work with this application. This is a great app. I am very grateful that we found him. Thank you very much.",
        testimonialKz: "Біз Nearby-ді пайдалану туралы шешім қабылдадық, содан бері бізде заңмен қатысты мәселелер жоқ. Біз өз компаниямызды бірнеше минут ішінде құрдық және осы қолданбамен жұмыс істеуді жалғастырудамыз. Бұл керемет қосымша. Біз оны тапқанымызға өте ризамыз. Көп рахмет.",
        testimonialRu: "Мы решили воспользоваться Nearby, и с тех пор у нас нет никаких проблем с законом и правительством. Мы создали нашу компанию за несколько минут и продолжаем работать с этим приложением. Это отличное приложение. Я очень благодарен, что мы нашли его. Большое спасибо.",
        personEn: "Emin Demirtay",
        personKz: "Эмин Демиртай",
        personRu: "Эмин Демиртай",
        titleEn: "CEO of ”Green Hi-Tech Energy»",
        titleKz: "“Green Hi-Tech Energy” бас директоры",
        titleRu: "Генеральный директор ”Green Hi-Tech Energy”",
      },
  }

  const handleTestimonialChange = (isNext: boolean) => {
      if (isNext){
          if (currentTestimonialNumber < Object.keys(testimonials).length) {
              setCurrentTestimonialNumber(currentTestimonialNumber + 1);
          } else {
              setCurrentTestimonialNumber(1);
          }
      } else {
          if (currentTestimonialNumber === 1) {
              setCurrentTestimonialNumber(Object.keys(testimonials).length);
          } else {
              setCurrentTestimonialNumber(currentTestimonialNumber - 1);
          }
      }
      console.log(currentTestimonialNumber, Object.keys(testimonials).length)

  }

  const [currentTestimonial, setCurrentTestimonial] = useState<any>(testimonials[currentTestimonialNumber]);

  useEffect(() => {
      setCurrentTestimonial(testimonials[currentTestimonialNumber]);
      }, [currentTestimonialNumber])

  return (
    <>
      <section className={styles.testimonials} id={styles.testimonials}>
        <h2 className={`${styles.section__title} title__center`}>
          <span>{t("testimonials__title")}</span>
        </h2>
        <div className={styles.section__description}>
          {t("testimonials__description")}
        </div>
        <div
          className={`${styles.testimonials__container} ${styles.container} ${styles.grid}`}
        >
          <div className={`${styles.testimonials__item} ${styles.grid}`}>
            <div className={styles.testimonials__wrapper}>
              <Link href={currentTestimonial.url} target="_blank">
                  <img
                    src={currentTestimonial.img}
                    alt="testimonialsImage"
                    className={styles.testimonials__img}
                  />
              </Link>
              <img
                className={styles.testimonials__play}
                src="/img/testimonials/testimonials-play.svg"
                alt="testimonialsPlay"
              />
            </div>
            <div className={styles.testimonials__content}>
              <div className={styles.testimonials__box}>
                <img
                  src="/img/testimonials/testimonials-tick.svg"
                  alt="testimonialsTick"
                />
                <div className={styles.testimonials__say}>
                  {
                      locale === "en"
                        ? currentTestimonial.testimonialEn
                        : locale === "ru"
                          ? currentTestimonial.testimonialRu
                          : currentTestimonial.testimonialKz
                  }
                </div>
                <div className={styles.testimonials__name}>
                  <span>
                    {
                      locale === "en"
                        ? currentTestimonial.personEn
                        : locale === "ru"
                          ? currentTestimonial.personRu
                          : currentTestimonial.personKz
                    }
                  </span>
                  <span>
                    {
                      locale === "en"
                        ? currentTestimonial.titleEn
                        : locale === "ru"
                          ? currentTestimonial.titleRu
                          : currentTestimonial.titleKz
                    }
                  </span>
                </div>
              </div>
              <div className={styles.testimonials__nav}>
                <span>
                    <button onClick={() => handleTestimonialChange(false)}
                        className="d-flex align-items-center">
                      <img src="/img/guide/guide-arrow.svg" alt="previous" />
                    </button>
                </span>
                <span>
                    <button onClick={() => handleTestimonialChange(true)}
                        className="d-flex align-items-center">
                      <img src="/img/guide/guide-arrow.svg" alt="next" />
                    </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
