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

            <section id={styles["rent-car"]}>
                <h2>Rent a Reliable and Comfortable Car for Your Next Adventure</h2>
                <RentalCars />
            </section>

            <section id={styles["home-4"]}>
                <h2>Why Choose Us?</h2>
                <WhyChooseUs />
            </section>


        </>
    );
}