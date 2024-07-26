import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Footer from "../components/General/Footer/Footer";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import CourseHeader from "../components/Courses/CourseHeader/CourseHeader";
import CourseTarget from "../components/Courses/CourseTarget/CourseTarget";
import CourseMainComponent from "../components/Courses/CourseMainComponent/CourseMainComponent";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import { courseList } from "../services/courseList";
import { useSidebar } from '../components/Context/SidebarContext';

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/nearby-courses.module.css";

const NearbyCourses: NextPage = (props: any) => {
  const [courseDetails, setCourseDetails] = useState<any>([]);
  const { t } = useTranslation("nearby-courses");
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  useEffect(() => {
    const searchType: string = "1";
    const fetchData = async () => {
      try {
        const data = await courseList(props.email, props.token, searchType);
        setCourseDetails(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (props.email && props.token) {
      fetchData();
    }
  }, [props.email, props.token]);

  const urls = [{ urlName: t("nearby-courses"), urlLink: "/nearby-courses" }];

  return (
    <div>
      <div className="aika-general-container">
        <div className={sidebarHidden ? "col-md-2" : ""}>
            <Sidebar email={props.email}
                username={props.username}
                profilePicture={props.profilePicture}
                baseUrl={props.baseUrl}
                sidebarHidden={sidebarHidden}
                setSidebarHidden={setSidebarHidden} />
        </div>
        <div className={sidebarHidden ? "col-md-10" : "col-12 col-md-12" }>
            <Topbar username={props.username} sidebarHidden={sidebarHidden}
                setSidebarHidden={setSidebarHidden}
                 />
          <Breadcrumbs urlList={urls} />
          <div className={styles.coursesContainer}>
            <CourseHeader />
            <CourseTarget />
            <CourseMainComponent
              courseDetails={courseDetails}
              setCourseDetails={setCourseDetails}
              baseUrl={props.baseUrl}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NearbyCourses;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const token: string = context.req.cookies.token || "";
  const decodedToken: any = jwtDecode(token) as {
    userId: string;
    access: string;
    profilePicture: string;
  };
  const accessToken: string = decodedToken["access"] || "";
  const baseUrl: string = process.env.BASE_URL || "";
  const profilePicture: string = decodedToken["profilePicture"] || "";
  return {
    props: {
      email: decodedToken.userId,
      token: accessToken,
      username: decodedToken.username,
      baseUrl: baseUrl,
      profilePicture: profilePicture,
    },
  };
};
