const express = require('express');
const dataRouter = express.Router();
const {dataController} = require('../controllers/dataController')
const {drawChart} = require('../controllers/drawChart')
dataRouter.route('/')
    .get(dataController);
dataRouter.route('/:name')
    .get(drawChart)

module.exports = dataRouter;