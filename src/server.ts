// Import things here: 
import express from 'express'
import http from 'http'
import cors from 'cors'
import routes from './routes'
import cookieParser from 'cookie-parser'
import { PORT } from './constants'
import { Server } from 'socket.io'
import connection from './mysql'
import mongoDb from './helpers/database.helper'

// Coding here: 

const app = express()

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: process.env.END_POINT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: process.env.END_POINT_URL,
    credentials: true
}))

app.use(routes)

//connection // Connect to database

mongoDb

const key : string | undefined = process.env.SESSION_SECRET_KEY  


io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('send_message', (message) => {
        console.log('Received message:', message);
        socket.broadcast.emit('new_message', message);
    });


    const intervalId = setInterval(() => {
        const data = {
            timestamp: new Date(),
            value: Math.random().toFixed(2) 
        };
        socket.emit('updateData', data);
    }, 5000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); 
    });
});


server.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})


