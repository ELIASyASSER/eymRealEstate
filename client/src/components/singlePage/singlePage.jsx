import Slider from "../slider/slider"
// import { singlePostData, userData } from "../../lib/dummyData"
import "./singlePage.scss"
import Map from "../map/map"
import { useLoaderData, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { useGlobalContext } from "../../context/authContext"
import apiRequest from "../../lib/apiRequest"
import { useEffect, useState } from "react"


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
            console.log(error)
            toast.error(error.message||"something went wrong while save the item")
            setSaved(prev=>!prev)
            
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
                                <img src={post.user.avatar} alt="user" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            {post.postDetail.desc}
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
                        <img src="school.png" alt="" />
                        <div className="txtFeature">
                            <span>School</span>
                            <b>{post.postDetail.school>999?(post.postDetail.school)/1000+"km":post.postDetail.school+"M"} Away</b>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="bus.png" alt="" />
                        <div className="txtFeature">
                            <span>Bus</span>
                            <b>{post.postDetail.bus>999?(post.postDetail.bus)/1000+"km":post.postDetail.bus+"M"} Away</b>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="restaurant.png" alt="" />
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
                <div className="btns">
                    <button>
                        <img src="/chat.png" alt="img" />
                        Send a Message
                    </button>

                    <button onClick={handleSave} className={`${saved?"saved":""}`}>
                        <img src="/save.png" alt="img" />
                        {saved?"place  saved ":"Save the Place"}
                    </button>
                </div>
            </div>
        </main>

    </main>
)
}

export default SinglePage