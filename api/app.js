import express from "express"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import adminRoute from "./routes/admin.route.js"
import isLogged from "./routes/tes.route.js"
import Users from "./routes/user.route.js"
import MessageRoute from "./routes/message.route.js"
import chatRoute from "./routes/chat.route.js"
import dashboardRoute from "./routes/dashboard.route.js"
import errorHandler from "./middleware/errors.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config.js"
import customError from "./errors/custom.error.js"
import authenticateAdmin from "./middleware/authAdmin.js"
import emailRoute  from "./routes/mail.route.js"
const app = express()
//middlewares
app.use(cors({
    origin:[process.env.CLIENT_URL,"https://eym-real-estate-yl9v.vercel.app"],
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
app.use("/api/admin",adminRoute)
app.use("/api/dashboard",authenticateAdmin,dashboardRoute)
// send email
app.use("/api",emailRoute)

//error handling
 
app.use(errorHandler)

app.listen(5000,async()=>{ 
    
    console.log('server is running')  

})