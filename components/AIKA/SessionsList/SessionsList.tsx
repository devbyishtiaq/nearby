import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPen,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { deleteChatGptSession } from "../../../services/deleteChatGptSession";
import Session from "../Session/Session";

import useTranslation from "next-translate/useTranslation";
import styles from "./SessionsList.module.css";

interface SessionsListProps {
  email: string;
  token: string;
  setActiveSessionName: (value: string | undefined) => void;
}

const SessionsList: React.FC<SessionsListProps> = ({
  email,
  token,
  setActiveSessionName,
}) => {
  const [sessionList, setSessionList] = useState([]);
  const router = useRouter();
  const { query } = router;
  const sessionId: string | null = Array.isArray(query["session-id"])
    ? query["session-id"][0]
    : query["session-id"] ?? null;
  const [activeSessionId, setActiveSessionId] = useState<string>(
    sessionId || "",
  );

  const { t } = useTranslation("common");

  const fetchData = async () => {
    try {
      const apiResponse = await fetch("/api/get-session-list", {
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
      setSessionList(data["sessions"]);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  async function addAChat(email: string, token: string) {
    try {
      const response = await fetch("/api/aika-get-session-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      router.push({
        pathname: "/ai-ka",
        query: { "session-id": data },
      });
    } catch (error: any) {
      console.error("Error:", error.message);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    router.push(`ai-ka?session-id=${activeSessionId}`);
  }, [activeSessionId]);

  return (
    <div className={`${styles.container} border-end`}>
      <div className={`${styles.sessionsContainer} border-bottom`}>
        {sessionList.map(
          (session: { session_title: string; session_id: string }, index) => (
            <Session
              email={email}
              token={token}
              session_id={session.session_id}
              session_title={session.session_title}
              activeSessionId={activeSessionId}
              setActiveSessionId={setActiveSessionId}
              setActiveSessionName={setActiveSessionName}
            />
          ),
        )}
      </div>
      <div className="d-grid gap-2 mt-3 pb-3 border-bottom">
        <button
          className="btn btn-success"
          type="button"
          onClick={() => addAChat(email, token)}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" /> {t("add-chat")}
        </button>
      </div>
      <div className={`${styles.warningContainer} pt-3`}>
        <Image
          src="/img/general/exclamation-icon.png"
          width={20}
          height={20}
          alt="Exclamation"
        />
        <div className="d-flex mt-2">
          <span>
            {t("aika-warning")} &nbsp;
            <Link href="/search-specialist" className="text-dark border-bottom">
              {t("aika-specialist")}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionsList;
