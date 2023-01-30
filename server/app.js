const express = require('express');
const app = express();

const dataRouter = require('./routes/data');
const connectDB = require('./db/connect');
const http = require('http');
const server = http.createServer(app)
// const io = require('socket.io')(server, {
//     cors: "*",
// })

const {Server} = require('socket.io');
const io = new Server(server)

require('dotenv').config();

//Middleware

app.use(express.json());

// app.use('/capstone_2',dataRouter)
app.use('/capstone_2',express.static('./Front_end_1'))
io.on('connect',socket => {
    socket.on('sendAllData',arg =>{
        io.emit('sendAllDataClient',arg);
    })
})


const container = {} 
io.of('/parameter').on('connect', socket=> {
    socket.on('parameterName',name => { 
        container.parameterName = name;
        io.of('/parameter').emit('sendDataName',name)
    })
    socket.on('sendData',data => {  
        if (container.parameterName === data[0].name) {
            io.of('/parameter').emit('sendDataClient',data)
        } 
    })
    socket.on('disconnect',()=> {
        socket.disconnect(true);
    })
})

const port= 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port,()=> console.log(`Server listening on http://localhost:${port}/capstone_2`))
    }
    catch(err) {
        console.log(err);
    }
}

start();
