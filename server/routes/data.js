const express = require('express');
const dataRouter = express.Router();
const dataController = require('../controllers/data')
dataRouter.route('/')
    .get(dataController);

module.exports = dataRouter;