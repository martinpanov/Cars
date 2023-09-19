import styles from './WhyChooseUs.module.css';

export default function WhyChooseUs() {
    return (
        <section id={styles["why-choose-us"]}>
            <h2>Why Choose Us?</h2>
            <div className={styles["reasons"]}>
                <div className={styles["reason"]}>
                    <img src='/assets/car-vehicle-rent-icon.svg' alt="car" />
                    <h3>
                        Select Car
                    </h3>
                    <p>
                        We offer a big range of vehicles for all your driving needs. We have the perfect car to meet your needs
                    </p>
                </div>

                <div className={styles["reason"]}>
                    <img src='/assets/customer_care-icon.svg' alt="customerCare" />
                    <h3>
                        Contact Operator
                    </h3>
                    <p>
                        Our knowledgeable and friendly operators are always ready to help with any questions or concerns
                    </p>
                </div>

                <div className={styles["reason"]}>
                    <img src='/assets/car_driving_on_the_road.svg' alt="carDriving" />
                    <h3>
                        Let's Drive
                    </h3>
                    <p>
                        Whether you're hitting the open road, we've got you covered with our wide range of cars
                    </p>
                </div>
            </div>
        </section>
    );
}