import { Outlet, Navigate } from "react-router-dom"
import { AuthContextProvider, useGlobalContext } from "../context/authContext.jsx"
import Navbar from "../components/navbar/navbar.jsx"

const ProtectedRoute = ()=>{
    const {currentUser} = useGlobalContext()
    
    if(!currentUser){
        return <Navigate to={"/register"}/>
    }


    return (
            <div className="layout">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}
export default ProtectedRoute