import jwt from "jsonwebtoken"
import Unathenticated from "../errors/unAuthenticated.js"
import forBidden from "../errors/forBidden.js"
export const verifyToken = (req,res,next)=>{
            
    const token = req.cookies?.token
    if(!token){
        
        return next( new Unathenticated("Not Authorized") )
    }
        jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{

        if(err) {return next( new forBidden("token is not valid"))}
        // req.userId = payload.id
        next() 

    })

    

}

