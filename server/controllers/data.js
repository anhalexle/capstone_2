const {getAllData,checkConnection,connected} = require('../controllers/webSocket')
const delay = require('delay');
const fileName = "d:\\Workspace\\my_Capstone_2\\client\\index.html"

const dataController = (req,res) => {
    res.sendFile(fileName)

    const startUpdateData=  async () => {
        req.io.on('connection',async socket => {
            socket.on('disconnect',()=>socket.connected)
            while (socket.connected) {
                console.log(socket.connected)
                await getAllData(socket);
                await delay(500)
            }
        })
    }
    startUpdateData()
}

module.exports = dataController