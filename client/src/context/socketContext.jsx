import { useContext ,createContext, useState, useEffect} from "react";
import {io} from "socket.io-client"
const SocketContext = createContext();

export const SocketContextProvider = ({children})=>{
    const[socket,setSocket] = useState(null)
    const[onlineUsers,setOnlineUsers] = useState(null)
    


    useEffect(() => {
        const newSocket =io("http://localhost:4000") 
        setSocket(newSocket)
        return ()=>{
            newSocket.disconnect()
        }
        
    }, [])


    const values={
       socket,setSocket,
       onlineUsers,
       setOnlineUsers
    }
    return <SocketContext.Provider value={values}>
        {children}
    </SocketContext.Provider>
}


export const useGlobalSocketContext=()=> {
    return useContext(SocketContext)
}