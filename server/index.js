const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
require('dotenv').config();
const connectDB = require('./config/db');

app.use(express.json());
app.use(cors({ origin: false }));
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

const port = process.env.PORT;

app.listen(port, ( req, res ) => {
    connectDB();
})



const { Server } = require("socket.io");

<<<<<<< HEAD
const io = new Server({ cors : "https://a-flax-omega.vercel.app"});
=======
const io = new Server({ cors: "https://a-flax-omega.vercel.app"});
>>>>>>> 8e3d8137b75fe3259555ec63345d0485b2e591fd

let onlineUsers = [];

io.on("connection", (socket) => {

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) && 
        onlineUsers.push({
            userId,
            socketId: socket.id,
        })

        io.emit("getOnlineUsers", onlineUsers);
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId)
        
        if(user) {
            io.to(user.socketId).emit("getMessage", message)
            
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            })
        }
    
    })
    
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);

    })
});

<<<<<<< HEAD
// io.listen(2000);
=======
>>>>>>> 8e3d8137b75fe3259555ec63345d0485b2e591fd
