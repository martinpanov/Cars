import { Link, useSearchParams } from 'react-router-dom';
import { useGetCarsQuery, } from '../../api/cars';
import styles from './Catalog.module.css';
import { RenderIf } from '../../components/RenderIf';
import { PageSpinner } from '../../components/Spinner/PageSpinner';
import { CatalogCarCard } from './components/CatalogCarCard';
import { Pagination } from './components/Pagination';
import type { Car } from '../../types/car';
import { CatalogForm } from './components/CatalogForm';

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetCarsQuery({ queryString: searchParams.toString() });
  const isCars = data?.cars.length || 1;
  const cars = data?.cars || [];

  return (
    <section id={styles["catalog-page"]}>
      <RenderIf condition={isLoading}>
        <PageSpinner />
      </RenderIf>

      <RenderIf condition={!isLoading && isCars}>
        <CatalogForm cars={cars} />
        <div className={styles["cars-listings-section"]}>
          <div className={styles["cars-listings"]}>
            {cars.map((car: Car) => <CatalogCarCard key={car._id} {...car} />)}
          </div>
          <Pagination totalPages={data?.pagesCount} />
        </div>
      </RenderIf>

      <RenderIf condition={!isLoading && !isCars}>
        <div className={styles["no-listings"]}>
          <h1>No listings yet. Be the first one!</h1>
          <button><Link to="/sell">Create Car Listing</Link></button>
        </div>
      </RenderIf>
    </section>
  );
};