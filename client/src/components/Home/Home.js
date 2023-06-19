import styles from './Home.module.css';
import LatestCarListings from './LatestCarListings';
import RentalCars from './RentalCars';
import WhyChooseUs from './WhyChooseUs';
import Hero from './Hero';

export default function Home() {
    return (
        <>
            <section id={styles.hero}>
                <Hero />
            </section>

            <section id={styles["car-listings"]}>
                <h2>Latest car listings</h2>
                <LatestCarListings />
            </section>

            <section id={styles["home-3"]}>
                <div className={styles["home3-h2"]}>
                    <h2>Rent a Reliable and Comfortable Car for Your Next Adventure</h2>
                </div>
                <RentalCars />
            </section>

            <section id={styles["home-4"]}>
                <div className={styles["home4-h2"]}>
                    <h2>Why Choose Us?</h2>
                </div>
                <WhyChooseUs />
            </section>


        </>
    );
}