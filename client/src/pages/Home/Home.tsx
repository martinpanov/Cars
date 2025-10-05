import React from "react";

import { Header } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { LatestCarListings } from "./LatestCarListings/LatestCarListings";
import { RentalCars } from "./RentalCars/RentalCars";

export const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <LatestCarListings />
      <RentalCars />
      <WhyChooseUs />
    </React.Fragment>
  );
};
