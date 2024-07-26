import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import {useState} from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Footer from "../components/General/Footer/Footer";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import CourseDetailComponent from "../components/Courses/CourseDetail/CourseDetail";
import { useSidebar } from '../components/Context/SidebarContext';

import useTranslation from "next-translate/useTranslation";
import styles from "../styles/course-detail.module.css";

const CourseDetail: NextPage = (props: any) => {
  const { t } = useTranslation("common");
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  const urls = [
    { urlName: t("nearby-courses"), urlLink: "/nearby-courses" },
    { urlName: t("course"), urlLink: "/course" },
  ];

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
                setSidebarHidden={setSidebarHidden}/>
          <Breadcrumbs urlList={urls} />
          <div className={styles.courseDetailContainer}>
            <CourseDetailComponent
              email={props.email}
              token={props.token}
              baseUrl={props.baseUrl}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;

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
