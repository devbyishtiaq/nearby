import React from "react";
import Link from "next/link";
import styles from "./CourseCard.module.css";
import Image from "next/image";

interface CourseCardProps{
    courseId: string,
    courseImage: string,
    dateText: string,
    courseHeader: string,
    courseDesc: string,
    tags: any
}

const CourseCard: React.FC<CourseCardProps> = ({ courseId, courseImage, dateText, courseHeader, courseDesc, tags }) => {
    return (
        <div className={styles.container}>
            <Image src={courseImage} width={320} height={250} alt="Nearby Course" />
            <p className={styles.dateText}>{ dateText }</p>
            <div>
                <Link href={`/course-detail?course-id=${courseId}`} className="d-flex">
                    <h5 className={styles.courseHeaderStyle}>{ courseHeader }</h5>
                    <Image src="/img/courses/arrow-up-right.png" width={20} height={20}
                        alt="Arrow Up Right" className="ms-auto" />
                </Link>
            </div>
            <p className={styles.courseDescStyle}>
                {courseDesc.length > 100 ? `${courseDesc.substring(0, 100)}...` : courseDesc}
            </p>
            <ul className={styles.tagsContainer}>
                {tags.map((tag: any) => (
                    <li key={tag.tag_name}>
                        <button className={styles.tagButton}>{tag.tag_name}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default CourseCard;