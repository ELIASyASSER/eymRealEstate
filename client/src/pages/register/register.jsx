import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css"



import { useState } from "react";
import apiRequest from "../../lib/apiRequest";


function Register() {
  
  const [isLoading,setIsLoading] = useState(false)
    const [err,setErr] = useState("")
    const navigate = useNavigate()

  const handleSubmit =async(e)=>{

    e.preventDefault()
    setIsLoading(true)
    setErr("")
    
    const data =new FormData(e.target);

    const username = data.get("username")
    const email = data.get("email")
    const password = data.get("password")
    try {
      
      const res = await apiRequest.post(`/auth/register`,{
        username,email,password
      })

      toast.success(res)

      setTimeout(() => {
        navigate("/login")
        
      }, 1500);

    } catch (error) {

        console.log(error)
        const theErr = error.response?.data?.message ==`Invalid \`prisma.user.create()\` invocation: Unique constraint failed on the constraint: \`User_email_key\``?"user Name already exist":"failed to sign up try again username or email must be unique"
      
        setErr(theErr)
        toast.error(theErr||"Failed To Sign Up")

    }finally{
      setIsLoading(false)
    }
    
  }
  
  return (
    
    <section className="register">
      <div className="formContainer">
      <ToastContainer/>

        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required minLength={4} maxLength={20} />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" required minLength={4} maxLength={20}/>
          <button disabled={isLoading}>Register</button>

          {
          err&&
          <span>{err}</span>
          }

          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </section>
  );
}

export default Register;