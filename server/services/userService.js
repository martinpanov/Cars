const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = 'VerySecretMarto%#@!';

const tokenBlacklist = new Set();

async function getUser(username) {
  return User.findOne({ username }).collation({ locale: 'en', strength: 2 });
}

async function register(username, password, repass) {
  const existing = await getUser(username);
  if (existing) {
    throw new Error('Username is taken');
  }

  if (password !== repass) {
    throw new Error('Passwords do not match');
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
  const user = await getUser(username);
  if (!user) {
    throw new Error('Incorrect username or password');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect username or password');
  }

  return {
    _id: user._id,
    username: user.username,
    accessToken: createToken(user)
  };
}

async function logout(token) {
  tokenBlacklist.add(token);
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
  getUser,
  register,
  login,
  logout,
  parseToken
};