import {useGlobalContext} from "../context/authContext.jsx"

export const isAuthor = (userId)=>{

    const {currentUser} = useGlobalContext()
    
    if(currentUser?.id == userId){
            return true
        }
        return false
}  