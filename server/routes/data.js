const express = require('express');
const dataRouter = express.Router();


dataRouter.route('/')
    .get((req,res) => res.send('Hello, world!'));

module.exports = dataRouter;