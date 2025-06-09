import { Server } from "socket.io";
import {createServer}from "http"
const httpsServer = createServer()
const io = new Server(httpsServer,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }

})
let onlineUsers={};
// {a:"fdkf",b:"ieiup"}
const getUser = (id)=>{
    return Object.keys(onlineUsers).find((key)=>onlineUsers[key] == id)
}
io.on("connection",(socket)=>{
    socket.on("addUser",(userId)=>{
        onlineUsers[socket.id] = userId      
       io.emit("updateOnlineUsers",Object.values(onlineUsers))
     
    })

    socket.on("sendMessage",(info)=>{
        
        io.to(getUser(info.receiverId)).emit("getMessage",info.data)
        
    }) 
    socket.on("disconnect",()=>{
        delete onlineUsers[socket.id]
        io.emit("updateOnlineUsers",Object.values(onlineUsers))
        
    })
    
})

httpsServer.listen(4000)
