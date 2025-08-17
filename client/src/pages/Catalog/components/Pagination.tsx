import { useSearchParams } from "react-router-dom";

import { Button } from "../../../components/Button/Button";
import { Flex } from "../../../components/Flex/Flex";
import styles from "./Pagination.module.css";

export const Pagination: React.FC<{ totalPages: number }> = ({
  totalPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = async nextPage => {
    if (currentPage < 1 || nextPage > totalPages) {
      return;
    }

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", nextPage);
      return params;
    });
  };

  return (
    <Flex justify="end" align="center" className={styles["pagination"]}>
      <p>
        1 - {currentPage} of {totalPages}
      </p>
      <Flex gap="xs">
        <Button
          onClick={() => handlePageChange(1)}
          variant="secondary"
          size="sm"
        >
          <i className="fa-solid fa-angles-left"></i>
        </Button>

        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          variant="secondary"
          size="sm"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          variant="secondary"
          size="sm"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </Button>

        <Button
          onClick={() => handlePageChange(totalPages)}
          variant="secondary"
          size="sm"
        >
          <i className="fa-solid fa-angles-right"></i>
        </Button>
      </Flex>
    </Flex>
  );
};
