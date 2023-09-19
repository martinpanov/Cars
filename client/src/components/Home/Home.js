import Hero from './Hero';
import LatestCarListings from './LatestCarListings';
import RentalCars from './RentalCars';
import WhyChooseUs from './WhyChooseUs';

export default function Home() {
    return (
        <>
            <Hero />

            <LatestCarListings />

            <RentalCars />

            <WhyChooseUs />
        </>
    );
}