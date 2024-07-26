import React from "react";
import styles from "./PasswordMustHave.module.css";

type PasswordMust = {
  info: string;
};

type PasswordProps = {
  title: string;
  sections: PasswordMust[];
};

export default function PasswordMustHave(props: PasswordProps) {
  return (
    <div className={styles.passwordRuleContainer}>
      <p>{props.title}</p>
      <ul>
        {props.sections.map((item) => (
          <li>{item.info}</li>
        ))}
      </ul>
    </div>
  );
}
