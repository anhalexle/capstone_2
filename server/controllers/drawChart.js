const data = require('../model/data')
const {checkConnection, getAllData} = require('./webSocket')
const delay = require('delay');
const fileName = "d:\\Workspace\\my_Capstone_2\\client\\chart.html"

const drawChart = async (req,res) => {
    try {
        const {name:valueName} = req.params;
        const filterData = await data.find({name:valueName})
        res.sendFile(fileName)
        const startDrawingData = async () => {
            req.io.on('connection',async socket => {
                socket.on('disconnect',()=>socket.connected)
                while (socket.connected) {
                    console.log(socket.connected)
                    await getAllData(socket,filterData);
                    await delay(500)
                }
            })
        }
        await startDrawingData();
    } catch (e)  {
        console.log(e)
    }
}

module.exports = drawChart