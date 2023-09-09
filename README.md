# Project Documentation: Cars

## Overview

My App is a single-page application built with React that allows users to post their car ads and rent cars. The app is designed for car owners and people who are looking for purchasing or renting a car.

### The link to the website is https://begachka.donttouchmydomain.com

![Cars](https://user-images.githubusercontent.com/106311309/230741582-e7f9954e-e37f-45d2-adcf-debcf9d6e8a4.jpg)

## Technology Stack

 * React
 * Node.js/Express.js
 * AWS S3
 * MongoDB

## Project Architecture

The app consists of several main components:

 * Catalog: A page where users can go through the car listings and use the search functionality to find the car that they are looking for.
 * Sell: A page where users can post their car ad so that other users can view it.
 * RentCar: A page which allows the users to rent a car for their next trip.

## Project Setup

To set up the project locally, follow these steps:

1. Clone the project repository from GitHub
2. Access the client and the server folder and install the dependencies using `npm install`.
3. Create a `.env` file in the server directory and add your AWS S3 AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME
4. You need to set up a couple of documents in the "rentcars" collection in MongoDB. An example of one of such document looks like this:
```
{
  "manufacturer": "BMW",
  "model": "320d",
  "price": 20,
  "year": 2011,
  "gearbox": "Automatic",
  "city": "Sofia",
  "fuelType": "Diesel",
  "doors": "4/5",
  "seats": 5,
  "img": "/assets/bmw-rental.png",
  "rentedBy": null
}
```
There are 5 images that exist in the assets folder which you can use for the rentcars collection: bmw-rental.png, mazda.png, toyota-corolla.png, vw-passat.png, audi-s4.png

5. Run the client by using `npm start` in the client directory
6. Run the server by using `node index.js` in the server directory

## Project Features

 * Search for cars by going in the catalog page and specifying the search criteria
 * The latest car listings are displayed on the home page
 * My profile page where you can view all of your car listings and rented cars
 * Rent cars directly from the home page

## Future Improvements

 * Specify the exact date that you will be renting the car from and to
 * Add loading gear icons on more pages
