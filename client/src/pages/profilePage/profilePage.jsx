import { Link, useLoaderData, useNavigate } from "react-router-dom"
import List from "../../components/list/list"
import apiRequest from "../../lib/apiRequest"
import "./profilePage.scss"
import { toast, ToastContainer } from "react-toastify"
import { useGlobalContext } from "../../context/authContext.jsx"
import { useEffect,useState } from "react"
import Loader from "../../components/loader/loader"
const ProfilePage = () => { 
    const [data,setData] = useState(null)
    const {currentUser,setCurrentUser,updateUser} = useGlobalContext()
    const postsInfo = useLoaderData()
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const getProfilePosts = async()=>{
            try {
                setLoading(true)
                setData(postsInfo?.data)
                
                
            } catch (error) {
                console.log(error)
                toast.error("error while loading profile items")
            }finally{
                setLoading(false)
            }
        }
        getProfilePosts()
    }, [postsInfo])
    
const logout = async()=>{
    try {
         await apiRequest("/auth/logout")
        updateUser(null)
        // window.location.href ="/"
        navigate("/login")
    } catch (error) {
        
        toast.error("failed to log out")
    }
    
    }

        
    if(!currentUser){
        return null;
    }

    if(loading){
        return <Loader/>
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
                        <span>Avatar: <img src={currentUser?.avatar||"/avatar.png"} alt="user" /></span>
                        <p>UserName: <strong>{currentUser?.username}</strong></p>
                        <p>E-mail <strong>{currentUser?.email}</strong></p>
                        <button className="out" onClick={logout}>Log Out</button>
                    </div>
                    <div className="title">
    
                    <h1>My List</h1>
                    <Link to={'/add'}>
                        <button>Create New Post</button>
                    </Link>
                    </div>

                    {postsInfo?.userPosts.length ==0?<div>You don't Have any posts yet  </div>:
                    <List posts={postsInfo?.userPosts}/>
                    }

                </div>
                <List posts={data?.userPosts}/>
                <div className="savedList">
                    <h1 >Saved List</h1>
                </div>
                {
                    data?.savedPosts.length<1?<div>No Posts Saved Yet</div>:<List posts = {postsInfo?.savedPosts} />
                }

            </div>
        
    </main>
    }
        
}

export  {ProfilePage}