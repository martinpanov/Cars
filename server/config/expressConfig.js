const express = require('express');
const authController = require('../controller/authController');
const dataController = require('../controller/dataController');
const cors = require('../middlwares/cors');
const session = require('../middlwares/session');
const trimBody = require('../middlwares/trimBody');

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(trimBody());
  app.use(session());

  app.use('/api', authController);
  app.use('/api', dataController);
};