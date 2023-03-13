import styles from './Catalog.module.css'
import { Link } from "react-router-dom";

export default function Catalog() {
    return (
        <section id={styles["catalog-page"]}>

            {/* {{ #if cars }}
            {{ #each cars }}
            {{> carCard}}
            {{/ each}}
            {{ else}} */}

            <div className={styles["no-listings"]}>
                <h1>No listings yet. Be the first one!</h1>
                <button><Link to="/sell">Create Car Listing</Link></button>
            </div>

            {/* {{/if}} */}
        </section>
    );
}