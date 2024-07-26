import React, { useEffect, useRef, useState } from "react";
import { myIconPack } from "./IconPack";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import useTranslation from "next-translate/useTranslation";

// const wrapTablesWithDiv = (content: any) => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(content, "text/html");
//   const tables = doc.querySelectorAll("table");
//   tables.forEach((table: any) => {
//     const wrapper = document.createElement("div");
//     wrapper.className = "table-wrapper";
//     table.parentNode.insertBefore(wrapper, table);
//     wrapper.appendChild(table);
//   });
//   return doc.body.innerHTML;
// };

// const handleEditorChange = async (newContent: any) => {
//   const updatedContent = await wrapTablesWithDiv(newContent);
//   if (updatedContent !== fileContent) {
//     setFileContent(updatedContent);
//   }
// };

// const handleInit = (evt: any, editor: any) => {
//   editorRef.current = editor;
//   const updatedContent = wrapTablesWithDiv(fileContent);
//   editor.setContent(updatedContent);
// };

interface EditorProps {
  padding: any;
  fileContent: string;
  setFileContent: (content: string) => void;
}

const EditorContent: React.FC<EditorProps> = ({
  padding,
  fileContent,
  setFileContent,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const editorRef = useRef(null);
  const { t } = useTranslation("editor");
  const [isClient, setIsClient] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(router?.locale);

  const byDefaultPaddingConfig: any = {
    "/document-designer-editor": { top: 40, right: 32, bottom: 40, left: 35 },
    "/ready-made-document": { top: 49, right: 46, bottom: 49, left: 46 },
  };

  const updatePadding = byDefaultPaddingConfig[pathname] || {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const openFilePicker = () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        resolve(file);
      };
      input.click();
    });
  };

  const findParentParagraphOrHeading = (node: any) => {
    while (node && node.tagName !== "BODY") {
      if (node.tagName === "P" || /^H[1-6]$/.test(node.tagName)) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  };

  const applyPadding = (editor: any, paddingConfig: any) => {
    const selectedNodes = editor.selection.getSelectedBlocks();
    selectedNodes.forEach((node: any) => {
      const parentElement = findParentParagraphOrHeading(node);
      if (parentElement) {
        editor.dom.setStyle(
          parentElement,
          "paddingLeft",
          `${paddingConfig.left}px`,
        );
        editor.dom.setStyle(
          parentElement,
          "paddingRight",
          `${paddingConfig.right}px`,
        );
      }
    });
  };

  useEffect(() => {
    setIsClient(true);
    if (editorRef.current) {
      const editor: any = editorRef.current;
      const observer = new MutationObserver(() => {
        applyPadding(editor, {
          left: updatePadding.left * padding.left,
          right: updatePadding.right * padding.right,
        });
      });

      observer.observe(editor.getBody(), {
        childList: true,
        subtree: true,
      });

      applyPadding(editor, {
        left: updatePadding.left * padding.left,
        right: updatePadding.right * padding.right,
      });

      return () => observer.disconnect();
    }
  }, [padding]);

  useEffect(() => {
    if (editorRef.current) {
      const editor: any = editorRef.current;
      const bodyElement = editor.dom.select("body")[0];
      if (bodyElement) {
        editor.dom.setStyle(
          bodyElement,
          "paddingTop",
          `${updatePadding.top * padding.top}px`,
        );
        editor.dom.setStyle(
          bodyElement,
          "paddingBottom",
          `${updatePadding.bottom * padding.bottom}px`,
        );
      }
    }
  }, [padding]);

  useEffect(() => {
    setCurrentLanguage(router?.locale);
  }, [router?.locale]);

  return (
    <>
      {isClient && (
        <Editor
          value={fileContent}
          key={currentLanguage}
          apiKey="haef84ezbqbahazz1ntixb37qd061q1jke02fhijpw25y2v2"
          onInit={(evt: any, editor: any) => (editorRef.current = editor)}
          onEditorChange={(newContent: any) => setFileContent(newContent)}
          init={{
            width: "100%",
            resize: "both",
            menubar: false,
            statusbar: false,
            image_advtab: true,
            image_caption: true,
            importcss_append: true,
            autosave_interval: "30s",
            autosave_retention: "2m",
            toolbar_mode: "scrolling",
            contextmenu: "link image",
            autocorrect_capitalize: true,
            autosave_ask_before_unload: true,
            autosave_restore_when_empty: false,
            noneditable_class: "mceNonEditable",
            autosave_prefix: "{path}{query}-{id}-",
            editimage_cors_hosts: ["picsum.photos"],
            language:
              currentLanguage === "ru"
                ? "ru"
                : currentLanguage === "kz"
                  ? "kk"
                  : "en",
            plugins:
              "searchreplace importcss image table link advlist lists emoticons preview",
            quickbars_selection_toolbar:
              "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
            toolbar:
              "searchButton undo redo print blocks fontfamily fontsizeinput bold underline italic forecolor backcolor link image table align numlist bullist lineheight outdent indent checklist removeformat emoticons preview",
            content_style: `
              body {
                margin: 0;
                font-size: 12px;
                text-align: justify;
                font-family: 'Times New Roman', serif;
                padding-top: ${updatePadding.top * padding.top}px;
                padding-bottom: ${updatePadding.bottom * padding.bottom}px;

                .mce-item-anchor {
                  display: none !important;
                }
              }
              body > * {
                margin: 0;
                white-space: break-spaces;
                padding-left: ${padding.left * updatePadding.left}px;
                padding-right: ${padding.right * updatePadding.right}px;
              }`,
            setup: (editor: any) => {
              editor.ui.registry.addIcon("bold", myIconPack.bold);
              editor.ui.registry.addIcon("link", myIconPack.link);
              editor.ui.registry.addIcon("undo", myIconPack.undo);
              editor.ui.registry.addIcon("redo", myIconPack.redo);
              editor.ui.registry.addIcon("image", myIconPack.image);
              editor.ui.registry.addIcon("print", myIconPack.print);
              editor.ui.registry.addIcon("italic", myIconPack.italic);
              editor.ui.registry.addIcon("backcolor", myIconPack.bgColor);
              editor.ui.registry.addIcon("underline", myIconPack.underline);
              editor.ui.registry.addIcon("forecolor", myIconPack.textColor);
              editor.ui.registry.addIcon(
                "custom-search",
                myIconPack.customSearch,
              );
              editor.ui.registry.addIcon(
                "custom-checklist",
                myIconPack.customChecklist,
              );

              editor.ui.registry.addButton("checklist", {
                tooltip: t("checklist"),
                icon: "custom-checklist",
                onAction: () => {
                  const content = editor.selection.getContent();
                  const checklistContent = content
                    .split("\n")
                    .map((item: any) => `<input type="checkbox"/> ${item}`)
                    .join("<br/>");
                  editor.selection.setContent(checklistContent);
                },
              }),
                editor.ui.registry.addButton("searchButton", {
                  tooltip: t("search"),
                  icon: "custom-search",
                  onAction: () => {
                    const editor: any = editorRef.current;
                    editor.execCommand("SearchReplace", false);
                  },
                });
              editor.on("keydown", (e: any) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  editor.execCommand(
                    "mceInsertContent",
                    false,
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
                  );
                }
              });
            },
            file_picker_callback: async (callback: any) => {
              const file: any = await openFilePicker();
              if (file) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                  callback(event.target.result, {
                    alt: file.name,
                  });
                };
                reader.readAsDataURL(file);
              }
            },
          }}
        />
      )}
    </>
  );
};

export default EditorContent;
