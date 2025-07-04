import express from "express"
import {  getUser, getUsers, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/authorization.js"
const router = express.Router()

router.get("/",getUsers)
router.get("/:id",verifyToken,getUser)
router.put("/:id",verifyToken,updateUser)



export default router