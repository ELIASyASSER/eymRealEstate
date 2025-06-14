import express from "express"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import isLogged from "./routes/tes.route.js"
import Users from "./routes/user.route.js"
import MessageRoute from "./routes/message.route.js"
import chatRoute from "./routes/chat.route.js"
import errorHandler from "./middleware/errors.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config.js"
const app = express()
//middlewares
app.use(cors({
    origin:[process.env.CLIENT_URL,"https://eym-real-estate-ra9u2hmaf-eliasyassers-projects.vercel.app"],
    credentials:true,
    
}))
app.use(cookieParser())
app.use(express.json())

//routes
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api",isLogged)
app.use("/api/users",Users)
app.use("/api/chat",chatRoute)
app.use("/api/message",MessageRoute)
//error handling

app.use(errorHandler)

app.listen(5000,async()=>{
    console.log('server is running')
})