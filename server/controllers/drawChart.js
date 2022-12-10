const data = require('../model/data')


const fileName = "d:\\Workspace\\my_Capstone_2\\client\\chart.html"

const drawChart = async (req,res) => {
    try {
        let collectData
        let {name:valueName} = req.params;
        const filterData = await data.find({name:valueName})
        res.sendFile(fileName)
        req.io.of('/parameters').on('connection',socket => {
            const promise = new Promise((resolve, reject) =>{
                resolve(req.io.of('/parameters').fetchSockets())
            })
            promise.then(res =>console.log(res))
            socket.emit('sendParameter',req.params.name)
            socket.on('disconnect',()=> {
                socket.off('sendParameter',()=> console.log(req.params.name))
                socket.disconnect(true)
            })
        })
        req.io.of(`/${valueName}`).on('connection', socket => {
            collectData = setInterval(() => {
                let _data = filterData;
                if (_data) {
                    socket.emit('sendDataChart',_data);
                }
            },1000)
        })
        req.io.of(`/${valueName}`).on('disconnect',socket=>{
            clearInterval(collectData)
            socket.disconnect(true)
        })
    } catch (e)  {
        console.log(e)
    }
}

module.exports = {drawChart}