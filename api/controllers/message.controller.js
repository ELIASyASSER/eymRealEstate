import customError from "../errors/custom.error.js"
import NotFound from "../errors/notFound.js"
import prisma from "../lib/prisma.js"


const addMessage = async(req,res,next)=>{

    const tokenUserId = req.userId
    const chatId = req.params.chatId
    const txt = req.body.msg

    try {
        const chat  = await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIds:{
                    hasSome:[tokenUserId]
                }
            }
        })
        if(!chat){
            throw new NotFound("chat not found")
        }

        const message =await prisma.message.create({

            data:{
                text:txt,
                chatId:chatId,
                userId:tokenUserId
            },
        })

        await prisma.chat.update({

            where:{
                id:chatId
            },


            data:{
                seenBy:[tokenUserId],
                lastMessage:txt,
            }
        })

        res.status(201).json(message)

    } catch (error) {

        console.log(error.message)
        next(new customError("Failed to send message"))
    }
}



export{addMessage}