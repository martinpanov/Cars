import { useSearchParams } from "react-router-dom";

import styles from './Pagination.module.css';

export const Pagination: React.FC<{ totalPages: number; }> = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = async (nextPage) => {
    if (currentPage < 1 || nextPage > totalPages) {
      return;
    }

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set('page', nextPage);
      return params;
    });
  };

  return (
    <div className={styles["pagination"]}>
      <p className={styles["pages"]}>1 - {currentPage} of {totalPages}</p>
      <div className={styles["actions"]}>
        <button onClick={() => handlePageChange(1)} className={styles["btn"]} title="First Page">
          <i className="fa-solid fa-angles-left"></i>
        </button>

        <button onClick={() => handlePageChange(currentPage - 1)} className={styles["btn"]} title="Previous Page">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} className={styles["btn"]} title="Next Page">
          <i className="fa-solid fa-arrow-right"></i>
        </button>

        <button onClick={() => handlePageChange(totalPages)} className={styles["btn"]} title="Last Page">
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};