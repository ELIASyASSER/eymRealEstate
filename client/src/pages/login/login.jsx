import "./login.scss";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { useGlobalContext } from "../../context/authContext";

function Login() {

    const [err,setErr] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const {updateUser} = useGlobalContext()

const handleSubmit =async(e)=>{
  e.preventDefault()
  setIsLoading(true)
  setErr("")//if new request and data is true remove error as it still appear if you don't do that 
  const data =new FormData(e.target);
  const username = data.get("username")
  const password = data.get("password")
  try {
    
    const res = await apiRequest.post(`/auth/login`,{
      username,password
    })
    updateUser(res.data)
    // Show toast notification on successful login
    
    // Redirect to the homepage
    setTimeout(() => navigate("/"), 1500); // Redirect after showing toast
    toast.success("Logged in successfully!");

  } catch (error) {

      console.log(error)
      setErr(error.response.data?.message || "please provide correct information")
      toast.error("failed to LogIn invalid information")
  }finally{
    setIsLoading(false)
  }
  
}
  return (
    <div className="login">
      <ToastContainer/>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" required minLength={4} maxLength={20} />
          <input name="password" type="password" placeholder="Password" minLength={4} maxLength={20}/>
          <button type="submit" className={`${isLoading?"disableBtn":""}`}>Login</button>
          
          {err&&
          <span>{err}</span>
          }

          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="background Banner" />
      </div>
    </div>
  );
}

export default Login;