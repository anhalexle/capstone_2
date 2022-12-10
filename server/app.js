const express = require('express');
const app = express();

const dataRouter = require('./routes/data');
const connectDB = require('./db/connect');
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: "*",
})


require('dotenv').config();

//Middleware
app.use(express.json());
app.use((req,res,next)=> {
    req.io = io;
    next();
})
app.use('/capstone_2',dataRouter)

const port= 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        io.listen(app.listen(port,()=> console.log(`Server listening on http://localhost:${port}/capstone_2`)));
    }
    catch(err) {
        console.log(err);
    }
}

start();
