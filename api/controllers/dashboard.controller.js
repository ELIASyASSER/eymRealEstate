import customError from "../errors/custom.error.js"
import prisma from "../lib/prisma.js"

export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await prisma.user.findMany({
            select:{
                id:true,
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
    
export const deleteUser =async(req,res,next)=>{
    const id = req.params.id

    try {
    
        await prisma.post.deleteMany({
            where:{
                userId:id
            }
        })
        
        await prisma.user.delete({
            where:{
                id:id
            }
        })
        
        res.clearCookie("token").status(200).json({message:"user deleted"})

    } catch (error) {
        console.log(error.message)
        next(new customError("failed to delete user"))
    }
}

export const deletePost =async(req,res,next)=>{
    const id = req.params.id
    console.log(id)
    try {
        
        await prisma.post.delete({
            where:{
                id:id
            }
        })
        res.status(200).json({message:"Post deleted"})

    } catch (error) {
        console.log(error.message)
        next(new customError("failed to delete post"))
    }
}

export const getUserPosts = async(req,res,next)=>{
    const {id} = req.params
    try {
        const userPosts = await prisma.post.findMany({
            where:{
                userId:id,

            }
        })
        res.status(200).json(userPosts)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
} 

// get stats users,posts,...
export const getStats = async(req,res,next)=>{
    try {
        const PostsCount = await prisma.post.count({})
        const VisitorsCount = await prisma.user.count({})
        const sellersCount = await prisma.user.count({
            where:{
                posts:{
                    some:{}
                }
            }
        })
        res.status(200).json({sellersCount,VisitorsCount,PostsCount})
    } catch (error) {
        console.log(error.message)
        next(error)
    }
} 
