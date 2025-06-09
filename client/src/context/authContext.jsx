import { useContext ,createContext, useState, useEffect} from "react";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
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
    

    
    useEffect(()=>{
        
        const isLogged = async()=>{
         apiRequest(`/auth/is-logged`)
         .then(res=>res.data)
         .then((result)=>console.log(result))
         .catch(err=>{
             if(err.response?.data?.message =="Not Authorized"){
                 updateUser(null)
                 toast.error(err.response?.data?.message+"please log in /sign up first ")

                }else{
                    return;
                }

            })
        
        
                
        }


        isLogged()
    },[])

    
    
    const values={
        currentUser,
        updateUser,
    }
    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}


export const useGlobalContext=()=> {
    return useContext(AuthContext)
}