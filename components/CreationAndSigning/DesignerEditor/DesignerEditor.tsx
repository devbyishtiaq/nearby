import React, { useEffect, useState } from "react";
import { diffWords } from "diff";
import { useRouter } from "next/router";
import { htmlToText } from "html-to-text";
import styles from "./DesignerEditor.module.css";
import useTranslation from "next-translate/useTranslation";
import { getLocalizedFileName } from "../../../utils/utils";
import DesignerTextEditor from "../DesignerTextEditor/DesignerTextEditor";
// const regex = new RegExp(placeholder.replace("-", " "), "g");

interface DesignerEditorProps {
  email: string;
  token: string;
  fileName: string;
  documentId: string;
  inputList: string[];
  documentName: string;
  webSocketUrl: string;
  copyFileContent: string;
  handleSaveDocument: any;
  originalFileContent: string;
  setFolderId: (folderId: string) => void;
  setDocumentName: (documentName: string) => void;
  setCopyFileContent: (fileContent: string) => void;
  setOriginalFileContent: (fileContent: string) => void;
}

const DesignerEditor: React.FC<DesignerEditorProps> = ({
  email,
  token,
  fileName,
  inputList,
  documentId,
  setFolderId,
  webSocketUrl,
  documentName,
  setDocumentName,
  copyFileContent,
  handleSaveDocument,
  setCopyFileContent,
  originalFileContent,
  setOriginalFileContent,
}) => {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
  const [copyFileContent2, setCopyFileContent2] = useState<string>("");
  const [inCleanVersion, setInCleanVersion] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [editorValues, setEditorValues] = useState<{ [key: string]: string }>(
    {},
  );

  const handleInputChange = (index: any, key: any, value: any) => {
    const placeholderKey = `${index + 1}${key.replaceAll(" ", "")}`;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [placeholderKey]: value,
    }));

    setEditorValues((prevEditorValues) => {
      const updatedEditorValues = { ...prevEditorValues };

      // Remove the previous key-value pair if it exists
      for (const [prevValue, prevKey] of Object.entries(prevEditorValues)) {
        if (prevKey === placeholderKey) {
          delete updatedEditorValues[prevValue];
          break;
        }
      }

      // Add the new key-value pair only if the value doesn't exist already
      if (!Object.keys(prevEditorValues).includes(value)) {
        updatedEditorValues[value] = placeholderKey;
      }

      return updatedEditorValues;
    });
  };

  const handleFileContent = (newContent: string) => {
    // setCopyFileContent(newContent);
    const newText = htmlToText(newContent, { wordwrap: 100 });
    const preCopyText = htmlToText(copyFileContent, { wordwrap: 100 });
    const originalText = htmlToText(originalFileContent, { wordwrap: 100 });
    identifyDifference(newText, preCopyText, newContent, originalText);
  };

  const getUpdatedFileContent = (content: string) => {
    const inputObject: any = {};
    const editorObject: any = {};
    let updatedContent = content;
    inputList?.forEach((placeholder, index) => {
      const placeholderKey = `${index + 1}${placeholder.replaceAll(" ", "")}`;
      const regex = new RegExp(placeholder, "g");
      updatedContent = updatedContent.replaceAll(regex, placeholderKey);
      inputObject[placeholderKey.replaceAll(" ", "")] = "";
      editorObject[placeholderKey] = placeholderKey;
    });

    return { updatedContent, inputObject, editorObject };
  };

  const identifyDifference = (
    newText: string,
    preCopyText: string,
    fileContent: string,
    originalText: string,
  ) => {
    let index = 0;
    let addedWords = "";
    let matchedKey = "";
    let removedWords = "";

    const extractKeywords = (str: string) => {
      return str.match(/\d\{[^\}]*\}/g) || [];
    };

    const oldKeywords = extractKeywords(preCopyText)
    const newKeywords = extractKeywords(newText)
  

  

 


 oldKeywords.forEach((oldKeyword: any, index: any) => {
      const newKeyword = newKeywords[index];

      if (oldKeyword !== newKeyword) {
        const diff = diffWords(oldKeyword, newKeyword);

        diff.forEach((part: any) => {
          if (part.added) {
            addedWords += part.value;
          } else if (part.removed) {
            removedWords += part.value;
          } else {
            addedWords += part.value;
            removedWords += part.value;
          }
        });

        for (const [key, value] of Object.entries(editorValues)) {
          if (key === removedWords) {
            matchedKey = value;
            setEditorValues((prevState) => {
              const updatedValues = { ...prevState };
              delete updatedValues[key];
              updatedValues[addedWords] = value;
              return updatedValues;
            });
            break;
          }
        }

        if (matchedKey) {
          setInputValues((prevState) => {
            if (prevState.hasOwnProperty(matchedKey)) {
              return {
                ...prevState,
                [matchedKey]: addedWords,
              };
            }
            return prevState;
          });
        }
      } else {
        setCopyFileContent(fileContent);
      }
    });
  };

  useEffect(() => {
    const updatedData = getUpdatedFileContent(originalFileContent);
    setInputValues(updatedData.inputObject);
    setEditorValues(updatedData.editorObject);
    setCopyFileContent(updatedData.updatedContent);
    setCopyFileContent2(updatedData.updatedContent);
  }, [inputList]);

  useEffect(() => {
    let updatedContent = copyFileContent2;
    Object.entries(inputValues).forEach(([key, value]) => {
      if (value) {
        const regex = new RegExp(key, "g");
        updatedContent = updatedContent.replaceAll(regex, value);
      }
    });
    setCopyFileContent(updatedContent);
  }, [inputValues]);

  return (
    <div className={styles.container}>
      <div className="d-flex mb-3">
        <h3 className="h5"> {getLocalizedFileName(fileName, locale)}</h3>
        <div className={styles.cleanVersion}>
          <div className="d-flex align-items-center">
            <span className="me-2">{t("clean-option")}</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={inCleanVersion}
                onChange={() => setInCleanVersion(!inCleanVersion)}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        {!inCleanVersion && (
          <div className="col-md-3 mb-3">
            {inputList?.map((keyword, index) => {
              const itemText = keyword.replace("{", "").replace("}", "");
              return (
                <div className="mb-3" key={index}>
                  <label className={`mb-2 text-muted ${styles.smallText}`}>
                    {index + 1}. {itemText.replaceAll(" ", "")}
                  </label>
                  <input
                    className={`form-control ${styles.smallText}`}
                    placeholder={`${itemText.replaceAll(" ", "")}`}
                    value={
                      inputValues[
                        `${index + 1}{${itemText.replaceAll(" ", "")}}`
                      ] || ""
                    }
                    onChange={(e) =>
                      handleInputChange(index, keyword, e.target.value)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className={!inCleanVersion ? "col-md-9" : "col-md-12"}>
          <DesignerTextEditor
            email={email}
            token={token}
            documentId={documentId}
            setFolderId={setFolderId}
            documentName={documentName}
            webSocketUrl={webSocketUrl}
            fileContent={copyFileContent}
            setDocumentName={setDocumentName}
            setCopyFileContent={handleFileContent}
            handleSaveDocument={handleSaveDocument}
            setCopyFileContent2={setCopyFileContent2}
            setOriginalFileContent={setOriginalFileContent}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignerEditor;
