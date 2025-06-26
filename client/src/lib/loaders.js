import { redirect } from "react-router-dom"
import apiRequest from "./apiRequest"

export const singlePageLoader =async ({request,params})=>{
    try {
        const res = await apiRequest("/posts/getPost/"+params.id)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const profilePostsInfo = async({request,params})=>{
    try {    
        const data = await new Promise((resolve,reject)=>{
        apiRequest.get("/posts/profilePosts")
        .then((res)=>resolve(res.data))
        .catch((err)=>reject(err))
        
    })
        return data

    } catch (error) {
        console.log(error.message,'debugger here')
        console.error("Error loading profile data:", error);

        if (error.response?.status === 401) {
            return redirect("/login"); // Redirect user if unauthorized
        }

    }
}
