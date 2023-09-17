export default function formValidation(formData, setErrors) {
    try {

        let errors = {};
        for (let [key, value] of formData.entries()) {
            if (key === 'year' && (value < 1900 || value > 2023)) {
                errors.year = 'Year must be between 1900 and 2023';
            }
            if (key === 'horsePower' && value < 1) {
                errors.horsePower = 'HP must be at least 1';
            }
            if (key === 'gearbox' && (value !== 'Manual' && value !== 'Automatic')) {
                errors.gearbox = 'Gearbox must be either manual or automatic';
            }
            if (key === 'kilometers' && value < 1) {
                errors.kilometers = 'Kilometers must be at least 1';
            }
            if (key === 'fuelType' && (value !== 'Petrol' && value !== 'Diesel')) {
                errors.fuelType = 'Fuel type must be either petrol or diesel';
            }
            if (key === 'description' && value.length < 5) {
                errors.description = 'Description must be at least 5 characters long';
            }
            if (key === 'city' && value.length < 3) {
                errors.city = 'The city must be at least 3 characters long';
            }
            if (key === 'phoneNumber' && value < 9) {
                errors.phoneNumber = 'Phone Number must be at least 9 characters long';
            }
            if (key === 'manufacturer' && value.length < 2) {
                errors.manufacturer = 'Manufacturer must be at least 2 characters long';
            }
            if (key === 'model' && value.length < 1) {
                errors.model = 'Model must be at least 1 character long';
            }
            if (key === 'price' && value < 0.01) {
                errors.price = 'Price must be positive number';
            }
            if (key === 'images' && value.length < 1) {
                errors.images = 'There has to be at least 1 image';
            }
        }

        if (Object.keys(errors).length < 0) {
            return;
        }

        setErrors(errors);

        throw Error;
    } catch (error) {

    }
}