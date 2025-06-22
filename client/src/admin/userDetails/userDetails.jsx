import { useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader/loader"
import { useEffect } from "react"
import apiRequest from "../../lib/apiRequest"
import { toast } from "react-toastify"
import UserPosts from "./userPosts/userPosts"
import { useCallback } from "react"

const UserDetails = () => {
    const {userId} = useParams()
    const [loading,setLoading] = useState(true)
    const [userPosts,setUserPosts] = useState([])
    const fetchUserPosts = useCallback(async()=>{
      try {
        const {data} = await apiRequest(`/dashboard/getUserPosts/${userId}`)
        setUserPosts(data)

      } catch (error) {
        toast.error("something went wrong while fetching users")
      }finally{
        setLoading(false)
      }
    },[])


  useEffect(()=>{
    fetchUserPosts()
      const interval = setInterval(() => {
      fetchUserPosts()
    }, 60_000);//every 1 minute will poll the db
    
    return ()=>{
      clearInterval(interval)
    }

},[fetchUserPosts])


  if(loading){
    return <Loader/>
  
}





  return (
        <UserPosts posts={userPosts}/>
  )
}

export default UserDetails