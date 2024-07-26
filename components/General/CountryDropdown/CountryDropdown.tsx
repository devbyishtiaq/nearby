import React from "react";
import { useState, useEffect } from "react";
import styles from "./CountryDropdown.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";

interface CountryDropdownProps {
  dropdownLabel: string;
  country: string;
  setCountry: (value: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  dropdownLabel,
  country,
  setCountry,
}) => {
  const [countryCode, setCountryCode] = useState<string>("");
  const countryListPackage = require("country-list");
  const countryList: { country: string; code: string } =
    countryListPackage.getNameList();

  function extractCountryCode(str: string) {
    // Regular expression to match the country code within parentheses
    const regex = /\((.*?)\)/;

    // Use match() method to find the match
    const match = str?.match(regex);

    // If match is found, return the extracted country code
    if (match && match.length > 1) {
      return match[1];
    } else {
      // If no match found, return null or handle accordingly
      return null;
    }
  }

  useEffect(() => {
    const code = extractCountryCode(country) || "";
    setCountryCode(code);
  }, [country]);

  return (
    <div className="dropdown">
      <button
        className={`${styles.dropdownButton}`}
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {country ? (
          <div>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              className={styles.flag}
              style={{
                width: "2em",
                height: "2em",
              }}
            />{" "}
            {country}
          </div>
        ) : (
          dropdownLabel
        )}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>

      {countryList ? (
        <ul className="dropdown-menu" aria-labelledby="countryDropdown">
          {Object.entries(countryList).map(([country, code]) => (
            <li key={country}>
              <a
                className="dropdown-item"
                onClick={() => {
                  setCountry(
                    `${country.charAt(0).toUpperCase() + country.slice(1)} (${code})`,
                  );
                  setCountryCode(`${code}`);
                }}
              >
                {country.charAt(0).toUpperCase() + country.slice(1)} ({code})
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading country list...</p>
      )}
    </div>
  );
};

export default CountryDropdown;
