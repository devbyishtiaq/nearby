import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/AIKAGeneral/Sidebar/Sidebar";
import Topbar from "../components/AIKAGeneral/Topbar/Topbar";
import Footer from "../components/General/Footer/Footer";
import Breadcrumbs from "../components/AIKAGeneral/Breadcrumbs/Breadcrumbs";
import StartChatBox from "../components/AIKA/StartChatBox/StartChatBox";
import SessionsList from "../components/AIKA/SessionsList/SessionsList";
import ChatArea from "../components/AIKA/ChatArea/ChatArea";
import { useSidebar } from '../components/Context/SidebarContext';
import useTranslation from "next-translate/useTranslation";
import styles from "../styles/ai-ka.module.css";

interface AIKAPageProps {
  email: string;
  token: string;
  username: string;
  baseUrl: string;
  profilePicture: string;
}

const AIKAPage: NextPage<AIKAPageProps> = ({
  email,
  token,
  username,
  baseUrl,
  profilePicture,
}) => {
  const { t } = useTranslation("common");
  const { sidebarHidden, setSidebarHidden } = useSidebar();
  const router = useRouter();
  const { locale } = router;
  const [sessionId, setSessionId] = useState<string | undefined>(
    router.query["session-id"] as string | undefined,
  );
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [activeSessionName, setActiveSessionName] = useState<
    string | undefined
  >("");
  const [currentQuery, setCurrentQuery] = useState<string>("");

  async function getMessages() {
    try {
      const response = await fetch("/api/aika-get-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const dataMessages = data.messages;
      let lastMessage = dataMessages[dataMessages.length - 1];
      let lastAnswer = lastMessage.answer;
      lastMessage = lastMessage.prompt;
      console.log(lastMessage);
      let promptJson = JSON.parse(lastMessage.replace(/'/g, '"'));
      promptJson.push({ role: "assistant", content: lastAnswer });
      console.log(promptJson);
      setMessages(promptJson);
      console.log(messages);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  async function sendMessage(query: string) {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: currentQuery },
    ]);
    setCurrentQuery("");
    try {
      const response = await fetch("/api/aika-send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          messages,
          sessionId,
          query,
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      let answer = data.answer.replace("'", " ").replace('"', " ");
      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  useEffect(() => {
    setSessionId(router.query["session-id"]?.toString());
  }, [router.query]);

  useEffect(() => {
    setMessages([]);
    getMessages();
  }, [sessionId]);

  const urls = [{ urlName: t("legal-consultant-AI-KA"), urlLink: "/ai-ka" }];

  return (
    <div>
      <div className="aika-general-container">
        <div className={sidebarHidden ? "col-md-2" : ""}>
            <Sidebar email={email}
                username={username}
                profilePicture={profilePicture}
                baseUrl={baseUrl}
                sidebarHidden={sidebarHidden}
                setSidebarHidden={setSidebarHidden} />
        </div>
        <div className={sidebarHidden ? "col-md-10" : "col-12 col-md-12" }>
            <Topbar username={username} sidebarHidden={sidebarHidden}
                setSidebarHidden={setSidebarHidden} />
          <Breadcrumbs urlList={urls} />
          <div className={styles.aikaContainer}>
            <div>
              <h5>{t("legal-consultant-AI-KA")}</h5>
            </div>
            <div className={styles.aikaLogoContainer}>
              {!sessionId ? (
                <StartChatBox email={email} token={token} />
              ) : (
                <div className="row">
                  <div className="col-12 col-md-4">
                    <SessionsList
                      email={email}
                      token={token}
                      setActiveSessionName={setActiveSessionName}
                    />
                  </div>
                  <div className="col-12 col-md-8">
                    <ChatArea
                      messages={messages}
                      activeSessionName={activeSessionName}
                      sendMessage={sendMessage}
                      currentQuery={currentQuery}
                      setCurrentQuery={setCurrentQuery}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIKAPage;

export const getServerSideProps: GetServerSideProps<AIKAPageProps> = async (
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
