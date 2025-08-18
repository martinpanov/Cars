import React from "react";

import { Header } from "./components/Hero";
import { LatestCarListings } from "./components/LatestCarListings";
import { RentalCars } from "./components/RentalCars";
import { WhyChooseUs } from "./components/WhyChooseUs";

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
