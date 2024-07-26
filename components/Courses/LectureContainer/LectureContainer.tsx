import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import styles from "./LectureContainer.module.css";

interface LectureContainerComponentProps {
    lectureData: any;
}

const LectureContainerComponent: React.FC<LectureContainerComponentProps> = (
    {lectureData}) => {
  const { t } = useTranslation("nearby-courses");
  const [activeLecture, setActiveLecture] = useState<number>(1);
  const [lectureVideo, setLectureVideo] = useState<string | null>(null);
  const [lectureDescription, setLectureDescription] = useState<string>("");

  useEffect(() => {
      if (lectureData.length !== 0){
        setLectureVideo(lectureData[0]["video_url"]);
      }
  },[lectureData] )

  return (
    <div className={styles.container}>
        <div className="row d-flex justify-content-center">
            <div className="col-md-3">
                {
                    lectureData.map((lecture: any, index: number) => {
                        return(
                            <button className={activeLecture === lecture.video_order ? styles.activeLecture : styles.deactiveLecture}
                                onClick={() => {
                                    setActiveLecture(lecture.video_order);
                                    setLectureDescription(lecture.video_description);
                                    setLectureVideo(lecture.video_url)}}>
                                <span className={activeLecture === lecture.video_order ? "text-success" : ""}>Lecture { lecture.video_order }</span>
                                {
                                    activeLecture === lecture.video_order
                                    ?   <Image src="/img/general/arrow-right.png" width={15} height={10} alt="Arrow Right" />
                                    :   <></>
                                }
                            </button>
                        )
                    })
                }
            </div>
            <div className="col-md-8">
                {
                    lectureVideo
                    ?   <div>
                            <iframe className="rounded" src={lectureVideo} width="900" height="640" allow="autoplay"></iframe>
                            <p className="mt-3">{ lectureDescription }</p>
                        </div>
                    :   <></>
                }
            </div>
        </div>
    </div>
  );
};

export default LectureContainerComponent;
