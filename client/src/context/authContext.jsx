import { useContext ,createContext, useState, useEffect} from "react";
import { toast } from "react-toastify";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const[currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))||null
    )


    const updateUser =(data)=>{
        setCurrentUser(data)
    }


    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(currentUser))
    }, [currentUser])
    


    const LogoutUser = async()=>{
        try {
            await apiRequest("/auth/logout")
            updateUser(null)
            window.location.href ="/register"
        
        } catch (error) {    
            console.log(error,'error from here')
            toast.error("please sign again ")
        }
    }

    useEffect(()=>{

        const checkAuth = async()=>{
            if(!currentUser)return;
                try {
                    const res = await apiRequest("/auth/is-auth")
                    console.log(res,'res')
                    // toast.success(res.data)
                } catch (error) {
                    LogoutUser()
                }
            }
        // window.addEventListener("focus",checkAuth)
        // return ()=>{
        //     window.removeEventListener("focus",checkAuth)
        // }
        checkAuth()
        },[currentUser])


    const values={
        currentUser,
        updateUser,
        setCurrentUser
    }


    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}


export const useGlobalContext=()=> {
    return useContext(AuthContext)
}