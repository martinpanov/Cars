const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    manufacturer: { type: String, required: true, minLength: [2, 'Manufacturer must be at least 2 characters long'] },
    model: { type: String, required: true, minLength: [2, 'Model must be at least 2 characters long'] },
    price: { type: Number, required: true, min: [0.01, 'Price must be positive number'] },
    year: { type: Number, required: true,  validate: {
        validator: value => value >= 1900 && value <= 2023,
        message: 'Year must be between 1900 and 2023'
    }},
    phoneNumber: { type: String, required: true, minLength: [9, 'Phone Number must be at least 9 characters long'] },
    description: { type: String, minLength: [5, 'Description must be at least 5 characters long'] },
    gearbox: { type: String, required: true, validate: {
        validator: value => value === 'Manual' || value === 'Automatic',
        message: 'Gearbox must be either manual or automatic'
    }},
    images: { type: String, required: [true, 'At least 1 image is required'] },
    _ownerId: { type: ObjectId, ref: 'User', required: true }
});

const Car = model('Car', carSchema);

module.exports = Car;