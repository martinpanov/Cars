const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const parserError = require('../util/parser');

authController.post('/register',
    body('username').isLength({ min: 3 }).withMessage('Username should be at least 3 characters'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters')
    , async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const token = await register(req.body.username, req.body.password);
            res.json(token);
        } catch (error) {
            const message = parserError(error);
            res.status(400).json({ message });
        }
    });


authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parserError(error);
        res.status(401).json({ message });
    }
});

authController.get('/logout', (req, res) => {
    res.status(200).end();
});

module.exports = authController;