const { hasUser } = require('../middlwares/guards');
const { s3UploadV3, s3DeleteV3 } = require('../services/awsS3Service');
const { getAll, getById, deleteById, create, update, getHomeCars, getFiltered, getRentCars, getFilteredRentCars, rentCar, getUserCars, getUserRentCars, getProfilePicture, postProfilePicture } = require('../services/carService');
const parseError = require('../util/parser');
const multer = require('multer');
const dataController = require('express').Router();
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", false));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5000000000000000000000000000000000000000000000, files: 12 }
});


dataController.get('/', async (req, res) => {
    try {
        const cars = await getHomeCars();
        res.json(cars);
    } catch (error) {
        const message = parseError(error);
        res.status(404).json({ message });
    }
});

dataController.get('/catalog', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try {
            const cars = await getAll();

            res.json(cars);
        } catch (error) {
            if (error.name === 'CastError') {
                error.message = 'Cars not found';
            }

            const message = parseError(error);

            res.status(404).json({ message });
        }
    } else {
        try {
            const manufacturer = req.query.manufacturer;
            const model = req.query.model;
            const fromPrice = Number(req.query.fromPrice) || 1;
            const toPrice = Number(req.query.toPrice) || 99999999999;
            const year = Number(req.query.year) || '';
            const gearbox = req.query.gearbox;
            const city = req.query.city;
            const fuelType = req.query.fuelType;
            const fromHp = req.query.fromHp || 1;
            const toHp = req.query.toHp || 5000;
            const fromKm = req.query.fromKm || 0;
            const toKm = req.query.toKm || 99999999999;

            const cars = await getFiltered(manufacturer, model, fromPrice, toPrice, year, gearbox, city, fuelType, fromHp, toHp, fromKm, toKm);

            res.json(cars);
        } catch (error) {
            const message = parseError(error);
            res.status(400).json({ message });
        }
    }
});

dataController.get('/details/:id', async (req, res) => {
    try {
        const car = await getById(req.params.id);

        res.json(car);
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Car not found';
        }

        const message = parseError(error);

        res.status(404).json({ message });
    }
});

dataController.get('/rentcar', async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try {
            const cars = await getRentCars();
            res.json(cars);
        } catch (error) {
            const message = parseError(error);
            res.status(404).json({ message });
        }
    } else {
        try {
            const seats = req.query.seats;
            const doors = req.query.doors;
            const gearbox = req.query.gearbox;
            const fuelType = req.query.fuelType;
            const city = req.query.city;

            const cars = await getFilteredRentCars(seats, doors, gearbox, fuelType, city);

            res.json(cars);
        } catch (error) {
            const message = parseError(error);
            res.status(400).json({ message });
        }
    }
});

dataController.get('/rentcar/:id', hasUser(), async (req, res) => {
    try {
        const car = await rentCar(req.params.id, req.user._id);
        res.json(car);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

dataController.post('/myprofile/picture', hasUser(), upload.single('image'), async (req, res) => {
    try {
        if (req.file) {
            req.file.originalname = `${Date.now()}${req.file.originalname}`;
            await s3UploadV3(req.file);
        }

        const profilePicture = await postProfilePicture(req.user.username, req.file.originalname);

        res.json(profilePicture);
    } catch (error) {
        const message = parseError(error);
        res.status(404).json({ message });
    }
});

dataController.get('/myprofile/picture', hasUser(), async (req, res) => {
    try {
        const userProfilePicture = await getProfilePicture(req.user.username);

        res.json(userProfilePicture);
    } catch (error) {
        const message = parseError(error);
        res.status(404).json({ message });
    }
});

dataController.get('/myprofile/cars', hasUser(), async (req, res) => {
    try {
        const cars = await getUserCars(req.user._id);

        res.json(cars);
    } catch (error) {
        const message = parseError(error);
        res.status(404).json({ message });
    }
});

dataController.get('/myprofile/rentcars', hasUser(), async (req, res) => {
    try {
        const cars = await getUserRentCars(req.user._id);

        res.json(cars);
    } catch (error) {
        const message = parseError(error);
        res.status(404).json({ message });
    }
});

dataController.get('/edit/:id', hasUser(), async (req, res) => {
    try {
        const car = await getById(req.params.id);

        if (req.user._id !== car._ownerId) {
            return res.status(403).json({ message: 'You are not the owner of this car' });
        }

        res.json(car);
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Car not found';
        }

        const message = parseError(error);

        res.status(400).json({ message });
    }

});

dataController.put('/edit/:id', hasUser(), upload.array('images', 12), async (req, res) => {
    try {
        const car = await getById(req.params.id);

        if (req.user._id != car._ownerId) {
            return res.status(403).json({ message: 'You are not the owner of this car' });
        }



        if (req.files.length > 0) {
            req.files.forEach(file => file.originalname = `${Date.now()}${file.originalname}`);
            await s3UploadV3(req.files);
        }

        const imagesNames = car.imagesNames.filter(image => !req.body.imagesNames.includes(image))

        if (imagesNames.length > 0) {
            await s3DeleteV3(imagesNames)
        }

        const data = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: Number(req.body.price),
            year: Number(req.body.year),
            phoneNumber: req.body.phoneNumber,
            description: req.body.description,
            gearbox: req.body.gearbox,
            city: req.body.city,
            fuelType: req.body.fuelType,
            horsePower: Number(req.body.horsePower),
            kilometers: Number(req.body.kilometers),
            imagesNames: Array.isArray(req.body.imagesNames) ? [...req.body.imagesNames, ...req.files.map(file => file.originalname)] : 
            [req.body.imagesNames, ...req.files.map(file => file.originalname)]
        }

        const result = await update(req.params.id, data);
        res.json(result);
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Car not found';
        }

        const message = parseError(error);

        res.status(400).json({ message });
    }

});

dataController.post('/sell', hasUser(), upload.array('images', 12), async (req, res) => {
    try {
        req.files.forEach(file => file.originalname = `${Date.now()}${file.originalname}`);

        const data = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            price: Number(req.body.price),
            year: Number(req.body.year),
            phoneNumber: req.body.phoneNumber,
            description: req.body.description,
            gearbox: req.body.gearbox,
            city: req.body.city,
            fuelType: req.body.fuelType,
            horsePower: Number(req.body.horsePower),
            kilometers: Number(req.body.kilometers),
            imagesNames: req.files.map(file => file.originalname),
            _ownerId: req.user._id
        };

        await s3UploadV3(req.files);
        const car = await create(data);

        res.json(car);
    } catch (error) {
        const message = parseError(error);

        res.status(400).json({ message });
    }
});

dataController.delete('/details/:id', hasUser(), async (req, res) => {
    try {
        if (req.user._id != car._ownerId) {
            return res.status(403).json({ message: 'You are not the owner of this car' });
        }

        const car = await getById(req.params.id);


        await s3DeleteV3(car.imagesNames);

        await deleteById(req.params.id);

        res.json({ message: 'Success' });
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Car not found';
        }

        const message = parseError(error);

        res.status(400).json({ message });
    }
});

module.exports = dataController;