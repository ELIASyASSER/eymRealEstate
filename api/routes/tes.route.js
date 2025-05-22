import express from "express"
import {isLoggedIn,isAdmin} from "../controllers/isLoggedIn.controller.js"
import { verifyToken } from "../middleware/authorization.js"
const router = express.Router()

router.get("/test",verifyToken,isLoggedIn)
router.get("/adminTest",isAdmin)

export default router