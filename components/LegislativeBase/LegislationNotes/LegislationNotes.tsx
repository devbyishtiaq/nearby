import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import ModalStyles from "./Modal.module.css";
import {
    faXmark,
    faPenClip,
    faTrashCan
    } from "@fortawesome/free-solid-svg-icons";
import useTranslation from "next-translate/useTranslation";
import styles from "./LegislationNotes.module.css";

const ModalStyle: any = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "500px",
    padding: "20px 30px",
    marginRight: "-50%",
    borderRadius: "5px",
    transform: "translate(20%, -50%)",
  },
};

const deleteModalStyle: any = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "400px",
    padding: "10px 30px",
    marginRight: "-50%",
    borderRadius: "5px",
    transform: "translate(-50%, -80%)",
    zIndex: "1000000000",
    position: "absolute",
  },
  overlay: {
    zIndex: "1000000000",
  },
};

interface LegislationNotesProps {
  articleId: string;
  token: string;
  modalIsOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedText: any;
}

const LegislationNotes: React.FC<LegislationNotesProps> = ({
    articleId, token, modalIsOpen, setIsOpen, selectedText }) => {
  const router = useRouter();
  console.log(selectedText)
  const [legislativeNotes, setLegislativeNotes] = useState<any>([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState<string>("");
  const [deleteNoteId, setDeleteNoteId] = useState<any>(null);
  const { t } = useTranslation("legislative-base");

  useEffect(() => {
    setNoteContent(selectedText);
  }, [selectedText]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getLegislativeNotes = async () => {
    try {
      const response = await fetch('/api/legislative-base/get-legislative-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to get legislative notes from API');
      }

      const responseJson = await response.json();
      setLegislativeNotes(responseJson["data"]);
    } catch (error) {
      console.error('Error to get legislative notes:', error);
    }
  };

  const saveLegislativeNote = async () => {
    try {
      const response = await fetch('/api/legislative-base/add-legislative-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId, noteContent, token }),
      });
      setNoteContent("");
      if (!response.ok) {
        throw new Error('Failed to get legislative notes from API');
      }
      const responseJson = await response.json();
      getLegislativeNotes();
      setIsOpen(false);
    } catch (error) {
      console.error('Error to get legislative notes:', error);
    }
  };

  const deleteLegislativeNote = async () => {
    try {
      const noteId: any = deleteNoteId;
      const response = await fetch('/api/legislative-base/delete-legislative-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteId, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to get legislative notes from API');
      }

      const responseJson = await response.json();
      router.reload();
    } catch (error) {
      console.error('Error to get legislative notes:', error);
    }
  };

  useEffect(() => {
    getLegislativeNotes();
  }, []);

  return (
    <div className={styles.container}>
        <Modal
            isOpen={deleteModalIsOpen}
            onRequestClose={() => setDeleteModalIsOpen(!deleteModalIsOpen)}
            style={deleteModalStyle}
          >
            <div className="d-flex mb-2">
              <h5 className="text-dark">
                <b>{t("delete-note")}</b>
              </h5>
              <button onClick={() => setDeleteModalIsOpen(!deleteModalIsOpen)} className="ms-auto">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className="mt-3">
              {t("delete-note-question")}
            </div>
            <div className="d-flex justify-content-center my-3">
                <button className="btn btn-danger"
                    onClick={() => deleteLegislativeNote()}>
                    {t("delete")}
                </button>
            </div>
        </Modal>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={ModalStyle}
            contentLabel="Example Modal"
          >
            <div className="d-flex mb-2">
              <h5 className="text-success">
                <b>{t("legislative-note-header")}</b>
              </h5>
              <button onClick={closeModal} className="ms-auto">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div>
              <div className={ModalStyles.contact__container}>
                <div className={ModalStyles.form__content}>
                  <textarea
                    placeholder={t("note-content")}
                    className="form-control border"
                    value={noteContent}
                    rows={4}
                    onChange={(e) => setNoteContent(e.target.value)}
                  />
                </div>
                <button onClick={() => saveLegislativeNote()}
                    className="d-flex ms-auto me-3 btn btn-success">{t("submit")}
                </button>
              </div>
              {legislativeNotes.length > 0 ? (
                    <div className={styles.legislativeNotesListContainer}>
                        <table>
                            <tbody>
                            {legislativeNotes.map((note: { note: string, id: string, note_content: string }, index: number) => (
                                <tr key={index} className="border-bottom">
                                    <td className="py-2 pe-3">
                                        <button className="text-start">
                                            <span className={styles.noteText}>
                                                {note.note_content || "..."}
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                        <span className={styles.noteActions}>
                                            <button onClick={() => {setDeleteNoteId(note["id"]); setDeleteModalIsOpen(true)}}>
                                                <FontAwesomeIcon icon={faTrashCan}
                                                    className="text-danger me-2"
                                                    size="xs" />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p>
                            {t("no-note")}
                        </p>
                    </div>
                )}
            </div>
          </Modal>
    </div>
  );
};

export default LegislationNotes;
