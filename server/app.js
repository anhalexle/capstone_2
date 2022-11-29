const express = require('express');
const app = express();
const dataRouter = require('./routes/data');
const connectDB = require('./db/connect');
require('dotenv').config();

//Middleware
app.use(express.json());
app.use('/api/capstone_2',dataRouter);

//Route
// app.get('/', (req,res) =>  res.send('Hello world'))


const port= 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connect to DB successfully')
        app.listen(port,()=> console.log(`Server listening on http://localhost:${port}`));
    }
    catch(err) {
        console.log(err);
    }
}

start();