import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import AccountLinks from "../components/AccountSettings/AccountLinks/AccountLinks";
import ProfileHeader from "../components/AccountSettings/ProfileHeader/ProfileHeader";
import ProfileDetails from "../components/AccountSettings/ProfileDetails/ProfileDetails";
import ProfileBio from "../components/AccountSettings/ProfileBio/ProfileBio";
import { useSidebar } from "../components/Context/SidebarContext";
import useTranslation from "next-translate/useTranslation";
import styles from "../styles/account-settings.module.css";

const AccountSettings: NextPage = (props: any) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userType, setUserType] = useState();
  const [birthDate, setBirthDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const [availableForProjects, setAvailableForProjects] =
    useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string>(
    `/media/profile_pictures/${props.profilePicture}`,
  );
  const [inEditMode, setInEditMode] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  const router = useRouter();
  const email = props.email;
  const token = props.token;

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const fetchData = async () => {
    try {
      const email = props.email;
      const token = props.token;

      const apiResponse = await fetch("/api/get-profile-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setFirstName(data["firstname"]);
      setLastName(data["lastname"]);
      setUserType(data["user_type"]);
      setBirthDate(data["birthday"]);
      setPhoneNumber(data["phone_number"]);
      setOrganizationName(data["organization_name"]);
      setLocation(data["location"]);
      setUsername(data["username"]);
      setWebsite(data["website"]);
      setBio(data["bio"]);
      setCountry(data["country"]);
      setTimezone(data["time_zone"]);
      setAvailableForProjects(data["available_for_projects"]);
      let profilePicture = data["profile_picture"];
      if (profilePicture) {
        profilePicture = `${props.baseUrl}/${profilePicture}`;
      } else {
        profilePicture = "";
      }
      setProfilePicture(profilePicture);
      const currentProfilePicture = getCookie("profilePicture");
      if (profilePicture && profilePicture !== currentProfilePicture) {
        const updateResponse = await fetch("/api/update-profile-picture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePicture }),
        });

        if (updateResponse.ok) {
          console.log("Profile picture updated in cookie successfully.");
        } else {
          console.error("Failed to update profile picture in cookie.");
        }
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const editUserDetails = async () => {
    try {
      const apiResponse = await fetch("/api/change-profile-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          username,
          firstName,
          lastName,
          birthDate,
          phoneNumber,
          organizationName,
          location,
          website,
          bio,
          country,
          timezone,
          availableForProjects,
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setInEditMode(false);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const changeProfileImage = async () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Token ${token}`);

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("file", selectedFile);

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(
      `${props.baseUrl}/v1/profile/profile-picture-change/`,
      requestOptions,
    );
    const responseJson = await response.json();
    router.reload();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      changeProfileImage();
    }
  }, [selectedFile]);

  const { t } = useTranslation("account-settings");

  const urls = [
    { urlName: t("account-settings"), urlLink: "/account-settings" },
    { urlName: t("my-profile"), urlLink: "/my-profile" },
  ];

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
          <Breadcrumbs urlList={urls} />
          <div className={styles.accountSettingsContainer}>
            <div>
              <AccountLinks userType={userType} />
              <ProfileHeader
                profilePicture={profilePicture}
                username={username}
                email={props.email}
                inEditMode={inEditMode}
                setInEditMode={setInEditMode}
                editUserDetails={editUserDetails}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                selectedFileRef={selectedFileRef}
              />
              <ProfileDetails
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                birthdate={birthDate}
                setBirthdate={setBirthDate}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                organizationName={organizationName}
                setOrganizationName={setOrganizationName}
                location={location}
                setLocation={setLocation}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                email={props.email}
              />
              <ProfileBio
                username={username}
                setUsername={setUsername}
                website={website}
                setWebsite={setWebsite}
                bio={bio}
                setBio={setBio}
                country={country}
                setCountry={setCountry}
                timezone={timezone}
                setTimezone={setTimezone}
                availableForProjects={availableForProjects}
                setAvailableForProjects={setAvailableForProjects}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountSettings;

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
  console.log(profilePicture);
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
