const express = require('express');

const wsRoute = express.Router();
const {getAllData} = require('../controllers/webSocket')
wsRoute.route('/')
    .get(getAllData)

module.exports = wsRoute;