import styles from './Details.module.css';

export default function Details() {
    return (
        <section id={styles["details-page"]}>
            <div className={styles['image-slider-section']}>
                <div className={styles['brand-slider']}>
                    <span>BMW 340i</span>
                </div>
                <div className={styles['price-slider']}>
                    <span>$50000</span>
                </div>
            </div>

            <div className={styles['car-details-section']}>
                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Year</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            2017
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Horse Power</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            326HP
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Gearbox</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            Automatic
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Kilometers</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            40000
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Fuel Type</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            Petrol
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Description</label>
                    </div>
                    <div className={styles['details-content-description']}>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores possimus quasi accusamus libero eum ea aut illum eius, error sequi eaque sed debitis, non iste provident modi tempora quae!

                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores possimus quasi accusamus libero eum ea aut illum eius, error sequi eaque sed debitis, non iste provident modi tempora quae!
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>City</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            Plovdiv
                        </p>
                    </div>
                </div>

                <div className={styles['details-no-description']}>
                    <div className={styles['name']}>
                        <label>Phone Number</label>
                    </div>
                    <div className={styles['details-content']}>
                        <p>
                            0888892183
                        </p>
                    </div>
                </div>

                <div className={styles['price-car-brand']}>
                    <div className={styles['brand']}>
                        <span>BMW 340i</span>
                    </div>
                    <div className={styles['price']}>
                        <span>
                            $50000
                        </span>
                    </div>
                </div>
            </div>

        </section>
    );
}