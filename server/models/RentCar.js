const { Schema, model } = require('mongoose');

const rentCarSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    gearbox: { type: String, required: true },
    city: { type: String, required: true },
    fuelType: { type: String, required: true },
    doors: { type: String, required: true },
    seats: { type: Number, required: true },
    img: { type: String, required: true }
});

const RentCar = model("RentCar", rentCarSchema);

module.exports = RentCar;