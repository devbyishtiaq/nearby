import React, { useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import styles from "./ResponseCategories.module.css";

interface ResponseCategoriesProps {
  activeCategorySlug: string;
  setActiveCategorySlug: (value: string) => void;
}

const ResponseCategories: React.FC<ResponseCategoriesProps> = ({ activeCategorySlug, setActiveCategorySlug }) => {
  const { t } = useTranslation("government-response");
  const [activeCategory, setActiveCategory] = useState<string>("Labor Relations");

  const categoriesList = [
    { categoryName: "Labor Relations", categorySlug: "labor" },
    { categoryName: "Taxes & Finance", categorySlug: "taxes_and_finances" },
    { categoryName: "Licensing (Permissions & notices)", categorySlug: "licensing" },
    { categoryName: "Corporate Law", categorySlug: "corporate_law" },
    { categoryName: "Government Procurement", categorySlug: "public_procurement" },
    { categoryName: "Healthcare", categorySlug: "healthcare" },
    { categoryName: "Family Relationships", categorySlug: "family_relationship" },
    { categoryName: "Real Estate & Land Issues", categorySlug: "real_estate_land_issues" },
    { categoryName: "Housing Relations", categorySlug: "housing" },
    { categoryName: "Legal Proceedings", categorySlug: "legal_proceedings" },
    { categoryName: "Civil Services", categorySlug: "civil_service" },
    { categoryName: "Traffic Rules", categorySlug: "traffic_rules" },
    { categoryName: "Questions in the field of administrative offenses", categorySlug: "administrative_offences" },
    { categoryName: "Law Enforcement", categorySlug: "law_enforcement" },
    { categoryName: "Agriculture", categorySlug: "agriculture" },
    { categoryName: "Education", categorySlug: "education" },
    { categoryName: "Sport", categorySlug: "sport" },
    { categoryName: "Social Security (payments, allowances, pensions)", categorySlug: "social_benefits" },
    { categoryName: "Media, PR, Advertising", categorySlug: "mass_media" },
    { categoryName: "Other Questions", categorySlug: "other_questions" }
  ];

  return (
    <div className={styles.container}>
      {categoriesList.map((category, index) => (
        <div key={index} className={`d-flex align-items-center mt-3 p-2 ${activeCategory === category.categoryName ? styles.activeCategoryStyle : ''}`}>
          <button onClick={() => { setActiveCategory(category.categoryName); setActiveCategorySlug(category.categorySlug) }}>
            <span>{t(category.categorySlug)}</span>
          </button>
          {activeCategory === category.categoryName && (
            <Image src="/img/general/arrow-right.png" width={20} height={10} alt="Arrow Right" className={styles.arrowRight} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ResponseCategories;
