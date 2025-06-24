import  nodemailer  from "nodemailer";
import customError from "../errors/custom.error.js";

export const sendEmail=async(req,res,next)=>{
const {content,sender,senderEmail} = req.body
console.log(req.body)
if(!content){
    return new customError("Can't send email with empty content")
}
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  
});

try {
    
    const info = await transporter.sendMail({
      from: ` <${senderEmail}>`,
      to:process.env.EMAIL_USER ,
      text: content, // plain‑text body
      html: `
      <h1>From ${sender}</h1>
      <b>${content}</b>`, // HTML body
    });
    console.log("Message sent:", info.messageId);
    res.status(201).send("Message Sent Successfully")
} catch (error) {
    console.log(error.message)
    next(new customError("Failed to send email please try again later"))
}

} 