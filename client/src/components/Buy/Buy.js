import styles from './Buy.module.css'

export default function Buy() {
    return (
        <section id={styles["buy-page"]}>

            <h1>Search</h1>

            <div id={styles["buy-wrapper"]}>
                <form action="/search" method="get">
                    <label><span>Manufacturer: </span></label>
                    <input type="text" name="manufacturer" placeholder="Manufacturer" />
                    <label><span>Model: </span></label>
                    <input type="text" name="model" placeholder="Model" />
                    <label><span>From Price: </span></label>
                    <input type="number" name="fromPrice" placeholder="From Price" />
                    <label><span>To Price: </span></label>
                    <input type="number" name="toPrice" placeholder="To Price" />
                    <label><span>Year: </span></label>
                    <input type="number" name="year" placeholder="Year" />
                    <label><span>Gearbox: </span></label>
                    <select name="gearbox">
                        <option value="" disabled selected></option>
                        <option value="manual">Manual</option>
                        <option value="manual">Automatic</option>
                    </select>
                    <button>Search</button>
                </form>
            </div>
        </section>
    );
}