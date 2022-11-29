const connectDB = require('../db/connect')

const connect_to_DB = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log('Connect successfully')
        return
    } catch(err)  {
        console.log(err)
    }
}

module.exports = connect_to_DB;