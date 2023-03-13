import styles from './Home.module.css'
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div id={styles.home}>

                <h1>Buy Your Dream Car Today!</h1>
                <Link to="/search"><button>Learn more</button></Link>

            </div>

            <section id={styles["home-2"]}>
                
                <h2>Hello Martin</h2>
                
            </section>

        </>
    );
}