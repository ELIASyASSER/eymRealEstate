import jwt from "jsonwebtoken"

const logAdmin = async(req,res,next)=>{
    try {
        const {username,password} =  req.body
    if(!username || !password){
        return res.status(400).json({success:false,message:"please enter username and password"})
    }
    if(username != process.env.ADMIN_USER_NAME || password != process.env.ADMIN_PASSWORD){
        return res.status(403).json({success:false,message:"Wrong Admin Credentials only admin can log in "})
    }

    const adminToken = jwt.sign({username,id: Date.now()},process.env.JWT_SECRET_ADMIN,{expiresIn:'7d'})

    return res.status(201).cookie("adminToken",adminToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV =="production"?true:false,
        sameSite:process.env.NODE_ENV =="production"?"none":"strict",
        maxAge:7*24*60*60*1000
    }).json({success:true,message:"admin log in successfully "})

    } catch (error) {
        next(error)
    }
}
const isAdminAuth = async(req,res,next)=>{
    
    try {
        res.status(200).json({success:true})

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export {logAdmin,isAdminAuth}