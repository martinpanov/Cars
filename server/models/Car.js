const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    manufacturer: { type: String, required: true, minLength: [2, 'Manufacturer must be at least 2 characters long'] },
    model: { type: String, required: true, minLength: [1, 'Model must be at least 1 character long'] },
    price: { type: Number, required: true, min: [0.01, 'Price must be positive number'] },
    year: {
        type: Number, required: true, validate: {
            validator: value => value >= 1900 && value <= 2023,
            message: 'Year must be between 1900 and 2023'
        }
    },
    phoneNumber: { type: String, required: true, minLength: [9, 'Phone Number must be at least 9 characters long'] },
    description: { type: String, minLength: [5, 'Description must be at least 5 characters long'] },
    gearbox: {
        type: String, required: true, validate: {
            validator: value => value === 'Manual' || value === 'Automatic',
            message: 'Gearbox must be either manual or automatic'
        }
    },
    city: { type: String, required: true, minLength: [3, 'The city must be at least 3 characters long'] },
    fuelType: {
        type: String, required: true, validate: {
            validator: value => value === 'Petrol' || value === 'Diesel',
            message: 'Fuel type must be either petrol or diesel'
        }
    },
    horsePower: { type: Number, required: true, min: [1, 'HP must be at least 1'] },
    kilometers: { type: Number, required: true, min: [1, 'kilometers must be at least 1'] },
    imagesNames: {
        type: [{ type: String, required: true }],
        validate: {
            validator: images => images.length > 0,
            message: 'At least one image is required'
        }
    },
    _ownerId: { type: ObjectId, ref: 'User', required: true },
    _createdAt: { type: Date, default: Date.now }
});

const Car = model('Car', carSchema);

module.exports = Car;