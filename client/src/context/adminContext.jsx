import { useContext ,createContext, useState, useEffect} from "react";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useReducer } from "react";
const AdminContext = createContext();

export const AdminContextProvider = ({children})=>{
    const [isAdmin,setIsAdmin] = useState(null)
    const [loading,setLoading] = useState(true)
    const initialState = {
        openUserModal:false,
        openPostModal:false,
        userId:null,
        postId:null,
        deleteType:""
    }

    function adminReducer(state,action){
        switch(action.type){
            case "OPEN_USER_MODAL":
                return {
                    ...state,
                    openUserModal:true,
                    openPostModal:false,
                    deleteType:action.payload.type,
                    userId:action.payload.userId ||null,
                    
                
                }
            case "OPEN_POST_MODAL":
                return {
                    ...state,
                    openUserModal:false,
                    openPostModal:true,
                    deleteType:action.payload.type,
                    postId:action.payload.postId ||null,

                }
            case "CLOSE_MODAL":
                return{
                    ...state,
                    openUserModal:false,
                    openPostModal:false,
                    deleteType:"",
                    postId:null,
                    userId:null
                }

            default:
                return state
                
        }
        

    }
    
    const [state,dispatch] = useReducer(adminReducer,initialState)


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
    setLoading,
    state,
    dispatch,
    
    }
    return <AdminContext.Provider value={values}>
        {children}
    </AdminContext.Provider>
}


export const useAdminContext=()=> {
    return useContext(AdminContext)
}