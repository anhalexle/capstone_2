const express = require('express');
const dataRouter = express.Router();
const {getAllData,checkConnection} = require('../controllers/webSocket')
const delay = require('delay');
const fileName = "d:\\Workspace\\my_Capstone_2\\client\\index.html"
dataRouter.route('/')
    .get((req,res) => {
        res.sendFile(fileName)
        checkConnection(req.io);
        const startUpdateData=  async () => {
            while(true) {
                await getAllData(req.io)
                await delay(500)
            }
        }
        startUpdateData()
    });

module.exports = dataRouter;