import styles from './CarDetails.module.css';

export default function CarDetails({
    car
}) {
    return (
        <>
            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Year</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.year}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Horse Power</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.horsePower}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Gearbox</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.gearbox}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Kilometers</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.kilometers}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Fuel Type</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.fuelType}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Description</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.description}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>City</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.city}
                    </p>
                </div>
            </div>

            <div className={styles['details']}>
                <div className={styles['name']}>
                    <label>Phone Number</label>
                </div>

                <div className={styles['details-content']}>
                    <p>
                        {car.phoneNumber}
                    </p>
                </div>
            </div>

            <div className={styles['price-car-brand']}>
                <div className={styles['brand']}>
                    <span>{car.manufacturer} {car.model}</span>
                </div>

                <div className={styles['price']}>
                    <span>
                        ${car.price}
                    </span>
                </div>
            </div>
        </>
    );
}