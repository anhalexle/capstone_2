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
    next()
})
app.use('/api/capstone_2',dataRouter);

io.on("connection",socket=> {
    console.log(`User connected to ${socket.id}`)
    socket.emit("sendData","hello")
})

const port= 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connect to DB successfully')
        io.listen(app.listen(port,()=> console.log(`Server listening on http://localhost:${port}/api/capstone_2`)));
    }
    catch(err) {
        console.log(err);
    }
}

start();