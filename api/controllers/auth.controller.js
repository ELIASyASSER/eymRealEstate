import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
import Unathenticated from "../errors/unAuthenticated.js";

export const register =async (req,res,next)=>{
    const {username,email,password} = req.body;
    try {
        
        //hash the password
        const hashedPassword =await bcrypt.hash(password,10)
    // create new user save it to db
    const newUser = await prisma.user.create({
        data:{
            username:username,
            email:email,
            password:hashedPassword
        }
    })
    res.status(201).send("user Created Successfully");
    
} catch (error) {
        console.log(error)
        
        next(error)
    }
    
}

export const login = async(req,res,next)=>{
    const {username,password} = req.body
    try {
        
        //check if the user exist
        const user = await prisma.user.findUnique({
            where:{username:username}
        })

        if(!user){ 
            throw new Unathenticated("Invalid Credintials")
        }
        //check if the password match
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            throw new Unathenticated("Invalid Credintials")


        }
        // create token and send it to user
        const age = 1000*60*60*24*7
        const token = jwt.sign({
            id:user.id,
            username:user.username,
            isAdmin:true

        },process.env.JWT_SECRET,{expiresIn:age})
        
        const {password:userPassword,...userInfo} = user
        
        res.status(200).cookie("token",token,{
            httpOnly:true,
            // secure:true;
            maxAge:age
        }).send(userInfo)
    } catch (error) {
        console.log(error.message)
        // res.status(500).send("failed to login ")
        next(error)
    }
}
export const logout = (req,res)=>{

       res.clearCookie("token").status(200).send("logedOut Successfully")
}