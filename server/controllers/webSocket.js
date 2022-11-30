const data = require('../model/data')


const getAllData = async (req,res,next)=> {
    try {
        let _data = await data.find({})
        if (_data) {
            console.log(req.io)
            req.io.on("connection",socket => {
                console.log(`User connected ${socket.id}`)
                socket.emit("sendData",_data)
            })
        }
        next()
    }
    catch (e) {
        console.log(e)
    }
}



module.exports = {getAllData}