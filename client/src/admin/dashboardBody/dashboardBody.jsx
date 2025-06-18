import { useEffect, useState } from "react"
import apiRequest from "../../lib/apiRequest"
import { toast } from "react-toastify"
import Loader from "../../components/loader/loader"
import "./dashboardBody.scss"
import SliderItems from "./slider/slider"



const DashBoardBody = () => {
  const [loading,setLoading] = useState(true)
  const [users,setUsers] = useState([])
  
  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const {data} = await apiRequest('/dashboard/getUsers')
        setUsers(data)

      } catch (error) {
        toast.error("something went wrong while fetching users")
      }finally{
        setLoading(false)
      }
    }
    fetchUsers()
  },[users])



  if(loading){
    return <Loader/>
  }
  return (
    <div className="dashboard">
      <div>
          <h2 className="dashboard__title">Users</h2>
          <div className="dashboard__users">
            {
              users.length<1 ?
              <div className="no__users">No users on the website yet </div>
              :
              <SliderItems users={users}/>
            }
        </div>
      </div>
      <div className="posts">

      </div>
    </div>
  )
}

export default DashBoardBody