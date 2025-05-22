import forBidden from "../errors/forBidden.js";
import NotFound from "../errors/notFound.js";
import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
const getUsers = async(req,res,next)=>{
    try {
        const users =await prisma.user.findMany();
        res.status(200).json(users)

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

const getUser = async(req,res,next)=>{
    const {id} = req.params
    try {
    const user =await prisma.user.findUnique({
        where:{
            id:id
        }
    });
    if(!user){
        throw new NotFound("User Not Found")
    }
    res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const updateUser = async(req,res,next)=>{
    const {id} = req.params
    const tokenUserId = req.userId
    const {password,avatar,...inputs}= req.body  
    
    let updatedPassword = null
    
    
    try {

        if(id !== tokenUserId){
            throw new forBidden("Not Authorized You can't update information")
        }

        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:id,
            },
            data:{
                ...inputs,
                ...(updatedPassword&&{
                    password:updatedPassword

                }),
                ...(avatar&&{
                    avatar
                })
            }
        })
    const {password:userPassword,...rest} = updatedUser
        res.status(200).json(rest)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteUser =async(req,res,next)=>{
    
    const {id} = req.params
    const tokenUserId = req.userId

    

    try {
        
        if(id !== tokenUserId){
            throw new forBidden("Not Authorized You can't update information")
        }

        await prisma.user.delete({
            where:{
                id:id
            }
        })
        res.status(200).json({message:"user deleted"})

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}


export {getUsers,getUser,updateUser,deleteUser}