import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Calendar from 'react-calendar';
import useTranslation from "next-translate/useTranslation";
import styles from "./MyPlannerDetails.module.css";
/*import 'react-calendar/dist/Calendar.css';*/

interface MyPlannerDetailsProps {
  email: string;
  token: string;
  noteContent: string;
  setNoteContent: (noteContent: string) => void;
}

const MyPlannerDetails: React.FC<MyPlannerDetailsProps> = ({ email, token, noteContent, setNoteContent }) => {
  const { t, lang } = useTranslation("my-profile");
  const router = useRouter();
  const [value, setValue] = useState<Date | null>(new Date());
  const [timeState, setTimeState] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [noteList, setNoteList] = useState<any[]>([]);

  function formatDateToYYYYMMDD(date: Date | null): string {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDateToTarget(DateString: string): string {
    const date = new Date(DateString);

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }

  const createNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!value) {
        console.error("Date value is null");
        return;
      }

      const noteDateTime = `${formatDateToYYYYMMDD(value)}T${timeState}:00`;
      console.log("Note DateTime:", noteDateTime);

      const response = await fetch("/api/profile/user-note-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, noteContent, noteDateTime, token }),
      });

      if (response.status === 200) {
        router.reload();
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error during note creation:", error);
    }
  };

  const listUserNote = async (targetDay: string) => {
    try {
      const response = await fetch("/api/profile/user-note-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, targetDay, token }),
      });
      const responseJson = await response.json();
      setNoteList(responseJson.data);
    } catch (error) {
      console.error("Error during note listing:", error);
    }
  };

  const userNoteDelete = async (targetId: string) => {
    try {
      await fetch("/api/profile/user-note-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, targetId, token }),
      });
      router.reload();
    } catch (error) {
      console.error("Error during note deletion:", error);
    }
  };

  useEffect(() => {
    if (value) {
      const targetDay = formatDateToYYYYMMDD(value);
      listUserNote(targetDay);
    }
  }, [value]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDateChange = (value: Date | Date[]) => {
    if (Array.isArray(value)) {
      setValue(value[0]); // If it's a range, just take the first date
    } else {
      setValue(value);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-md-4">
        <p>
          <b>{t("my-planner")}</b>
        </p>
        <p className={styles.headerDesc}>{t("save-notes")}</p>
        <div>
          {isClient && (
            <Calendar locale={lang} onChange={handleDateChange as any} value={value} />
          )}
        </div>
      </div>
      <div className={`col-md-8 ${styles.border}`}>
        <div className={`mt-3 ${noteList.length > 0 ? "border" : ""} p-3 rounded`}>
          {noteList.map((note: any, index: number) => (
            <div key={index}>
              <div className="d-flex">
                <label className="mb-2 text-muted">{t("notes")}</label>
                <button className="text-muted ms-auto" onClick={() => userNoteDelete(note.id)}>
                  <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                </button>
              </div>
              <div className={styles.noteContentDiv}>
                <p>{note.note_content}</p>
              </div>
              <div>
                <p className={styles.noteTargetTime}>
                  {formatDateToTarget(note.target_time)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <div>
            <label className="mb-2 text-muted">{t("time")}</label>
            <input
              type="time"
              className="mb-2 ms-3 p-2 border rounded text-success"
              value={timeState}
              onChange={(e) => setTimeState(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 text-muted">{t("notes")}</label>
            <textarea
              className="form-control"
              rows={3}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
          <button className="btn btn-success mt-3" onClick={createNote}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            {t("add-note")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPlannerDetails;
