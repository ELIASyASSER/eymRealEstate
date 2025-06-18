import {  Outlet } from "react-router-dom"
import { useAdminContext } from "../context/adminContext"
import Loader from "../components/loader/loader"
import AdminLogin from "../admin/AdminLogin"

const AdminRoute = () => {
    const {isAdmin,loading} = useAdminContext()
    
    if(loading){
        return <Loader/>
    }
    
    if(isAdmin){
        return <Outlet/>
    }
    return <AdminLogin/>
    
}

export default AdminRoute