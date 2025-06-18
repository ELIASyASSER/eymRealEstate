import prisma from "../lib/prisma.js"
export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await prisma.user.findMany({
            select:{
                username:true,
                avatar:true,
                email:true,
                createdAt:true,
                posts:true

            }
            
            ,
            orderBy:{
                createdAt:"desc"
            }
        })
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}
