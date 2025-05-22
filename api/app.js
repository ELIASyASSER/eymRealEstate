import express from "express"
const app = express()
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import isLogged from "./routes/tes.route.js"
import Users from "./routes/user.route.js"
import ChatRoute from "./routes/chat.route.js"
import MessageRoute from "./routes/message.route.js"
import errorHandler from "./middleware/errors.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config.js"
//middlewares
import prisma from "./lib/prisma.js"
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

//routes
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api",isLogged)
app.use("/api/users",Users)
app.use("/api/posts",postRoute)
app.use("/api/chats",ChatRoute)
app.use("/api/message",MessageRoute)
//error handling

app.use(errorHandler)

app.listen(5000,async()=>{
    console.log('server is running')
})