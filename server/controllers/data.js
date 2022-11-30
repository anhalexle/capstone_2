const {getAllData,checkConnection} = require('../controllers/webSocket')
const delay = require('delay');
const fileName = "d:\\Workspace\\my_Capstone_2\\client\\index.html"

const dataController = async (req,res) => {
    res.sendFile(fileName)
        checkConnection(req.io);
        const startUpdateData=  async () => {
            while(true) {
                await getAllData(req.io)
                await delay(500)
            }
        }
    startUpdateData()
}

module.exports = dataController