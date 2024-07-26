import styles from "./Paginator.module.css";
import React from "react";

interface PaginatorProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numberofReviews: number;
}

const Paginator = ({ currentPage, setCurrentPage, numberofReviews }: PaginatorProps) => {
  const tabTotal = numberofReviews;
  const holders = Array.from({ length: tabTotal }, (_, i) => i + 1);
  const showEllipsisStart = currentPage > 4;
  const showEllipsisEnd = currentPage < tabTotal - 3;

  const selectedElements = [
    ...(showEllipsisStart ? [1, '...'] : []),
    ...holders.slice(showEllipsisStart ? Math.max(0, currentPage - 2) : 0, currentPage + 1),
    ...(showEllipsisEnd ? ['...', tabTotal - 2, tabTotal - 1, tabTotal] : []),
  ];

  return (
    <>
      <div className={styles.container}>
        <ul className={`mb-0 ${styles.paginatorBase}`}>
          {selectedElements.map((e, i) => (
            <li key={i}>
              {e === '...' ? (
                <span>{e}</span>
              ) : (
                <button className={e === currentPage ? styles.activePage : ""} onClick={() => setCurrentPage(e as number)}>
                  {e}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Paginator;