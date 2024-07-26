import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import styles from "./CourseDetail.module.css";
import BackButton from "../../General/BackButton/BackButton";
import Rating from "../../General/Rating/Rating";
import LectureContainer from "../LectureContainer/LectureContainer";

interface CourseDetailComponentProps {
    email: string;
    token: string;
    baseUrl: string;
}

function formatDate(dateString: any) {
  const date:any = new Date(dateString);
  const options:any = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

const CourseDetailComponent: React.FC<CourseDetailComponentProps> = (
    {email, token, baseUrl}) => {
  const { t } = useTranslation("nearby-courses");
  const [queryText, setQueryText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [courseId, setCourseId] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("Detail");
  const [courseDetailData, setCourseDetailData] = useState<any>([]);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseTime, setCourseTime] = useState<string>("");
  const [courseRating, setCourseRating] = useState<number>(0);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [courseLecturerPhoto, setCourseLecturerPhoto] = useState<string>("");
  const [lecturerName, setLecturerName] = useState<string>("");
  const [lecturerTitle, setLecturerTitle] = useState<string>("");
  const [lecturerLanguages, setLecturerLanguages] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [lecturerQualifications, setLecturerQualifications] = useState<any>([]);
  const [lectureList, setLectureList] = useState<any>([]);
  const [courseDescription, setCourseDescription] = useState<string>("");

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {

    }
  };

  const getCourseDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/courses/course-detail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, courseId }),
      });
      const data = await response.json();
      const detailData = data["course_details"];
      setCourseDetailData(detailData);
      setCourseTitle(detailData["course_title"]);
      setCourseTime(formatDate(detailData["course_time"]));
      setCourseRating(detailData["average_rating"]);
      setCourseLecturerPhoto(detailData["course_lecturer"][0]["lecturer_photo"]);
      setLecturerName(detailData["course_lecturer"][0]["lecturer_name"]);
      setLecturerTitle(detailData["course_lecturer"][0]["lecturer_title"])
      setLecturerLanguages(detailData["course_lecturer"][0]["lecturer_languages"].join(', '));
      setLocation(detailData["course_lecturer"][0]["user"]["location"]);
      setLecturerQualifications(detailData["course_lecturer"][0]["lecturer_qualifications"]);
      setLectureList(data["videos"]);
      console.log(data["videos"])
      setCourseDescription(detailData["course_description"]);
    } catch (error) {
      console.error("Error during login:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const courseId = router.query["course-id"];
    if (courseId) {
        console.log(courseId)
        setCourseId(courseId);
        getCourseDetail();
    }
  }, [courseId]);

  return (
    <div className={styles.container}>
        <div className="d-flex">
            <BackButton />
            <div>
                <Rating ratingCount={courseRating} />
                <h6 className="mt-2">{ courseTitle }</h6>
                <span className="text-success">{ courseTime }</span>
            </div>
            <div className={`ms-auto align-items-center d-flex ${styles.searchInputContainer}`}>
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
                      placeholder={t("search")}
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                </div>
        </div>
        <div className="d-flex mt-3 gap-2">
            <button className={activeTab === "Detail" ? "btn btn-outline-success": "btn btn-outline-success border-0"}
                onClick={() => setActiveTab("Detail")} >Course Detail</button>
            <button className={activeTab === "Review" ? "btn btn-outline-success": "btn btn-outline-success border-0"}
                onClick={() => setActiveTab("Review")} >Course Reviews
            </button>
        </div>

        {
            activeTab === "Detail"
            ?   <div>
                    <div className="d-flex">
                        <div>
                            {
                                courseLecturerPhoto
                                ?   <Image src={`${baseUrl}${courseLecturerPhoto}`} width={150} height={150} alt="Profile Photo"
                                    className="rounded mt-3 ms-3"/>
                                :   <></>
                            }
                        </div>
                        <div className="pt-3 ps-3 d-flex flex-column">
                            <span><b>{ lecturerName }</b></span>
                            <span className="text-secondary">{ lecturerTitle }</span>
                            <div className="d-flex mt-2">
                                <Image src="/img/general/world-icon.png" width={20} height={20} alt="Languages" />
                                <span className={`${styles.languageText} text-secondary`}>{ lecturerLanguages }</span>
                                <Image src="/img/general/location-icon.png" width={15} height={15} alt="Location"
                                    className="ms-2 me-2" />
                                <span className={`${styles.languageText} text-secondary`}>{ location }</span>
                            </div>
                            <div className="d-flex mt-2">
                                {
                                    lecturerQualifications.map((qualification: any, index: number) => {
                                      const iconList = ["qualify-1.png", "qualify-2.png"];
                                      const randomIcon = iconList[Math.floor(Math.random() * iconList.length)];

                                      return (
                                        <div key={index} className="d-flex me-3">
                                          <img src={`/img/general/${randomIcon}`} alt={`Qualification ${index}`}
                                            width={20} height={20} />
                                          <p className={`ms-2 ${styles.languageText}`}>{qualification}</p>
                                        </div>
                                      );
                                    })
                                  }
                            </div>
                        </div>


                    </div>
                    <div className="mt-3">
                        <h5>Course Description</h5>
                        <p>{ courseDescription }</p>
                        <LectureContainer lectureData={lectureList} />
                    </div>
                </div>
            :   <></>
        }

    </div>
  );
};

export default CourseDetailComponent;
