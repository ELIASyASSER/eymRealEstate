import customError from "../errors/custom.error.js"
import prisma from "../lib/prisma.js"


const addMessage = async(req,res,next)=>{

    const tokenUserId = req.userId
    const chatId = req.params.chatId
    const txt = req.body.newMessage

    try {
          const lastMessage = await prisma.message.create({
            data:{
                text:txt,
                chatId:chatId,
                senderId:tokenUserId,
                

                
            }
        })
       
         await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{

            }
        })
        
        res.status(200).json(lastMessage)
    } catch (error) {

        console.log(error.message)
        next(new customError("Failed to send message"))
    }
}



export{addMessage}