import { useCallback, useEffect, useState } from "react"
import apiRequest from "../../lib/apiRequest"
import { toast, ToastContainer } from "react-toastify"
import Loader from "../../components/loader/loader"
import "./dashboardBody.scss"
import SliderItems from "./slider/slider"
import DeleteModal from "../deleteModal/deleteModal"
import { useAdminContext } from "../../context/adminContext"
import Stats from "../../components/stats/stats"


const DashBoardBody = () => {


  const  [loading,setLoading]     = useState(true)
  const  [users,setUsers]         = useState([])
  const  {state} = useAdminContext()
  
  

  const fetchUsers = useCallback(async()=>{
  try {
        const {data} = await apiRequest('/dashboard/getUsers')
        setUsers(data)

      } catch (error) {
        toast.error("something went wrong while fetching users")
      }finally{
        setLoading(false)
      }
  },[])

  useEffect(()=>{
    
    fetchUsers()
    const interval = setInterval(() => {
      fetchUsers()
    }, 20_000);//every 1 minute will poll the db
    return ()=>{
      clearInterval(interval)
    }

  },[fetchUsers])



  if(loading){
    return <Loader/>
  }

  return (
    <div className={`dashboard `}>
      <div className="container">

      <h1>Stats</h1>
      <Stats/>
      <div className="users">
        <ToastContainer/>
          <h1 className="dashboard__title">Users</h1>
          <div className="dashboard__users">
            {
              users.length<1 ?
              <div className="no__users">No users on the website yet </div>
              :
              <SliderItems users={users}/>
            }
            {state.openUserModal &&<DeleteModal/>}

        </div>
      </div>
        </div>
    </div>

  )
}

export default DashBoardBody