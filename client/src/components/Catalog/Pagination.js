import { useNavigate } from "react-router-dom";

import { searchCars } from "../../services/carService";

import styles from './Pagination.module.css';
import toast from 'react-hot-toast';

export default function Pagination({
    pageNumbers,
    setDisplayCars,
    currentPage,
    setCurrentPage
}) {
    const navigate = useNavigate();
    let queryParams = window.location.search;

    const searchParams = (queryParams, page) => {
        if (!queryParams) {
            queryParams += `?page=${page}`;
        } else if (queryParams && !queryParams.includes('page')) {
            queryParams += `&page=${page}`;
        } else {
            queryParams = queryParams.replace(/page=\d+/, `page=${page}`);
        }

        const searchParams = new URLSearchParams(queryParams);
        return searchParams.toString();
    };

    const handleFirstPageChange = async (e) => {
        if (currentPage <= 1) {
            return;
        }

        setCurrentPage(1);

        try {
            queryParams = searchParams(queryParams, 1);
            const { cars } = await searchCars(queryParams);

            setDisplayCars(cars);
            return navigate(`/catalog?${queryParams}`);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        }
    };

    const handleLastPageChange = async (e) => {
        if (currentPage === pageNumbers) {
            return;
        }

        setCurrentPage(pageNumbers);

        try {
            queryParams = searchParams(queryParams, pageNumbers);
            const { cars } = await searchCars(queryParams);

            setDisplayCars(cars);
            return navigate(`/catalog?${queryParams}`);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        }
    };

    const handleNextPageChange = async (e) => {
        if (currentPage + 1 > pageNumbers) {
            return;
        }

        setCurrentPage(currentPage + 1);

        try {
            queryParams = searchParams(queryParams, currentPage + 1);
            const { cars } = await searchCars(queryParams);

            setDisplayCars(cars);
            return navigate(`/catalog?${queryParams}`);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        }
    };

    const handlePreviousPageChange = async (e) => {
        if (currentPage - 1 < 1) {
            return;
        }

        setCurrentPage(currentPage - 1);

        try {
            queryParams = searchParams(queryParams, currentPage - 1);
            const { cars } = await searchCars(queryParams);

            setDisplayCars(cars);
            return navigate(`/catalog?${queryParams}`);
        } catch (error) {
            error.message.forEach(err => toast.error(err));
        }
    };

    return (
        <div className={styles["pagination"]}>
            <p className={styles["pages"]}>1 - {currentPage} of {pageNumbers}</p>
            <div className={styles["actions"]}>
                <button onClick={handleFirstPageChange} className={styles["btn"]} title="First Page">
                    <i className="fa-solid fa-angles-left"></i>
                </button>

                <button onClick={handlePreviousPageChange} className={styles["btn"]} title="Previous Page">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button onClick={handleNextPageChange} className={styles["btn"]} title="Next Page">
                    <i className="fa-solid fa-arrow-right"></i>
                </button>

                <button onClick={handleLastPageChange} className={styles["btn"]} title="Last Page">
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        </div>
    );
}