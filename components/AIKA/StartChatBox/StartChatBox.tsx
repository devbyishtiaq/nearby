import React, {useState, useEffect} from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import styles from "./StartChatBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface StartChatBoxProps{
    email: string;
    token: string;
}

const StartChatBox: React.FC<StartChatBoxProps> = ({ email, token }) => {
    const router = useRouter();
    const { t } = useTranslation("ai-ka");
    const gifs = [
    "/ai-ka/Waiting0000.gif",
    "/ai-ka/Knock0000.gif",
    "/ai-ka/TypingHP0000.gif",
    "/ai-ka/TypingLaptop0000.gif",
    "/ai-ka/Thinking0000.gif"
  ];

  const [currentGif, setCurrentGif] = useState(gifs[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      setCurrentGif(randomGif);
    }, 5000); // Change GIF every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [gifs]);


    async function callChatGptSession(email: string, token: string) {
        try {
            const response = await fetch('/api/aika-get-session-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, token })
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
            router.push({
                pathname: '/ai-ka',
                query: { 'session-id': data }
              });

        } catch (error: any) {
            console.error('Error:', error.message);
            return null;
        }
    }

    const handleStartChat = async () => {
        await callChatGptSession(email, token);
    };

    return (
        <div className={styles.container}>
            <div className={styles.aikaStartChat}>
                <h5>{t("welcome-text")}</h5>
                <span>{t("unleash-potential")}</span><br></br>
                <button className="btn btn-success mt-3 px-4" onClick={handleStartChat}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />{t("start-chat")}
                </button>
            </div>
            <Image
                src={currentGif}
                width={270}
                height={250}
                alt="AIKA"
                className={styles.aikaLogoContainer}
                unoptimized={true}
              />
        </div>
    )
}

export default StartChatBox;
