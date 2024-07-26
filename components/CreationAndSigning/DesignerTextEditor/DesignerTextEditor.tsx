import React, { useState } from "react";
import TextArea from "./TextArea";
import TextEditorTopMenu from "./TextEditorTopMenu";
import styles from "./DesignerTextEditor.module.css";

interface DesignerTextEditorProps {
  email: string;
  token: string;
  documentId: string;
  fileContent: string;
  documentName: string;
  webSocketUrl: string;
  handleSaveDocument: any;
  setFolderId: (folderId: string) => void;
  setDocumentName: (documentName: string) => void;
  setCopyFileContent: (fileContent: string) => void;
  setCopyFileContent2: (fileContent: string) => void;
  setOriginalFileContent: (fileContent: string) => void;
}

const DesignerTextEditor: React.FC<DesignerTextEditorProps> = ({
  email,
  token,
  documentId,
  fileContent,
  setFolderId,
  documentName,
  webSocketUrl,
  setDocumentName,
  setCopyFileContent,
  handleSaveDocument,
  setCopyFileContent2,
  setOriginalFileContent,
}) => {
  const [padding, setPadding] = useState({
    top: 2.5,
    left: 2.5,
    right: 2.5,
    bottom: 2.5,
  });
  return (
    <div className={styles.container}>
      <div>
        <TextEditorTopMenu
          email={email}
          token={token}
          documentId={documentId}
          setFolderId={setFolderId}
          fileContent={fileContent}
          documentName={documentName}
          setDocumentName={setDocumentName}
          handleSaveDocument={handleSaveDocument}
          setCopyFileContent={setCopyFileContent}
          setCopyFileContent2={setCopyFileContent2}
          setOriginalFileContent={setOriginalFileContent}
        />
        <TextArea
          padding={padding}
          setPadding={setPadding}
          fileContent={fileContent}
          webSocketUrl={webSocketUrl}
          setCopyFileContent={setCopyFileContent}
        />
      </div>
    </div>
  );
};

export default DesignerTextEditor;
