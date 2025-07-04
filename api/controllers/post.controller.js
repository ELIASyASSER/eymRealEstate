import { makeTypedQueryFactory } from "@prisma/client/runtime/library"
import forBidden from "../errors/forBidden.js"
import NotFound from "../errors/notFound.js"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"


const getPosts = async(req,res,next)=>{
    const query = req.query
    const page = parseInt(query.page||1)
    const limit = 8 //8 posts //8 8 8 8 1
    const skip = (page-1)*limit
    
    

    try {
        const posts  = await prisma.post.findMany({
    
            where:{
                city:query.city||undefined,
                type:query.type||undefined,
                property:query.property||undefined,
                price:{
                    gte:parseInt(query.minPrice)||0,
                    
                    lte:parseInt(query.maxPrice)||100_000_0000_0000
                }
            },
            skip,
            take:limit,
            orderBy:{
                createdAt:"desc"//new first
            },
            include:{
                user:{
                    select:{
                        avatar:true,
                        username:true,
                        id:true
                    }
                }
            }
            
        })
        const totalPosts = await prisma.post.count({})
        const hasMore = skip+posts.length<totalPosts
            res.status(200).json({posts:posts,hasMore:hasMore})

    } catch (err) {
        console.log(err.message)
        next(err)
    }
}
const getSinglePost = async(req,res,next)=>{
    const {id} = req.params
    try {
        const post  = await prisma.post.findUnique({
            where:{id:id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        avatar:true,
                        username:true
                    }
                }
            }
        })
        const token  = req.cookies?.token
        if(token){
            jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
                if(!err){
                    
                    try {
                        
                        const saved = await prisma.savedPosts.findUnique({
                            where:{
                                postId_userId:{
                                    postId:req.params.id,
                                    userId:payload.id
                                }
                            }
                        })
                        return res.status(200).json({...post,isSaved:saved?true:false})
                    } catch (innerErr) {
                        return next(innerErr)
                    }
                    
                
                }else{
                    return res.status(200).json({...post,isSaved:false})
                }
            })
        }else{
            return res.status(200).json({...post,isSaved:false})
        }
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}
const addPost = async(req,res,next)=>{
    const body = req.body
    const tokenUserId = req.userId
    try {
        const newPost = await prisma.post.create({
            
            data:{
                ...body.postData,
                userId:tokenUserId,
                postDetail:{
                    create:body.postDetail
                }
            }
        })
        res.status(201).json(newPost)
        
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}
const updatePost = async(req,res,next)=>{
    
    try {
        res.status(200).json()
        
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}

const deletePost = async(req,res,next)=>{
    const id = req.params.id
    const tokenUserId = req.userId

    try {
        const post = await prisma.post.findUnique({
            where:{
                id:id
            }
        })

        if(!post){
            throw new NotFound("this post Not Found try again later")
        }
        if(post.userId != tokenUserId){
            throw new forBidden("Not Authorized You can't delete these information")
        }


        await prisma.postDetail.deleteMany({
            where:{postId:id}
        })
        await prisma.post.delete({
            where:{id:id}
        })

        res.status(200).json({message:"Post Deleted Successfully"})
        
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}

const savePost = async(req,res,next)=>{
    const postId = req.body.postId;
    const tokenUserId =req.userId

    try {
        const savedPost= await prisma.savedPosts.findUnique({
            where:{postId_userId:{
                userId:tokenUserId,
                postId:postId
            }
        }
        })
        if(savedPost){
            await prisma.savedPosts.delete({
                where:{
                    id:savedPost.id
                }
            })
            return res.status(200).json({message:"Post Removed From SavedList"})
        }else{
            await prisma.savedPosts.create({
                data:{
                    postId:postId,
                    userId:tokenUserId
                }
            })

            return res.status(201).json({message:"Post  Saved"})

        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const profilePosts = async(req,res,next)=>{
    const tokenUserId = req.userId
    try {
        const userPosts = await prisma.post.findMany({
            where:{
            userId:tokenUserId
        },
        include:{
            user:{
                select:{
                    id:true,
                    username:true,
                    avatar:true
                }
            }
        }
    })
    const saved = await prisma.savedPosts.findMany({
        where:{
            userId:tokenUserId
        },
        include:{
            post:true,
            user:{
                select:{
                    id:true,
                    username:true,
                    avatar:true
                }
            }
        }
    })
    const savedPosts = saved.map((item)=>{
        return{
                ...item.post,
                user:item.user
        }
    })
    res.status(200).json({userPosts,savedPosts})

} catch (error) {
    console.log(error)
    next(error)
}
}

export {
    getPosts,
    getSinglePost,
    updatePost,
    deletePost,
    addPost,
    savePost,
    profilePosts
}   