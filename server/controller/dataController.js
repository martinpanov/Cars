const { hasUser } = require('../middlwares/guards');
const { getAll, getById, deleteById, create, update } = require('../services/carService');
const parseError = require('../util/parser');

const dataController = require('express').Router();

dataController.get('/catalog', async (req, res) => {
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

dataController.post('/sell/:id', hasUser(), async (req, res) => {
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