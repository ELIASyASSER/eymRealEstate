import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./constact.scss";
import apiRequest from "../../lib/apiRequest"
import { toast } from "react-toastify";
import {useGlobalContext} from "../../context/authContext"
import Loader from "../loader/loader";
import { useState } from "react";
import { Link } from "react-router-dom";
const Contact = () => {
  const {currentUser} = useGlobalContext()
  const [loading,setLoading] = useState(false)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const data =  new FormData(e.target)
    const {content,sender} = Object.fromEntries(data)
    setLoading(true)
    try {
      const res = await  apiRequest.post("/sendEmail",{
      
        sender,
        content,
        senderEmail:currentUser?.email ?? "example@gmail.com"
      
      })

      toast.success(res.data)
      e.target.reset()
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message||"field to send email ")
    }finally{
      setLoading(false)
    } 
   
  }
  if(loading){
    return <Loader/>
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Your Name" required name="sender" />
          </div>
        
          <div className="input-group">
            <textarea placeholder="Your Message" required name="content"></textarea>
          </div>
          <button type="submit" >Send</button>
        </form>

        {/* Social Media Buttons */}
        <div className="social-media">
          <p>Or reach us on</p>
          <div className="social-icons">
            <Link to="#" className="facebook"><FaFacebookF /></Link>
            <Link to="#" className="twitter"><FaTwitter /></Link>
            <Link to="#" className="instagram"><FaInstagram /></Link>
            <Link to="#" className="linkedin"><FaLinkedinIn /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact