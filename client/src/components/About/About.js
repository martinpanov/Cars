import styles from './About.module.css'
import passion from '../../assets/icons8-passion-68.png'
import mission from '../../assets/icons8-goal-100.png'
import team from '../../assets/icons8-people-working-together-100.png'

export default function About() {
    return (
        <section id={styles["about-page"]}>

            <h1>About us</h1>

            <div className={styles["about-card"]}>
                <img src={passion} alt="team-icon" />
                <h4>
                     Passion 
                </h4>
                <p>
                    At Begachka, we share a collective passion<br></br>
                    for all things automotive, from classic cars<br></br>
                    to the latest models, from their inner workings to<br></br>
                    their historical significance.
                </p>
            </div>
            <div className={styles["about-card"]}>
                <img src={mission} alt="mission-icon" />
                <h4>
                    Mission
                </h4>
                <p>
                    Our mission was to create a platform for car enthusiasts<br />
                    by connecting them in the most efficient and effective way,<br />
                    providing the most up-to-date car listings, expert reviews, <br />
                    and tools to make informed decisions, making car<br />
                        buying and selling easier for everyone.
                </p>
            </div>
            <div className={styles["about-card"]}>
                <img src={team} alt="team-icon" />
                <h4>
                    Team
                </h4>
                <p>
                    Our team is made up of car enthusiasts and experts in the industry,<br />
                    who are dedicated to providing an unparalleled car buying<br />
                    and selling experience, with a commitment to honesty,<br />
                    transparency and customer satisfaction
                </p>
            </div>


        </section>

    );
}