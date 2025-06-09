import express from "express"

const router = express.Router()
import { addChat, getAllChats, getChatById} from "../controllers/chat.controller.js"


import { verifyToken } from "../middleware/authorization.js"

// router.get("/",verifyToken,getChats)
// router.get("/:chatId",verifyToken,getChat)

router.post("/createChat",verifyToken,addChat)
router.get("/allChats",verifyToken,getAllChats)

router.get("/:chatId",getChatById)



export default router