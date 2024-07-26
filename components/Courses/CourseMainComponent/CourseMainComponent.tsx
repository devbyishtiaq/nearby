import React from "react";
import { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import styles from "./CourseMainComponent.module.css";

interface CourseMainComponentProps {
  baseUrl: string;
  courseDetails: any;
  setCourseDetails: (courseDetails: string) => void;
}

const CourseMainComponent: React.FC<CourseMainComponentProps> = ({
  baseUrl,
  courseDetails,
  setCourseDetails,
}) => {
  const { t } = useTranslation("nearby-courses");
  const [queryText, setQueryText] = useState<string>("");

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {

    }
  };

  return (
    <div className="mt-4">
      <h4>{t("main-components")}</h4>
      <h6>
        <b>{t("knowledge")}</b>
      </h6>
      <p>{t("online-courses")}</p>
      <h6>
        <b>{t("master-classes")}</b>
      </h6>
      <p>{t("video-tutorials")}</p>
      <h6>
        <b>{t("tools")}</b>
      </h6>
      <p>{t("interactive-case-studies")}</p>
      <h6>
        <b>{t("community")}</b>
      </h6>
      <p>{t("forums-discussion")}</p>
      <br></br>

      <div className="d-flex">
        <div>
          <h4>{t("nearby-courses")}</h4>
          <p>{t("education-for-lawyers")}</p>
        </div>
        <div className="ms-auto mt-auto mb-2 d-flex">
            <div className={`input-group ${styles.inputGroup}`}>
                <span
                  className={`input-group-text ${styles.inputIcon}`}
                  id="basic-addon1"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  className={`form-control ${styles.input}`}
                  placeholder={t("search-placeholder")}
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <button
                className={`btn btn-success ${styles.searchButton} ${styles.buttonStyle}`}
                onClick={() => {
                }}
              >
                {t("search")}
              </button>
        </div>

      </div>
      <div className={styles.courseCardsContainer}>
        {courseDetails?.data?.map((course: any, index: number) => (
          <CourseCard
            courseId={course.id}
            courseImage={`${baseUrl}${course.course_photo}`}
            dateText={`${course.course_time}`}
            courseHeader={course.course_title}
            courseDesc={course.course_description}
            tags={course.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseMainComponent;
