import { Link, useLoaderData, useNavigate } from "react-router-dom"
import Chat from "../../components/chat/chat"
import List from "../../components/list/list"
import apiRequest from "../../lib/apiRequest"
import "./profilePage.scss"
import { toast, ToastContainer } from "react-toastify"
import { useGlobalContext } from "../../context/authContext.jsx"
import { useEffect, useRef, useState } from "react"
let savedList;
const ProfilePage = () => { 
    const [data,setData] = useState(null)
    const [chats,setChats] = useState(null)
    const navigate = useNavigate()
    const {currentUser,updateUser} = useGlobalContext()
    const postsInfo = useLoaderData()
    const [loading,setLoading] = useState(false)
    savedList = useRef(null)

    useEffect(()=>{
        if(!currentUser){
            navigate("/login")
        }
    },[currentUser,navigate])
    useEffect(() => {

        const getProfilePosts = async()=>{
            try {
                setLoading(true)
                setData(postsInfo.data1)
                setChats(postsInfo.data2)
                setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error("error while loading profile items")
                setLoading(false)
            }
        }
        getProfilePosts()
    }, [postsInfo])
    
    const logout = async()=>{
        try {


            await apiRequest.post("/auth/logout")
            updateUser(null)
            toast.success(res.data)
            setTimeout(() => {
                navigate("/")
            }, 1500);


        } catch (error) {
            console.log(error)
            toast.error("failed to logout")

        }
    }

    if(!currentUser){
        return null;
    }
    if(loading){
        return <div>Loading wait please</div>
    }


    else{
        return <main className="profilePage">
        <ToastContainer/>
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <Link to={"/profile/update"}>
                    <button>Update Profile</button>
                    </Link>
                </div>
                    <div className="info">
                        <span>Avatar: <img src={currentUser.avatar||"/avatar.png"} alt="user" /></span>
                        <p>UserName: <strong>{currentUser?.username}</strong></p>
                        <p>E-mail <strong>{currentUser.email}</strong></p>
                        <button className="out" onClick={logout}>Log Out</button>
                    </div>
                <div className="title">
                    <h1>My List</h1>
                    <Link to={'/add'}>
                        <button>Create New Post</button>
                    </Link>
                </div>
                <List posts={data?.userPosts}/>
                <div className="title">
                    <h1 ref={savedList}>Saved List</h1>
                </div>
                {
                    data?.savedPosts.length<1?<div>No Posts Saved Yet</div>:<List posts = {data?.savedPosts}/>
                }

            </div>
        </div>
        <div className="chatContainer
        ">
            <div className="wrapper">

                <Chat chats ={chats}/>

            </div>
        </div>
    </main>
    }
        
}

export  {ProfilePage,savedList}