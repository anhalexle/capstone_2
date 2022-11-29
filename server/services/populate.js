require('dotenv').config()

const connectDB = require('../db/connect')

const Data = require('../model/data')

const jsonData = require('./parameters.json')
// console.log(process.env.MONGO_URI)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Data.deleteMany();
        await Data.create(jsonData);
        console.log('Finished')
        process.exit(0)
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

start()
