import jwt from "jsonwebtoken"

import Unathenticated from "../errors/unAuthenticated.js"
import forBidden from "../errors/forBidden.js"

const isLoggedIn = (req,res,next)=>{
    res.status(200).send("You Are Authenticated")

}

const isAdmin =(req,res,next)=>{
        
        const token = req.cookies.token
        if(!token){
            return next( new Unathenticated("Not Authorized"))
        }
        jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
            if(err) {return next( new forBidden("token is not valid"))}

            if(!payload.isAdmin) {return next( new forBidden("Not Authorized"))}

                res.status(200).send("You Are Authenticated")
            
        })
}

export {isLoggedIn,isAdmin}  