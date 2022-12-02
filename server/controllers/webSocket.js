const data = require('../model/data')

const getAllData = async (socket,filterData)=> {
    try {

        if (!filterData) {
            let _data1 = await data.find({})
            if (_data1) {
                socket.emit("sendData",_data1)
            }
        }
        else {
            let _data2 = filterData;
            if (_data2) {
                socket.emit("sendDataChart",_data2)
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}

const checkConnect = (socket) => socket.connected
let connected
const checkConnection = (io) => {
    io.on('connection',socket => {
        connected = checkConnect(socket)
        socket.on('disconnect',()=> {connected = checkConnect(socket)})
    })
}



module.exports = {getAllData,checkConnection,connected}