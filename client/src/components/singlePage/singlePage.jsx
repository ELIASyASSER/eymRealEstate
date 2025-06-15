import Slider from "../slider/slider"
// import { singlePostData, userData } from "../../lib/dummyData"
import "./singlePage.scss"
import Map from "../map/map"
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { useGlobalContext } from "../../context/authContext"
import apiRequest from "../../lib/apiRequest"
import { useEffect, useState } from "react"
import { isAuthor } from "../../lib/isAuthor"
import  {FaWhatsapp}from "react-icons/fa"
import { FaPhone } from "react-icons/fa"
const SinglePage = () => {
    const navigate = useNavigate()
    const post = useLoaderData()
    const [saved,setSaved] = useState(post.isSaved)
    const {currentUser} = useGlobalContext()
    useEffect(() => {
      if(!currentUser){
        navigate("/login")
      }
    
    
    }, [currentUser,navigate])
    if(!currentUser){
        return null
    }
    const handleSave = async()=>{
        try {
            const res = await apiRequest.post("/posts/save",{
                postId:post.id
            })
            setSaved((prev)=>!prev)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message||"something went wrong while save the item")
            setSaved(prev=>!prev)
            
        }
    }
        const handleChat = async()=>{

        const {userId:receiverId} = post
        const {id:senderId} = currentUser
        if(receiverId ==senderId){
            toast.error("you can't chat with your self ")
            return;
        }
        try {
            const res = await apiRequest.post("/chat/createChat",{
                receiverId:receiverId
            })
            const chatId = res.data.chat.id
            toast.success(res.data.message)
            navigate(`/chats/${chatId}`)
        } catch (error) {
            if(error?.response?.data?.message.includes("Unique constraint")){
                toast.error("You can't chat with yourSelf")
                return;
            }else{
                toast.error(error?.response?.data?.message||"failed to chat !")
            }

        }

    }
    
    
    return (
    <main className="singlePage">
        <ToastContainer/>
        <main className="details">
            <div className="wrapper">
                    <Slider imgs={post.images}/>
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <div>
                                        <img src="/pin.png" alt="pin" />
                                        <span >{post.address}</span>
                                    </div> 
                                    <span className="city">{post.city}</span>
                                </div>
                                <div className="price">
                                    <span>$ {post.price}</span>
                                </div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar||"/avatar.png"} alt="user" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            {post.postDetail.desc}
                        </div>

                        <div style={{display:"flex",gap:"2rem",}}>
                            <Link to={"https://whatsapp.com"} style={{background:" rgb(81, 237, 81)",display:"flex",justifyContent:"center",padding:"10px",borderRadius:"10px",marginBottom:"20px",flex:1}} >
                             <FaWhatsapp style={{width:"40px",height:"40px"}} fill="white"/>
                        </Link>
                        <Link to={"https://whatsapp.com"} style={{background:" rgb(13, 131, 13)",display:"flex",justifyContent:"center",padding:"10px",borderRadius:"10px",marginBottom:"20px",flex:1}} >
                          <FaPhone style={{width:"40px",height:"40px"}} fill="white"/>
                        </Link>
                        </div>
                    </div>
            </div>
        </main>
        <main className="features">
            <div className="wrapper">
                <p className="title">General</p>
                <div className="listVertical">
                    <div className="feature">
                        <img src="/utility.png" alt="utility" />
                        <div className="featTxt">
                            <span>Utility</span>
                            <p>{post.postDetail.utility =="shared"?"both owner and tenant responsible":post.postDetail.utility+" is responsible"} </p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/pet.png" alt="utility" />
                        <div className="featTxt">
                            <span>Pet Policy</span>
                            <p>{post.postDetail.pet}</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/fee.png" alt="utility" />
                        <div className="featTxt">
                            <span>Property Fees</span>
                            <p>{post.postDetail.fees} </p>
                        </div>
                    </div>
                </div>
                <p className="title">Sizes</p>

                <div className="sizes">
                    <div className="size">
                        <img src="/size.png" alt="size" />
                        <span>Area {post.postDetail.size} sqm</span>
                    </div>
                    <div className="size">
                        <img src="/bed.png" alt="bed" />
                        <span>{post.bedroom} Bedrooms</span>
                    </div>
                    <div className="size">
                        <img src="/bath.png" alt="bathroom" />
                        <span>{post.bathroom} BathRoom</span>
                    </div>
                </div>

                <p className="title">Nearly Places</p>
                <div className="listHoriz">
                    <div className="feature">
                        <img src="/school.png" alt="school image" />
                        <div className="txtFeature">
                            <span>School</span>
                            <b>{post.postDetail.school>999?(post.postDetail.school)/1000+"km":post.postDetail.school+"M"} Away</b>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/bus.png" alt="bus image  " />
                        <div className="txtFeature">
                            <span>Bus</span>
                            <b>{post.postDetail.bus>999?(post.postDetail.bus)/1000+"km":post.postDetail.bus+"M"} Away</b>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="/restaurant.png" alt="restaurant image" />
                        <div className="txtFeature">
                            <span>Restaurant</span>
                            <b>{post.postDetail.restaurant}M Away</b>
                        </div>
                    </div>
                </div>
                <p className="title">Location</p>
                
                <div className="mapContainer">
                    <Map item={[post]}/>
                </div>
                {!isAuthor(post?.userId)&&
                <div className="btns">
                    <button  onClick={handleChat}>
                        <img src="/chat.png" alt=" chat img" />
                        Send a Message
                    </button>

                        <button onClick={handleSave} className={`${saved?"saved":""}`}>
                        <img src="/save.png" alt=" save img" />
                        {saved?"place  saved ":"Save the Place"}
                    </button>
                </div>
                }
            </div>
        </main>

    </main>
)
}

export default SinglePage