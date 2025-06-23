import jwt from "jsonwebtoken"
import Unathenticated from "../errors/unAuthenticated.js"
import forBidden from "../errors/forBidden.js"
import prisma from "../lib/prisma.js"


export const verifyToken = async(req,res,next)=>{
            
    const token = req.cookies?.token
    if(!token){ 

        return next( new Unathenticated("Not Authorized please login again ") )
    
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{

        if(err) {return next( new forBidden("token is not valid"))}
        const isLogged = await prisma.user.findUnique({
            where:{
                id:payload.id
            }   
        })
        if(!isLogged){
            return next(new Unathenticated("Invalid token please register again"))

        }
        req.userId = payload.id
        next() 

    })

    
}