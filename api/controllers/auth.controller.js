import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"
import Unathenticated from "../errors/unAuthenticated.js";
import customError from "../errors/custom.error.js";

export const register =async (req,res,next)=>{
    const {username,email,password} = req.body;
    try {
        if(!email || !username || !password){
            throw new customError("Please Enter Your  Credentials")
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10)
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
            throw new Unathenticated("Invalid Credentials")
            //now it will throw the error to the next() middleware will handle it 
        }

        //check if the password match
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            throw new Unathenticated("Invalid Credentials")


        }
        // create token and send it to user
        const age = 1000*60*60*24*7//7 days
        const token = jwt.sign({
            id:user.id,
            username:user.username,
            isAdmin:true

        },process.env.JWT_SECRET,{expiresIn:age})
        
        const {password:userPassword,...userInfo} = user
        // to set cookie manually we can say res.setHeader("Set-Cookie","token=","value of the token") 
        res.status(200).cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV =="production",
            maxAge:age,
            sameSite:process.env.NODE_ENV =="production"?"none":"lax"
        }).send(userInfo)
    } catch (error) {
        console.log(error.message)
        // res.status(500).send("failed to login ")
        next(error)
    }
}
export const logout = (req,res)=>{
       res.clearCookie("token").
       status(200).
       send("loggedOut Successfully")
}