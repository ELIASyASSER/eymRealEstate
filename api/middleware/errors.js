const errorHandler = (err,req,res,next)=>{
    const state = err.statusCode || 500;
    const msg =  err.message ||"Interval Server Error"
    res.status(state).json({message:msg})
}
export default errorHandler