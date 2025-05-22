import { useContext ,createContext, useState, useEffect} from "react";

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


    const values={
        currentUser,
        updateUser
    }
    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}


export const useGlobalContext=()=> {
    return useContext(AuthContext)
}