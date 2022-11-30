const express = require('express');
const dataRouter = express.Router();

const fileName = "d:\\Workspace\\my_Capstone_2\\client\\index.html"
dataRouter.route('/')
    .get((req,res) => {
        res.sendFile(fileName)
    });

module.exports = dataRouter;