import styles from './About.module.css';

export default function About() {
    return (
        <section id={styles["about-page"]}>
            <h1>About us</h1>
            <div className={styles["about-cards"]}>
                <div className={styles["about-card"]}>
                    <img src='/assets/icons8-passion-68.png' alt="team-icon" />
                    <h2>
                        Passion
                    </h2>
                    <p>
                        At Begachka, we share a collective passion
                        for all things automotive, from classic cars
                        to the latest models, from their inner workings to
                        their historical significance.
                    </p>
                </div>
                <div className={styles["about-card"]}>
                    <img src='/assets/icons8-goal-100.png' alt="mission-icon" />
                    <h2>
                        Mission
                    </h2>
                    <p>
                        Our mission was to create a platform for car enthusiasts
                        by connecting them in the most efficient and effective way,
                        providing the most up-to-date car listings, expert reviews,
                        and tools to make informed decisions, making car
                        buying and selling easier for everyone.
                    </p>
                </div>
                <div className={styles["about-card"]}>
                    <img src='/assets/icons8-people-working-together-100.png' alt="team-icon" />
                    <h2>
                        Team
                    </h2>
                    <p>
                        Our team is made up of car enthusiasts and experts in the industry,
                        who are dedicated to providing an unparalleled car buying
                        and selling experience, with a commitment to honesty,
                        transparency and customer satisfaction
                    </p>
                </div>
            </div>
        </section>
    );
}