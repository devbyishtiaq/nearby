import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import useTranslation from "next-translate/useTranslation";
import styles from "../styles/course-documents.module.css";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Footer from "../components/General/Footer/Footer";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import CourseDocumentsHeader from "../components/Courses/CourseDocumentsHeader/CourseDocumentsHeader";
import CourseDocumentList from "../components/Courses/CourseDocumentList/CourseDocumentList";
import { useSidebar } from '../components/Context/SidebarContext';

const CourseDocuments: NextPage = (props: any) => {
  const [documentList, setDocumentList] = useState<any>([]);
  const { t } = useTranslation("nearby-courses");
  const { sidebarHidden, setSidebarHidden } = useSidebar();

  const urls = [
    { urlName: t("nearby-courses"), urlLink: "/nearby-courses" },
    { urlName: t("course-documents"), urlLink: "/course-documents" },
  ];

  const getDocuments = async () => {
    try {
      const { email, token } = props;

      const apiResponse = await fetch('/api/courses-get-document-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setDocumentList(data.course_details);

    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  const downloadFunc = async (documentId: any) => {

    try {
      const response = await fetch(`/api/courses/download-document?documentId=${documentId}`);
      if (!response.ok) {
        throw new Error('Document not found');
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'document';

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

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
                setSidebarHidden={setSidebarHidden} />
          <Breadcrumbs urlList={urls} />
          <div className={styles.courseDocumentsContainer}>
            <CourseDocumentsHeader />
            <CourseDocumentList
              documentList={documentList}
              setDocumentList={setDocumentList}
              baseUrl={props.baseUrl}
              downloadFunc={downloadFunc}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDocuments;

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
