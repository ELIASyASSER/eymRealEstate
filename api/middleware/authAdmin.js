import jwt from "jsonwebtoken"
const authenticateAdmin = (req,res,next)=>{
    const {adminToken} = req.cookies
    try {
        if(!adminToken){
            return res.status(403).json({success:false,message:"You can't access this admin page "})
        }

        const decodedToken = jwt.verify(adminToken,process.env.JWT_SECRET_ADMIN)
        if(decodedToken.username == process.env.ADMIN_USER_NAME){
            next()
        }else{
               return res.status(403).json({success:false,message:"You can't access this admin page "})
        }
    } catch (error) {
        console.log(error.message)
        if(error instanceof jwt.TokenExpiredError){
            return res.status(403).json({success:false,message:"Your session has been expired please log admin again"})
        }else{
            next(error)
        }
    }
}
export default authenticateAdmin