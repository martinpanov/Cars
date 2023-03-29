const authController = require('express').Router();
const { body, validationResult } = require('express-validator');
const { register, login, logout } = require('../services/userService');
const parserError = require('../util/parser');

authController.post('/register',
    body('username')
        .notEmpty().withMessage('All fields are required')
        .bail()
        .isLength({ min: 3 }).withMessage('Username should be at least 3 characters'),
    body('password')
        .notEmpty().withMessage('All fields are required')
        .bail()
        .isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    body('repass')
        .notEmpty().withMessage('All fields are required')
    , async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                if (errors[0].msg === 'All fields are required') {
                    throw [errors[0]];
                }

                throw errors;
            }
            const token = await register(req.body.username, req.body.password, req.body.repass);
            res.json(token);
        } catch (error) {
            const message = parserError(error);
            res.status(400).json({ message });
        }
    });


authController.post('/login',
    body('username').notEmpty().withMessage('Incorrect username or password').bail(),
    body('password').notEmpty().withMessage('Incorrect username or password'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                if (errors[0].msg === 'Incorrect username or password') {
                    throw [errors[0]];
                }
                throw errors;
            }
            const token = await login(req.body.username, req.body.password);
            res.json(token);
        } catch (error) {
            const message = parserError(error);
            res.status(401).json({ message });
        }
    });

authController.get('/logout', async (req, res) => {
    const token = req.headers['x-authorization'];
    await logout(token);
    res.status(200).json({ message: 'Token blacklisted' }).end();
});

module.exports = authController;