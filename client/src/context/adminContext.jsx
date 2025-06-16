import { useContext ,createContext, useState, useEffect} from "react";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
const AdminContext = createContext();

export const AdminContextProvider = ({children})=>{
    const [isAdmin,setIsAdmin] = useState(null)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
 const onAdminRoute = useLocation().pathname.includes("admin")
 useEffect(()=>{
        const adminStatus = async()=>{
            try {
                const {data} = await apiRequest(`/admin/is-auth`)
                setIsAdmin(data.success)
                if(!data.success && onAdminRoute){
                    toast.error(data?.response?.data?.message||"only admin can log in")
                    navigate("/admin")
                }
            } catch (error) {
                toast.error(error?.response?.data?.message||"only admin can login here")
            }finally{
                setLoading(false)
            }
        }
            adminStatus()
    },[navigate,onAdminRoute])

    const values={
    isAdmin,
    setIsAdmin,
    loading,
    setLoading
    }
    return <AdminContext.Provider value={values}>
        {children}
    </AdminContext.Provider>
}


export const useAdminContext=()=> {
    return useContext(AdminContext)
}