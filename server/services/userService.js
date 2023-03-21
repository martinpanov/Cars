const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = 'VerySecretMarto%#@!';

async function register(username, password) {
    const existing = User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is taken');
    }

    const user = await User.create({
        username,
        password: await bcrypt.hash(password, 10)
    });

    return {
        _id: user._id,
        username: user.username,
        accessToken: createToken(user)
    };
}

async function login(username, password) {
    const user = User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Incorrect username or password');
    }
}

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username
    };

    return {
        _id: user._id,
        email: user.email,
        accessToken: jwt.sign(payload, jwtSecret)
    };
}

function parseToken(token) {
    return jwt.verify(token, jwtSecret);
}

module.exports = {
    register,
    login,
    parseToken
};