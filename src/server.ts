// Import things here: 
import express from 'express'
import mongoose from 'mongoose'
import http from 'http'
import cors from 'cors'
import routes from './routes'
import cookieParser from 'cookie-parser'
import { PORT } from './constants'
import { Server } from 'socket.io'

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


mongoose.connect(`${process.env.DATA_BASE_ONLINE}`)
    .then(() => console.log('Connected to DB !!!'))
    .catch((err) => console.log(`Error: ${err}`))

const key : string | undefined = process.env.SESSION_SECRET_KEY  


io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('send_message', (message) => {
        console.log('Received message:', message);
        // Gửi lại thông điệp cho tất cả client khác
        socket.broadcast.emit('new_message', message);
    });

    // Cập nhật dữ liệu mỗi 5 giây
    const intervalId = setInterval(() => {
        const data = {
            timestamp: new Date(),
            value: Math.random().toFixed(2) // Ví dụ: gửi một số ngẫu nhiên
        };
        socket.emit('updateData', data);
    }, 5000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Dừng gửi khi client ngắt kết nối
    });
});


server.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})


