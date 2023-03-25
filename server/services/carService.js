const Car = require('../models/Car');

async function getAll() {
    return Car.find().sort({ _createdAt: 'desc' });
}

async function getHomeCars() {
    return Car.find().sort({ _createdAt: 'desc' }).limit(4);
}

async function getById(id) {
    return Car.findById(id);
}

async function getFiltered(manufacturer, model, fromPrice, toPrice, year, gearbox) {
    let query = {};
    if (year) {
        query.year = { $gte: year };
    }
    if (fromPrice || toPrice) {
        query.price = { $gte: fromPrice, $lte: toPrice };
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
        car.description = carData.description,
        car.gearbox = carData.gearbox,
        car.images = carData.images;

    await car.save();

    return car;
}

module.exports = {
    getAll,
    getHomeCars,
    getById,
    getFiltered,
    create,
    deleteById,
    update
};