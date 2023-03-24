import styles from './WhyChooseUs.module.css';
import carSvg from '../../assets/car-vehicle-rent-icon.svg';
import customerCareSvg from '../../assets/customer_care-icon.svg';
import carDrivingSvg from '../../assets/car_driving_on_the_road.svg';

export default function WhyChooseUs() {
    return (
        <div className={styles["reasons"]}>
            <div className={styles["reason"]}>
                <img src={carSvg} alt="car" />
                <h3>
                    Select Car
                </h3>
                <p>
                    We offer a big range of vehicles for all <br /> your driving needs. We have the <br />perfect car to meet your needs
                </p>
            </div>

            <div className={styles["reason"]}>
                <img src={customerCareSvg} alt="customerCare" />
                <h3>
                    Contact Operator
                </h3>
                <p>
                    Our knowledgeable and friendly  <br />operators are always ready to help  <br />with any questions or concerns
                </p>
            </div>

            <div className={styles["reason"]}>
                <img src={carDrivingSvg} alt="carDriving" />
                <h3>
                    Let's Drive
                </h3>
                <p>
                    Whether you're hitting the open road, <br />we've got you covered with our wide  <br />range of cars
                </p>
            </div>
        </div>
    );
}