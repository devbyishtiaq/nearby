import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Image from "next/image";
import styles from "./DesignerDocumentList.module.css";
import { Accordion } from "react-bootstrap";
import { documentGetSecondFolders } from "../../../services/documentGetSecondFolders";
import { documentGetFiles } from "../../../services/documentGetFiles";
import { getLocalizedFileName } from "../../../utils/utils";

interface DesignerDocumentListProps {
  parentFolders: { id: string; parent_folder_name: string }[];
}

const DesignerDocumentList: React.FC<DesignerDocumentListProps> = ({
  parentFolders,
}) => {
  const [fileList, setFileList] = useState<any>([]);
  const { t } = useTranslation("creation-signing");
  const [secondFolderList, setSecondFolderList] = useState<any>([]);
  const { locale } = useRouter();

  async function getMessages(parentFolderId: string) {
    setSecondFolderList([]);
    const secondFolderResponse: any =
      await documentGetSecondFolders(parentFolderId);
    setSecondFolderList(secondFolderResponse?.second_folders || []);
  }

  async function getFiles(secondFolderId: string) {
    setFileList([]);
    const fileResponse: any = await documentGetFiles(secondFolderId);
    setFileList(fileResponse?.file_contents || []);
  }

  useEffect(() => {
    getMessages(parentFolders[0]?.id.toString() || "1");
  }, [parentFolders]);

  return (
    <div className={styles.container}>
      <h5>{t("use-document-designer")}</h5>
      <div className="d-flex">
        <Accordion defaultActiveKey="0" className={styles.accordion}>
          {parentFolders.map((parentFolder, index) => (
            <Accordion.Item
              key={index}
              eventKey={index.toString()}
              className={`mt-2 ${styles.accordionContainer}`}
            >
              <Accordion.Header
                className={styles.articleHeader}
                onClick={() => getMessages(parentFolder.id)}
              >
                {getLocalizedFileName(parentFolder.parent_folder_name, locale)}
              </Accordion.Header>
              <Accordion.Body>
                <Accordion className={styles.accordion}>
                  {secondFolderList.map(
                    (
                      secondFolder: { id: any; second_folder_name: string },
                      index: number,
                    ) => (
                      <Accordion.Item
                        key={index}
                        eventKey={index.toString()}
                        className={`mt-2 ${styles.accordionContainer}`}
                      >
                        <Accordion.Header
                          className={styles.articleHeader}
                          onClick={() => getFiles(secondFolder.id)}
                        >
                          {getLocalizedFileName(
                            secondFolder.second_folder_name,
                            locale,
                          )}
                        </Accordion.Header>
                        <Accordion.Body>
                          {fileList?.map((file: any, index: any) => (
                            <div
                              key={index}
                              className={`d-flex mt-2 mb-3 ${styles.contentContainer}`}
                            >
                              <Image
                                src="/img/document/word.png"
                                width={25}
                                height={25}
                                alt="Document Icon"
                                className="me-2 ms-5"
                              />
                              <Link
                                href={`/document-designer-editor?document-template=${file.id}`}
                              >
                                <span
                                  className={`${styles.valueText} border-bottom text-dark`}
                                >
                                  {getLocalizedFileName(file.file_name, locale)}
                                </span>
                              </Link>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ),
                  )}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default DesignerDocumentList;
