import { toast, ToastContainer } from "react-toastify";
import "./AdminLogin.scss";
import { useRef } from "react";
import apiRequest from "../lib/apiRequest";
import { useAdminContext } from "../context/adminContext";

const AdminLogin = () => {
  const {
    isAdmin,
    setIsAdmin,
    loading,
    setLoading
  } = useAdminContext()

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    usernameRef.current.style.border = "1px solid #007bff"
    passwordRef.current.style.border = "1px solid #007bff"

    const username = usernameRef.current.value
    const  password = passwordRef.current.value
  
    if(!username ){
      toast.warn("please enter your username")
      usernameRef.current.style = `border:3px solid red`
      return
      
    }
    if(!password){
      toast.warn("please enter your password")
      passwordRef.current.style = `border:3px solid red`
      return
    }
    try {
      const {data} = await apiRequest.post(`/admin/logAdmin`,{username,password})
      console.log(data,'datafrom login admin')
      if(!data.success){
        setIsAdmin(false)
        toast.error(data?.response?.data?.message||"something went wrong")

      }else{
        setIsAdmin(data.success)
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message||"can't log in as admin")
    }


  }
  return (<>
    <ToastContainer/>
    <main className="admin-login">
      <form onSubmit={handleSubmit} className="admin-login__form">
        <h2 className="admin-login__title">Admin Login</h2>

        <div className="admin-login__field">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Enter your username" ref={usernameRef}/>
        </div>

        <div className="admin-login__field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" ref={passwordRef}/>
        </div>

        <button type="submit" className="admin-login__btn">Log In</button>

        <p className="admin-login__footer">&copy; 2024 All rights reserved</p>
      </form>
    </main>
  </>
  );
};

export default AdminLogin;
