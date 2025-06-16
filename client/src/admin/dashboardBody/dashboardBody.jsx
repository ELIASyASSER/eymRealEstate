import { useEffect, useState } from "react"
import apiRequest from "../../lib/apiRequest"
import { toast } from "react-toastify"
import Loader from "../../components/loader/loader"
import "./dashboardBody.scss"
import { FaTrash } from "react-icons/fa"
const DashBoardBody = () => {
  const [loading,setLoading] = useState(true)
  const [users,setUsers] = useState([])
  console.log(users)
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
  },[])

  if(loading){
    return <Loader/>
  }
  return (
       <div className="dashboard">
      <h2 className="dashboard__title">Users</h2>
      <div className="dashboard__users">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img
              className="user-card__avatar"
              src={user.avatar || "/avatar.png"}
              alt={user.username}
            />
            <div className="user-card__info">
              <h4>{user.username}</h4>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
              <button className="del"><FaTrash fill="red" size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashBoardBody