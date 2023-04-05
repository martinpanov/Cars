const Car = require('../models/Car');
const RentCar = require('../models/RentCar');

async function getAll() {
    return Car.find().sort({ _createdAt: 'desc' });
}

async function getUserCars(userId) {
    return Car.find({ _ownerId: userId });
}

async function getHomeCars() {
    return Car.find().sort({ _createdAt: 'desc' }).limit(4);
}

async function getById(id) {
    return Car.findById(id);
}

async function getFiltered(manufacturer, model, fromPrice, toPrice, year, gearbox, city, fuelType, fromHp, toHp, fromKm, toKm) {
    const query = {};
    if (year) {
        query.year = { $gte: year };
    }
    if (fromPrice || toPrice) {
        query.price = { $gte: fromPrice, $lte: toPrice };
    }
    if (fromHp || toHp) {
        query.horsePower = { $gte: fromHp, $lte: toHp };
    }
    if (fromKm || toKm) {
        query.kilometers = { $gte: fromKm, $lte: toKm };
    }
    if (manufacturer) {
        query.manufacturer = manufacturer;
    }
    if (model) {
        query.model = model;
    }
    if (gearbox) {
        query.gearbox = gearbox;
    }
    if (city) {
        query.city = city;
    }
    if (fuelType) {
        query.fuelType = fuelType;
    }
    return Car.find(query);
}

async function create(car) {
    return Car.create(car);
}

async function deleteById(id) {
    return Car.deleteOne({ _id: id });
}

async function update(id, carData) {
    const car = await Car.findById(id);

    car.manufacturer = carData.manufacturer,
    car.model = carData.model,
    car.price = Number(carData.price),
    car.year = Number(carData.year),
    car.phoneNumber = String(carData.phoneNumber),
    car.kilometers = Number(carData.kilometers),
    car.description = carData.description,
    car.gearbox = carData.gearbox,
    car.horsePower = carData.horsePower,
    car.city = carData.city,
    car.fuelType = carData.fuelType,
    car.imagesNames = carData.imagesNames;

    await car.save();

    return car;
}

async function getRentCars() {
    return RentCar.find({});
}

async function getUserRentCars(userId) {
    return RentCar.find({ rentedBy: userId });
}

async function getFilteredRentCars(seats, doors, gearbox, fuelType, city) {
    const query = {};
    if (seats) {
        query.seats = seats;
    }
    if (doors) {
        query.doors = doors;
    }
    if (gearbox) {
        query.gearbox = gearbox;
    }
    if (fuelType) {
        query.fuelType = fuelType;
    }
    if (city) {
        query.city = city;
    }

    return RentCar.find(query);
}

async function rentCar(carId, userId) {
    const car = await RentCar.findById(carId);

    if (car.rentedBy == userId) {
        car.rentedBy = null;
    } else {
        car.rentedBy = userId;
    }

    await car.save();

    return car;
}

module.exports = {
    getAll,
    getUserCars,
    getHomeCars,
    getById,
    getFiltered,
    create,
    deleteById,
    update,
    getRentCars,
    getUserRentCars,
    getFilteredRentCars,
    rentCar
};