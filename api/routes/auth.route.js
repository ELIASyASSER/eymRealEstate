import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/authorization.js"
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.get("/is-logged",verifyToken,(req,res,next)=>{
    
})


export default router