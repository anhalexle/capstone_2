const data = require('../model/data')


const fileName = "d:\\Workspace\\my_Capstone_2\\client\\chart.html"

const drawChart = async (req,res) => {
    try {
        res.sendFile(fileName)
    } catch (e)  {
        console.log(e)
    }
}

module.exports = {drawChart}