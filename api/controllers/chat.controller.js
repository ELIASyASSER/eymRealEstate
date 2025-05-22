import customError from "../errors/custom.error.js"
import prisma from "../lib/prisma.js"


const getChats = async(req,res,next)=>{
    const tokenUserId = req.userId
    try {
        const chats =await prisma.chat.findMany({
            where:{
                userIds:{
                    hasSome:[tokenUserId]

                }
            }
        })

        for(let ch of chats){
            let receiverId = ch.userIds.find((id)=>id != tokenUserId)
            let item = await prisma.user.findUnique({
                where:{
                    id:receiverId
                },
                select:{
                    id:true,
                    avatar:true,
                    username:true
                }

            })

            ch.receiver = item;
            
        }
        
        res.status(200).json(chats)
    } catch (error) {
        console.log(error.message)
        next(new customError("Failed to get Chats"))
    }


}
const getChat = async(req,res,next)=>{
    const tokenUserId = req.userId
    console.log(req.params)
    try {
        const chat = await prisma.chat.findFirst({
            where:{
                id:req.params.chatId,
                userIds:{
                    hasSome:[tokenUserId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })
        await prisma.chat.update({
            where:{
                id:req.params.chatId,
                
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
        
            res.status(200).json(chat)

    } catch (error) {
        console.log(error.message)
        next(new customError("Failed to get Chat"))
    }
}
const addChat = async(req,res,next)=>{
    const tokenUserId = req.userId
    try {
        const newChat = await prisma.chat.create({
            data:{
                userIds:[tokenUserId,req.body.recieverId]
            }
        })
        res.status(200).json(newChat)

    } catch (error) {
        console.log(error.message)
        next(new customError("Failed to add chat"))
    }
}
const readChat = async(req,res,next)=>{
    const tokenUserId = req.userId
    console.log(req.params)
    try {   
        const updatedChat = await prisma.chat.update({
            where:{
                id:req.params.id,
                userIds:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
        res.status(200).json(updatedChat)

    } catch (error) {
        console.log(error.message)
        next(new customError("Failed to read chat"))
    }
}


export{getChats,getChat,readChat,addChat}