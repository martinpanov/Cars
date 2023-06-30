import styles from './CarDetails.module.css';

export default function CarDetails({
    car
}) {
    return (
        <>
            <div className={styles['details']}>
                <span>Year</span>
                <span>
                    {car.year}
                </span>
            </div>

            <div className={styles['details']}>
                <span>Horse Power</span>
                <span>
                    {car.horsePower}
                </span>
            </div>

            <div className={styles['details']}>
                <span>Gearbox</span>
                <span>
                    {car.gearbox}
                </span>
            </div>

            <div className={styles['details']}>
                <span>Kilometers</span>
                <span>
                    {car.kilometers}
                </span>
            </div>

            <div className={styles['details']}>
                <span>Fuel Type</span>
                <span>
                    {car.fuelType}
                </span>
            </div>

            <div className={styles['details']}>
                <span>Description</span>
                <p>
                    {car.description}
                </p>
            </div>

            <div className={styles['details']}>
                <span>City</span>
                <span>
                    {car.city}
                </span>
            </div>

            <div className={styles['details']}>
                <span>Phone Number</span>
                <span>
                    {car.phoneNumber}
                </span>
            </div>

            <div className={styles['price-car-brand']}>
                <h2>{car.manufacturer} {car.model}</h2>
                <h3>
                    ${car.price}
                </h3>
            </div>
        </>
    );
}