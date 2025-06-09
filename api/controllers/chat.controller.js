import customError from "../errors/custom.error.js"
import prisma from "../lib/prisma.js"


const addChat = async(req,res,next)=>{
    const senderId = req.userId
    const receiverId = req.body.receiverId
    try {
        const existingChat = await prisma.chat.findFirst({
            where:{
                AND:[
                   { ParticipantUsers:{some:{userId:senderId}}},
                    {ParticipantUsers:{some:{userId:receiverId}}},
                    ]
                
            },
            include:{
                ParticipantUsers:{
                    include:{

                    user:{
                        select:{

                            avatar:true,username:true,id:true
                        }
                    }
                }
                
            },
            
            messages:{
                orderBy:{
                    createdAt:"desc",
                },
                take:1 
            }
            }
        })
        
        if(existingChat){
            return res.status(200).json({message:"redirecting you to chats ...",chat:existingChat})
        }

        const chat = await prisma.chat.create({
            data:{
                ParticipantUsers:{
                    create:[
                    {
                        user:{connect:{id:senderId}},
                        role:"SENDER"
                    
                    },
                    {
                        user:{connect:{id:receiverId}},
                        role:"RECEIVER"
                    }
                ]
                }
            },
            include:{
                ParticipantUsers:{
                    include:{user:{
                        select:{
                            avatar:true,
                            username:true,
                            id:true
                        }
                    }}
            }
        }
    })

        res.status(201).json({message:"redirecting you to chat",chat})

    } catch (error) {
        console.log(error.message)
        next(new customError(error.message ||"Failed to add chat"))
    }
}
const getAllChats = async(req,res,next)=>{
    const userId = req.userId
    try {
        
        const chats = await prisma.participant.findMany({
            where:{
                userId:userId
            },
            include:{
                chat:{
                    include:{
                        ParticipantUsers:{
                            include:{
                                user:{
                                    select:{
                                        avatar:true,
                                        username:true,
                                        id:true
                                    }
                                }
                            }
                        },
                        messages:{
                            orderBy:{createdAt:"desc"},
                            take:1//get last message
                        }
                    }
                },
                
            }
        })
        res.status(200).json(chats)
        
    } catch (error) {
        console.log(error.message)
        next(new customError(error.message ||"Failed to getAll Chats"))

    }
}

const getChatById = async(req,res,next)=>{
    const {chatId}= req.params
    try {
 
        

        const chat  = await prisma.chat.findUnique({
            where:{
                id:chatId
            },
            include:{
                ParticipantUsers:{
                    include:{
                        
                        user:{
                            select:{
                                avatar:true,
                                username:true
                            }
                        }
                    },
                    
                },
                messages:{
                    include:{
                        sender:{
                            select:{
                                avatar:true
                            }
                        }
                    },
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
            
            
        })

        res.json(chat)

        
    } catch (error) {
        next(error)
    }
}


export{
    addChat,
    getAllChats,
    getChatById
}