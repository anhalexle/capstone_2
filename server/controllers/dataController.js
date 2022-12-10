const data = require('../model/data')
const fileName = "d:\\Workspace\\my_Capstone_2\\client\\index.html"

const dataController = async (req,res) => {
    try {
        let collectData;
        res.sendFile(fileName)
        req.io.on('connection', socket => {
            collectData =setInterval(async () => {
                const filterData = await data.find({})
                if (filterData) {
                    socket.emit('sendData',filterData)
                }
            },1000)
        })
        req.io.on('disconnect',()=> {
            clearInterval(collectData)
            req.io.disconnect();
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {dataController}