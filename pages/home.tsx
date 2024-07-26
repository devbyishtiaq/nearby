import { NextPage, GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import Circle from "../components/Home/Circle/Circle";
import Cards from "../components/Home/Cards/Cards";
import { useSidebar } from '../components/Context/SidebarContext';

const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState<boolean>(false);

    useEffect(() => {
        const updateTarget = () => {
            if (window.innerWidth <= width) {
                console.log(window.innerWidth)
                setTargetReached(true);
            } else {
                setTargetReached(false);
            }
        };

        updateTarget();
        window.addEventListener("resize", updateTarget);

        return () => window.removeEventListener("resize", updateTarget);
    }, [width]);

    return targetReached;
};

const HomePage: NextPage = (props: any) => {
    const { sidebarHidden, setSidebarHidden } = useSidebar();
    const isMobileOrTablet = useMediaQuery(1000);
    const [referer, setReferer] = useState<string>(props.referer || "");

    return (
        <div>
            <div className="aika-general-container">
                <div className={sidebarHidden ? "col-md-2" : ""}>
                    <Sidebar
                        email={props.email}
                        username={props.username}
                        profilePicture={props.profilePicture}
                        baseUrl={props.baseUrl}
                        sidebarHidden={sidebarHidden}
                        setSidebarHidden={setSidebarHidden}
                    />
                </div>
                <div className={sidebarHidden ? "col-md-10" : "col-12 col-md-12"}>
                    <Topbar
                        username={props.username}
                        sidebarHidden={sidebarHidden}
                        setSidebarHidden={setSidebarHidden}
                    />
                    {
                        referer.includes("/login") && !isMobileOrTablet
                        ?   sidebarHidden
                            ? <div className={styles.circleTopContainer}>
                                <Circle />
                              </div>
                            : <Cards />
                        :   <Cards />
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const referer = context.req.headers.referer || '';
    const token: string = context.req.cookies.token || "";
    const decodedToken: any = jwtDecode(token) as {
        userId: string;
        access: string;
        profilePicture: string;
    };
    const accessToken: string = decodedToken["access"] || "";
    const baseUrl: string = process.env.BASE_URL || "";
    const profilePicture: string = decodedToken["profilePicture"] || "";
    console.log(profilePicture)
    return {
        props: {
            email: decodedToken.userId,
            token: accessToken,
            username: decodedToken.username,
            baseUrl: baseUrl,
            profilePicture: profilePicture,
            referer: referer
        },
    };
};
