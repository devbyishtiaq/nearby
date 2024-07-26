import React from "react";
import styles from "./Event.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface EventProp{
    imageUrl: string,
    date: string,
    header: string,
    explanation: string,
    location: string
}

const Event:React.FC<EventProp> = ({ imageUrl, date, header, explanation, location }) =>{
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ imageUrl } width={250} height={200} />
                <Card.Body>
                    <span className={styles.date}>{ date }</span>
                    <Card.Title className={styles.cardHeader}>
                        { header }
                    </Card.Title>
                    <Card.Text className={styles.explanationText}>
                        { explanation }
                    </Card.Text>
                    <div className={styles.locationBox}>
                        <FontAwesomeIcon icon={faLocationDot} /> {location}
                    </div>
                </Card.Body>
            </Card>
        </div>
        
    )
}

export default Event;