import {  Outlet } from "react-router-dom"
import { useAdminContext } from "../context/adminContext"
import Loader from "../components/loader/loader"
import AdminLogin from "../admin/AdminLogin"

const AdminRoute = () => {
    const {isAdmin,loading,setLoading} = useAdminContext()
    
    if(isAdmin){
        return <Outlet/>
    }
    if(loading){
        return <Loader/>
    }
    
    return <AdminLogin/>
    
}

export default AdminRoute