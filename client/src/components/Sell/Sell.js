import styles from './Sell.module.css'

export default function Sell() {
    return (
        <section id={styles["sell-page"]}>

            <h1>Sell My Car</h1>

            <div className={styles.wrapper}>
                <form action="/sell" method="post" id={styles["sell-form"]}>
                    <label><span>Manufacturer: </span></label>
                    <input type="text" name="manufacturer" placeholder="Manufacturer" />
                    <label><span>Model: </span></label>
                    <input type="text" name="model" placeholder="Model" />
                    <label><span>Price: </span></label>
                    <input type="number" name="price" placeholder="Price" />
                    <label><span>Year: </span></label>
                    <input type="number" name="year" placeholder="Year" />
                    <label><span>Phone Number: </span></label>
                    <input type="text" name="phoneNumber" placeholder="Phone Number" />
                    <label><span>Description: </span></label>
                    <textarea name="description" placeholder="Description"></textarea>
                    <label><span>Gearbox: </span></label>
                    <select name="gearbox">
                        <option value="" disabled selected></option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>
                    <label><span>Pictures: </span></label>
                    <input type="file" name="images" accept="images/*" />
                    <button>Post your ad</button>
                </form>
            </div>

        </section>
    );
}