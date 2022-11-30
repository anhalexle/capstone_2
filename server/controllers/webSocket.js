const data = require('../model/data')


const getAllData = async (io)=> {
    try {
        let _data = await data.find({})
        if (_data) {
            io.emit("sendData",_data)
        }
    }
    catch (e) {
        console.log(e)
    }
}

const checkConnection = (io) => {
    io.on('connection',socket => console.log(`user connected ${socket.id}`))
}

module.exports = {getAllData,checkConnection}