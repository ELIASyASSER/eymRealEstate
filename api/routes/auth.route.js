import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/authorization.js"
// import Unathenticated from "../errors/unAuthenticated.js"
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/is-auth",verifyToken,(req,res,next)=>{
    try {
        res.status(200).json("welcome again")
    } catch (error) {
        next(error)
    }
})


export default router