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
    // return res.data
    try {
        
        const[data1,data2] = await Promise.all([
            apiRequest.get("/posts/profilePosts").then((res)=>res.data),
            apiRequest.get("/chats").then((res)=>res.data)
        ])
        return{data1,data2}

    } catch (error) {
        console.log(error.message,'debugger herer')
        console.error("Error loading profile data:", error);

        if (error.response?.status === 401) {
            return redirect("/login"); // Redirect user if unauthorized
        }

    }
}
export const listPageLoader = async ({request,params})=>{

    const query = request.url.split("?")[1]
    const res = await apiRequest.get("/posts?"+query)
    return res.data
}
