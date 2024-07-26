import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Message from "../Message/Message";

import useTranslation from "next-translate/useTranslation";
import styles from "./ChatArea.module.css";

interface ChatAreaProps {
  messages: any;
  activeSessionName: string | undefined;
  sendMessage: (query: string) => void;
  currentQuery: string;
  setCurrentQuery: (value: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  activeSessionName,
  sendMessage,
  currentQuery,
  setCurrentQuery,
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const handleKeyPress = (e: any) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === "Enter") {
      // Prevent the default behavior of form submission
      e.preventDefault();
      // Call the sendMessage function with the current query value
      sendMessage(currentQuery);
    }
  };

  const scrollToBottom = () => {
    const parentContainer = messagesEndRef.current?.parentElement;
    const messagesContainer = messagesEndRef.current;

    if (parentContainer && messagesContainer) {
      const parentScrollTop = parentContainer.scrollTop;
      const messagesContainerOffsetTop = messagesContainer.offsetTop;
      const scrollDistance = messagesContainerOffsetTop - parentScrollTop;

      parentContainer.scrollTo({
        top: parentScrollTop + scrollDistance,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { t } = useTranslation("common");

  return (
    <div className={`${styles.container} border-end`}>
      <div className="d-flex align-items-center">
        <div>
          <h5>{activeSessionName}</h5>
        </div>
      </div>
      <div className={styles.messages}>
        {messages.map((message: any, index: any) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatbox}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder={t("search-aika")}
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={() => sendMessage(currentQuery)}>
          <Image
            src="/img/AIKA/send.png"
            width={20}
            height={20}
            alt="Send Message"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
