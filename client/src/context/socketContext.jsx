import { createContext, useContext, useEffect, useState } from "react";
import {io} from "socket.io-client"
import { useGlobalContext } from "./authContext";

const SocketContext = createContext()

export const SocketContextProvider = ({children})=>{
    const {currentUser} = useGlobalContext()

    const [socket,setSocket] = useState(null)

    useEffect(() => {
        setSocket(io("http://localhost:2000",{
            withCredentials:true
        }))

    }, [])

    useEffect(()=>{
        if(socket){
            currentUser&&socket?.emit("newUser",currentUser.id)
        }

    },[currentUser,socket])

    const values = {
        socket
    }

    return <SocketContext.Provider value={values}>
        {children}
    </SocketContext.Provider>
}

export const useGlobalSocketContext = ()=>{

    return useContext(SocketContext)

}