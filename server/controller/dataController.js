const { hasUser } = require('../middlwares/guards');
const { getAll, getById, deleteById, create, update, getHomeCars, getFiltered } = require('../services/carService');
const parseError = require('../util/parser');

const dataController = require('express').Router();

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

dataController.get('/catalog/:id', async (req, res) => {
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

dataController.get('/edit/:id', hasUser(), async (req, res) => {
    try {
        const car = await getById(req.params.id);

        if (req.user._id !== car._ownerId) {
            res.status(403).json({ message: 'You are not the owner of this car' });
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

dataController.put('/edit/:id', async (req, res) => {
    try {
        const car = await getById(req.params.id);

        if (req.user._id !== car._ownerId) {
            res.status(403).json({ message: 'You are not the owner of this car' });
        }

        const data = await update(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Car not found';
        }

        const message = parseError(error);

        res.status(400).json({ message });
    }

});

dataController.post('/sell', hasUser(), async (req, res) => {
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);

        const car = await create(data);

        res.json(car);
    } catch (error) {
        const message = parseError(error);

        res.status(400).json({ message });
    }
});

dataController.get('/delete/:id', hasUser(), async (req, res) => {
    try {
        const car = await getById(req.params.id);

        if (req.user._id !== car._ownerId) {
            res.status(403).json({ message: 'You are not the owner of this car' });
        }

        await deleteById(req.params.id);

        res.status(204).end();
    } catch (error) {
        if (error.name === 'CastError') {
            error.message = 'Car not found';
        }

        const message = parseError(error);

        res.status(400).json({ message });
    }
});

module.exports = dataController;