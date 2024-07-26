import { NextPage, GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {useState} from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import UnderDevelopment from "../components/General/UnderDevelopment/UnderDevelopment";
import { useSidebar } from '../components/Context/SidebarContext';

const Marketplace: NextPage = (props: any) => {
    const { sidebarHidden, setSidebarHidden } = useSidebar();
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
                    <UnderDevelopment />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Marketplace;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const token: string = context.req.cookies.token || "";
  const decodedToken: any = jwtDecode(token)  as {
        userId: string; access: string, profilePicture: string };
  const accessToken: string = decodedToken["access"] || "";
  const baseUrl: string = process.env.BASE_URL || "";
  const profilePicture: string = decodedToken["profilePicture"] || "";
    return { props: { email: decodedToken.userId, token: accessToken,
        username: decodedToken.username,
        baseUrl: baseUrl,
        profilePicture: profilePicture
    } };
  };