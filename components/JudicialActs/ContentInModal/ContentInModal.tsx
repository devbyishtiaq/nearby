import React from 'react';
import { useEffect, useState } from 'react';

interface ContentInModalProps{
    content: any;
    date: any;
    actNumber: any;
    documentType: any;
    regionText: any;
}

const ContentInModal: React.FC<ContentInModalProps> = ({content,
    date,
    actNumber,
    documentType,
    regionText}) => {
  const [paragraphArrays, setParagraphArrays] = useState("");

  const contentFormatFunc = (
    content: string,
    date: string,
    actNumber: string,
    documentType: string,
    regionText: string
  ) => {
    let paragraphTitles: any[] = [];
    let paragraphSubTitles: any[] = [];
    let paragraphLastTitles: any[] = [];
    let headerTitle = "";

    if (documentType === "Решение") {
      paragraphTitles = [
        /* "РЕШЕНИЕ",
        "ИМЕНЕМ РЕСПУБЛИКИ КАЗАХСТАН", */
        "УСТАНОВИЛ",
        "РЕШИЛ",
        "ОПИСАТЕЛЬНАЯ ЧАСТЬ",
        "МОТИВИРОВОЧНАЯ ЧАСТЬ",
        ];
      paragraphSubTitles = [
        "ИСТЕЦ",
        "ОТВЕТЧИК",
        "ТРЕТЬЕ ЛИЦО",
        "ТРЕБОВАНИЯ ИСТЦА",
        "В СУДЕ УЧАСТВОВАЛИ:",
        "ТРЕТЬЕ ЛИЦО, НЕ ЗАЯВЛЯЮЩЕЕ САМОСТОЯТЕЛЬНЫХ ТРЕБОВАНИЙ НА ПРЕДМЕТ СПОРА",
        "ТРЕБОВАНИЯ ИСТЦА",
        "В СУДЕ УЧАСТВОВАЛИ:",
        "ИСТЦЫ",
        "ОТВЕТЧИКИ",
      ];
      paragraphLastTitles = [
        "РЕЗОЛЮТИВНАЯ ЧАСТЬ",
      ];
      headerTitle = "РЕШЕНИЕ</br>ИМЕНЕМ РЕСПУБЛИКИ КАЗАХСТАН";
    } else if (documentType === "Определение апелляции") {
      paragraphTitles = ["ОПРЕДЕЛЕНИЕ", "УСТАНОВИЛА:", "ОПРЕДЕЛИЛА:"];
      headerTitle = "ОПРЕДЕЛЕНИЕ";
    } else if (documentType === "Постановление апелляции") {
      paragraphTitles = ["ПОСТАНОВЛЕНИЕ", "УСТАНОВИЛА:", "ПОСТАНОВИЛА:", "ПАМЯТКА"];
      headerTitle = "ПОСТАНОВЛЕНИЕ";
    }

    let formattedContent = content;
    const header = `<div style='text-align: center'><img src='https://aika.nearby.kz/img/judicial-acts/Emblem_of_Kazakhstan_3d.png' height="180" alt="Kazakhstan Emblem"/><h4 class='text-center mt-5'><b>${headerTitle}</b></h4></br><p style='display: flex; justify-content: space-between;'><span style='order: 1;'>${date}</span> <span style='order: 2;'>${actNumber}</span> <span style='order: 3;'>${regionText}</span></p></br></div>`;

    paragraphTitles.forEach(title => {
      const regex = new RegExp(`${title.split('').join('\\s*')}`, 'i');
      const replacement = `<h5 class="text-center mt-3 mb-3"><b>${title.replace(":", "")}</b></h5>`;
      formattedContent = formattedContent.replace(regex, replacement);
    });

    paragraphSubTitles.forEach(title => {
      const regex = new RegExp(`${title.split('').join('\\s*')}`, 'i');
      const replacement = `<br></br><span><b>${title.replace(":", "")}</b></span><br></br>`;
      formattedContent = formattedContent.replace(regex, replacement);
    });

    paragraphLastTitles.forEach(title => {
      const regex = new RegExp(`${title.split('').join('\\s*')}`, 'gi');
      const matches = Array.from(formattedContent.matchAll(regex));

      if (matches.length > 0) {
        const lastMatch = matches[matches.length - 1];
        const startIndex = lastMatch.index || 0;
        const endIndex = startIndex + lastMatch[0].length;
        const replacement = `<h5 class="text-center mt-3 mb-3"><b>${title.replace(":", "")}</b></h5>`;

        formattedContent = formattedContent.substring(0, startIndex) +
                           replacement +
                           formattedContent.substring(endIndex);
      }
    });


    let paragraphs = formattedContent.split('</br>');
    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i] = `<p>${paragraphs[i].replace(/^(?![A-Za-z0-9А-Яа-яЁё])\s*[:;]+/, '')}</p>`;
    }
    formattedContent = paragraphs.join('');

    let h5paragraphs = formattedContent.split('</h5>');

    for (let i = 0; i < h5paragraphs.length; i++) {
      h5paragraphs[i] = h5paragraphs[i].replace(/^(?![A-Za-z0-9А-Яа-яЁё])\s*[:;]+/, '');
    }
    formattedContent = h5paragraphs.join('</h5>');

    const finalContent = `<div class='p-5' style='font-size: 14px'>${header}${formattedContent}</div>`;

    return finalContent;
  };

  useEffect(() => {
    setParagraphArrays(
      contentFormatFunc(
        content,
        date,
        actNumber,
        documentType,
        regionText
      )
    );
  }, []);

  return (
    <>
      <p style={{textAlign: "justify", padding: "0 20px", fontSize: "18px"}} dangerouslySetInnerHTML={{ __html: paragraphArrays }} />
    </>
  );
}

export default ContentInModal;